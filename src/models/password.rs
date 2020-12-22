#![allow(proc_macro_derive_resolution_fallback)]
use crate::schema::passwords;
use serde::Serialize;
use serde_derive::Deserialize;

#[derive(Debug, Queryable, Serialize, Deserialize, Identifiable, AsChangeset)]
#[table_name = "passwords"]
pub struct PasswordModel<'a> {
    pub id: i32,
    pub key: &'a str,
    pub value: &'a str,
    pub length: i32,
}

#[derive(Insertable, Debug)]
#[table_name = "passwords"]
pub struct NewPassword<'a> {
    pub key: &'a str,
    pub value: &'a str,
    pub length: i32,
}
#[derive(Deserialize, AsChangeset, Default, Clone)]
#[table_name = "passwords"]
pub struct UpdatePassword<'a> {
    pub key: Option<&'a str>,
    pub value: Option<&'a str>,
    pub length: Option<i32>,
}
