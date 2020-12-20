#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate diesel;

pub mod auth;
pub mod config;
pub mod database;
pub mod responses;

mod models;
mod routes;

pub fn rocket_factory() -> Result<rocket::Rocket, String> {
    let rocket_config = config::get_rocket_config().unwrap();
    let rocket = rocket::custom(rocket_config)
        .attach(database::DbConn::fairing())
        .mount("/", routes![routes::users::index])
        .register(catchers![
            routes::errors::bad_request_handler,
            routes::errors::not_fount_handler,
            routes::errors::unauthorized_handler
        ]);
    Ok(rocket)
}
