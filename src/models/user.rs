#![allow(proc_macro_derive_resolution_fallback)]
use crate::auth::Auth;
use chrono::{Duration, Utc};
use serde::Serialize;

#[derive(Debug, Queryable, Serialize, PartialEq)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password: String,
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
