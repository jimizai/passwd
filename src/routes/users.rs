use crate::auth::Auth;
use crate::config::AppState;
use crate::crypto::{get_random_64, hash_password, verify_password};
use crate::database::DbConn;
use crate::errors::{Errors, FieldValidator};
use crate::models::user::{NewUser, User};
use crate::responses::{ok, APIResponse};
use crate::schema::users;
use diesel::prelude::*;
use rocket::State;
use rocket_contrib::json;
use rocket_contrib::json::Json;
use serde::Deserialize;
use validator_derive::Validate;

// TODO set variables to .env later
const PASSWORD_ITERATIONS: i32 = 100_000;

#[derive(Deserialize, Debug, Validate)]
pub struct LoginUser {
    #[validate(email)]
    pub email: Option<String>,
    pub password: Option<String>,
}

#[derive(Deserialize, Debug, Validate)]
pub struct SignupUser {
    #[validate(email)]
    pub email: Option<String>,
    pub username: Option<String>,
    pub password: Option<String>,
}

#[post("/signup", format = "json", data = "<user>")]
pub fn users_signup(user: Json<SignupUser>, conn: DbConn) -> Result<APIResponse, Errors> {
    let user = user.into_inner();
    let mut extractor = FieldValidator::validate(&user);
    let email = extractor.extract("email", user.email);
    let username = extractor.extract("username", user.username);
    let password = extractor.extract("password", user.password);
    extractor.check()?;

    let match_user = users::table
        .filter(users::email.eq(&email).or(users::username.eq(&username)))
        .first::<User>(&*conn)
        .ok()
        .is_some();
    if match_user {
        err!(400, "User is exist");
    }
    let salt: Vec<u8> = get_random_64();
    let password = hash_password(password.as_bytes(), &salt, PASSWORD_ITERATIONS as u32);
    let new_user = NewUser {
        email: &email,
        password: password,
        username: &username,
        salt: salt,
    };
    diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&*conn)
        .map_err(|err| eprintln!("users::insert error: {}", err))
        .ok();
    Ok(ok().set_message("sign up success"))
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
        .filter(users::email.eq(email))
        .get_result::<User>(&*conn)
        .ok();

    if let Some(user) = user {
        let result = verify_password(
            password.as_bytes(),
            &user.salt,
            &user.password,
            PASSWORD_ITERATIONS as u32,
        );
        if !result {
            err!(400, "Invalid email or password")
        } else {
            Ok(ok()
                .set_data(json!(user.to_user_auth(&state.secret)))
                .set_message("login success"))
        }
    } else {
        err!(400, "Invalid email or password")
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
