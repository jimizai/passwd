use chrono::prelude::*;
use diesel::result::Error as DieselError;
use rocket::http::{ContentType, Status};
use rocket::request::Request;
use rocket::response::{Responder, Response};
use rocket_contrib::json;
use rocket_contrib::json::JsonValue;
use std::io::Cursor;

extern crate chrono;

pub struct APIResponse {
    pub code: i16,
    pub data: JsonValue,
    pub msg: String,
}

impl APIResponse {
    pub fn set_data(mut self, data: JsonValue) -> APIResponse {
        self.data = data;
        self
    }

    pub fn set_message(mut self, message: &str) -> APIResponse {
        self.msg = format!("{}", message);
        self
    }

    pub fn set_status(mut self, status: i16) -> APIResponse {
        self.code = status;
        self
    }
}

fn date_now() -> i64 {
    let dt = Local::now();
    dt.timestamp_millis()
}

impl From<DieselError> for APIResponse {
    fn from(_: DieselError) -> APIResponse {
        APIResponse {
            code: 500,
            data: json!(null),
            msg: String::from("Database Error"),
        }
    }
}

impl<'r> Responder<'r> for APIResponse {
    fn respond_to(self, _request: &Request) -> Result<Response<'r>, Status> {
        let body = json!({
            "code": self.code,
            "data": self.data,
            "msg": self.msg,
            "time": date_now()
        });
        Response::build()
            .status(Status::Ok)
            .sized_body(Cursor::new(body.to_string()))
            .header(ContentType::JSON)
            .ok()
    }
}

pub fn ok() -> APIResponse {
    APIResponse {
        msg: String::from("success"),
        data: json!(null),
        code: 200,
    }
}

pub fn created() -> APIResponse {
    APIResponse {
        msg: String::from("created"),
        data: json!(null),
        code: 200,
    }
}

pub fn accepted() -> APIResponse {
    APIResponse {
        msg: String::from("accepted"),
        data: json!(null),
        code: 403,
    }
}

pub fn bad_request() -> APIResponse {
    APIResponse {
        msg: String::from("bad request"),
        data: json!(null),
        code: 400,
    }
}

pub fn unauthorized() -> APIResponse {
    APIResponse {
        msg: String::from("unauthorized"),
        data: json!(null),
        code: 401,
    }
}

pub fn forbidden() -> APIResponse {
    APIResponse {
        msg: String::from("forbidden"),
        data: json!(null),
        code: 403,
    }
}

pub fn not_found() -> APIResponse {
    APIResponse {
        msg: String::from("not found"),
        data: json!(null),
        code: 404,
    }
}

pub fn method_not_allowed() -> APIResponse {
    APIResponse {
        msg: String::from("method not allowed"),
        data: json!(null),
        code: 405,
    }
}

pub fn internal_server_error() -> APIResponse {
    APIResponse {
        msg: String::from("internal server error"),
        data: json!(null),
        code: 500,
    }
}
