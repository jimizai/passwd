// use crate::auth::Auth;
use crate::database::DbConn;
use crate::diesel::prelude::*;
use crate::errors::{Errors, FieldValidator};
use crate::models::password::{NewPassword as InsertPassword, UpdatePassword};
use crate::responses::{ok, APIResponse};
use crate::schema::passwords;
// use rocket::request::Form;
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

// #[derive(FromForm, Default)]
// pub struct FindPasswords {
//     current: Option<i64>,
//     pageSize: Option<i64>,
// }

// #[get("/?<params..>")]
// pub fn find(params: Form<FindPasswords>, auth: Auth, conn: DbConn) {
//     let mut query = passwords::table
//         .filter(passwords::id.eq(auth.id))
//         .into_boxed();
//     let current = params.current.unwrap_or(1);
//     let limit = params.pageSize.unwrap_or(10);
//     let offset = (current - 1) * limit;
//     query
//         .offset_and_limit(offset, limit)
//         .load_and_count::<PasswordModel>(conn)
//         .expect("Cannot load articles")
// }

#[post("/", data = "<new_password>", format = "json")]
pub fn store(new_password: Json<NewPassword>, conn: DbConn) -> Result<APIResponse, Errors> {
    let new_password = new_password.into_inner();
    let mut extractor = FieldValidator::validate(&new_password);
    let key = extractor.extract("key", new_password.key);
    let value = extractor.extract("value", new_password.value);
    extractor.check()?;

    let new_password = InsertPassword {
        key: &key,
        value: &value,
        length: 10,
    };

    diesel::insert_into(passwords::table)
        .values(&new_password)
        .execute(&*conn)
        .map_err(|err| eprintln!("passwords::favorite: {}", err))
        .ok();
    Ok(ok().set_message("保存成功"))
}

#[put("/<id>", data = "<password>", format = "json")]
pub fn update(
    id: i32,
    password: Json<UpdatePassword>,
    conn: DbConn,
) -> Result<APIResponse, Errors> {
    let data = &UpdatePassword { ..password.clone() };
    diesel::update(passwords::table.find(id))
        .set(data)
        .execute(&*conn)
        .ok();
    Ok(ok().set_message("修改成功"))
}

#[delete("/<id>")]
pub fn delete(id: i32, conn: DbConn) -> Result<APIResponse, Errors> {
    diesel::delete(passwords::table.find(id))
        .execute(&*conn)
        .ok();
    Ok(ok().set_message("删除成功"))
}
