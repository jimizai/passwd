use crate::auth::Auth;
use crate::database::DbConn;
use crate::diesel::prelude::*;
use crate::errors::{Errors, FieldValidator};
use crate::models::password::{NewPassword as InsertPassword, PasswordModel, UpdatePassword};
use crate::responses::{ok, APIResponse};
use crate::schema::passwords;
use rocket::request::Form;
use rocket_contrib::json;
use rocket_contrib::json::Json;
use serde::Deserialize;
use validator_derive::Validate;

#[derive(Deserialize, Validate, Debug)]
pub struct NewPassword {
    #[validate(required)]
    pub key: Option<String>,
    #[validate(required)]
    pub value: Option<String>,
}

#[derive(FromForm, Default)]
pub struct FindPasswords {
    pub current: Option<i64>,
    pub page_size: Option<i64>,
}

#[get("/?<params..>")]
pub fn list(params: Form<FindPasswords>, auth: Auth, conn: DbConn) -> Result<APIResponse, Errors> {
    let query = passwords::table.filter(passwords::user_id.eq(auth.id));
    let current = params.current.unwrap_or(1);
    let limit = params.page_size.unwrap_or(10);
    let offset = (current - 1) * limit;
    let passwords = query
        .offset(offset)
        .limit(limit)
        .load::<PasswordModel>(&*conn)
        .expect("Cannot load articles");
    let total = passwords::table.count().first::<i64>(&*conn).unwrap_or(0);
    Ok(ok()
        .set_data(json!(passwords))
        .set_total(total)
        .set_message("查询成功"))
}

#[post("/", data = "<new_password>", format = "json")]
pub fn store(
    new_password: Json<NewPassword>,
    conn: DbConn,
    auth: Auth,
) -> Result<APIResponse, Errors> {
    let new_password = new_password.into_inner();
    let mut extractor = FieldValidator::validate(&new_password);
    let key = extractor.extract("key", new_password.key);
    let value = extractor.extract("value", new_password.value);
    extractor.check()?;

    let new_password = InsertPassword {
        key: &key,
        value: &value,
        length: 10,
        user_id: auth.id,
    };

    diesel::insert_into(passwords::table)
        .values(&new_password)
        .execute(&*conn)
        .map_err(|err| eprintln!("passwords::insert error: {}", err))
        .ok();
    Ok(ok().set_message("保存成功"))
}

#[put("/<id>", data = "<password>", format = "json")]
pub fn update(
    id: u32,
    password: Json<UpdatePassword>,
    conn: DbConn,
    auth: Auth,
) -> Result<APIResponse, Errors> {
    let data = &UpdatePassword { ..password.clone() };
    diesel::update(
        passwords::table.filter(passwords::id.eq(id).and(passwords::user_id.eq(auth.id))),
    )
    .set(data)
    .execute(&*conn)
    .ok();
    Ok(ok().set_message("修改成功"))
}

#[delete("/<id>")]
pub fn delete(id: u32, conn: DbConn, auth: Auth) -> Result<APIResponse, Errors> {
    diesel::delete(
        passwords::table.filter(passwords::id.eq(id).and(passwords::user_id.eq(auth.id))),
    )
    .execute(&*conn)
    .ok();
    Ok(ok().set_message("删除成功"))
}
