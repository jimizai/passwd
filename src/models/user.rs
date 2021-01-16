#![allow(proc_macro_derive_resolution_fallback)]
use crate::auth::Auth;
use crate::schema::users;
use chrono::{Duration, Utc};
use serde::Serialize;
use serde_derive::Deserialize;

#[derive(Debug, Queryable, Serialize, Deserialize, Identifiable, PartialEq, AsChangeset)]
#[table_name = "users"]
pub struct User {
    pub id: u32,
    pub username: String,
    pub email: String,
    pub salt: Vec<u8>,
    pub password: Vec<u8>,
}

#[derive(Insertable, Debug)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub email: &'a str,
    pub salt: Vec<u8>,
    pub password: Vec<u8>,
}

#[derive(Serialize)]
pub struct UserAuth<'a> {
    username: &'a str,
    email: &'a str,
    token: String,
}

impl User {
    pub fn to_user_auth(&self, secret: &[u8]) -> UserAuth {
        let exp = Utc::now() + Duration::days(60);
        let token = Auth {
            id: self.id,
            username: self.username.clone(),
            exp: exp.timestamp(),
        }
        .token(secret);
        UserAuth {
            username: &self.username,
            email: &self.email,
            token,
        }
    }
}
