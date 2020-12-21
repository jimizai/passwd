#![feature(proc_macro_hygiene, decl_macro)]
#![recursion_limit = "128"]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate diesel;

pub mod auth;
pub mod config;
pub mod database;
pub mod responses;

pub mod models;
mod routes;
pub mod schema;

pub fn rocket_factory() -> Result<rocket::Rocket, String> {
    let rocket_config = config::get_rocket_config().unwrap();
    let rocket = rocket::custom(rocket_config)
        .attach(database::DbConn::fairing())
        .attach(config::AppState::manage())
        .mount(
            "/users",
            routes![
                routes::users::index,
                routes::users::test,
                routes::users::users_login
            ],
        )
        .register(catchers![
            routes::errors::bad_request_handler,
            routes::errors::not_fount_handler,
            routes::errors::unauthorized_handler
        ]);
    Ok(rocket)
}
