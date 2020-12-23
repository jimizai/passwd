#![allow(proc_macro_derive_resolution_fallback)]
use crate::schema::passwords;
use serde::Serialize;
use serde_derive::Deserialize;

#[derive(Debug, Queryable, Serialize, Deserialize, Identifiable, AsChangeset, PartialEq)]
#[table_name = "passwords"]
pub struct PasswordModel {
    pub id: i32,
    pub key: String,
    pub value: String,
    pub length: i32,
    pub user_id: i32,
}

#[derive(Insertable, Debug)]
#[table_name = "passwords"]
pub struct NewPassword<'a> {
    pub key: &'a str,
    pub value: &'a str,
    pub length: i32,
    pub user_id: i32,
}
#[derive(Deserialize, AsChangeset, Default, Clone)]
#[table_name = "passwords"]
pub struct UpdatePassword<'a> {
    pub key: Option<&'a str>,
    pub value: Option<&'a str>,
    pub length: Option<i32>,
}
