use dotenv::dotenv;
use rocket::config::{Config, Environment, Value};
use rocket::fairing::AdHoc;
use std::collections::HashMap;
use std::env;

pub const TOKEN_PREFIX: &'static str = "Token ";

pub struct AppState {
    pub secret: Vec<u8>,
}

impl AppState {
    pub fn manage() -> AdHoc {
        AdHoc::on_attach("Manage config", |rocket| {
            let secret = env::var("SECRET_KEY").unwrap_or_else(|err| {
                panic!("No SECRET_KEY environment variable found: {:?}", err)
            });
            Ok(rocket.manage(AppState {
                secret: secret.into_bytes(),
            }))
        })
    }
}

pub fn get_rocket_config() -> Result<Config, String> {
    dotenv().ok();
    let mut database_config = HashMap::new();
    let mut databases = HashMap::new();
    let database_url = env::var("DATABASE_URL").unwrap();
    database_config.insert("url", Value::from(database_url));
    databases.insert("passwd", Value::from(database_config));
    let rocket_config = Config::build(Environment::Production)
        .address("0.0.0.0")
        .port(3000)
        .extra("databases", databases)
        .finalize()
        .unwrap();
    Ok(rocket_config)
}
