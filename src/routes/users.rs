use crate::auth::Auth;
use crate::config::AppState;
use crate::database::DbConn;
use crate::models::user::User;
use crate::responses::{ok, unauthorized, APIResponse};
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
    pub email: String,
    pub password: String,
}

#[post("/login", format = "json", data = "<user>")]
pub fn users_login(user: Json<LoginUser>, conn: DbConn, state: State<AppState>) -> APIResponse {
    let user = users::table
        .filter(users::email.eq(&user.email))
        .first::<User>(&*conn);
    let user = match user {
        Ok(user) => user,
        Err(_) => return unauthorized(),
    };
    ok().set_data(json!(user.to_user_auth(&state.secret)))
        .set_message("登录成功")
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
