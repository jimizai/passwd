use crate::auth::Auth;
use crate::config::AppState;
use crate::database::DbConn;
use crate::errors::{Errors, FieldValidator};
use crate::models::user::User;
use crate::responses::{ok, APIResponse};
use crate::schema::users;
use diesel::prelude::*;
use rocket::State;
use rocket_contrib::json;
use rocket_contrib::json::Json;
use serde::Deserialize;
use validator_derive::Validate;

#[derive(Deserialize, Debug, Validate)]
pub struct LoginUser {
    #[validate(email)]
    pub email: Option<String>,
    pub password: Option<String>,
}

#[post("/login", format = "json", data = "<user>")]
pub fn users_login(
    user: Json<LoginUser>,
    conn: DbConn,
    state: State<AppState>,
) -> Result<APIResponse, Errors> {
    let user = user.into_inner();
    let mut extractor = FieldValidator::validate(&user);
    let email = extractor.extract("email", user.email);
    let password = extractor.extract("password", user.password);
    extractor.check()?;

    let user = users::table
        .filter(users::email.eq(email).and(users::password.eq(password)))
        .get_result::<User>(&*conn)
        .ok();

    match user {
        Some(user) => Ok(ok()
            .set_data(json!(user.to_user_auth(&state.secret)))
            .set_message("login success")),
        None => err!(400, "Invalid email or password"),
    }
}

#[get("/")]
pub fn index(auth: Auth) -> APIResponse {
    println!("{}", auth.id);
    ok().set_message("success")
}

#[get("/test")]
pub fn test() -> APIResponse {
    ok().set_message("success")
}
