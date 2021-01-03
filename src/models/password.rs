#![allow(proc_macro_derive_resolution_fallback)]
use crate::schema::passwords;
use chrono::NaiveDateTime;
use serde::Serialize;
use serde_derive::Deserialize;

#[derive(Debug, Queryable, Serialize, Deserialize, Identifiable, PartialEq, AsChangeset)]
#[table_name = "passwords"]
pub struct PasswordModel {
    pub id: u32,
    pub key: String,
    pub value: String,
    pub length: i32,
    pub user_id: u32,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Debug)]
#[table_name = "passwords"]
pub struct NewPassword<'a> {
    pub key: &'a str,
    pub value: &'a str,
    pub length: i32,
    pub user_id: u32,
}
#[derive(Deserialize, AsChangeset, Default, Clone)]
#[table_name = "passwords"]
pub struct UpdatePassword<'a> {
    pub key: Option<&'a str>,
    pub value: Option<&'a str>,
    pub length: Option<i32>,
}
