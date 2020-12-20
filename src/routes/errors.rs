use crate::responses::{bad_request, not_found, unauthorized, APIResponse};
use rocket::catch;

#[catch(400)]
pub fn bad_request_handler() -> APIResponse {
    bad_request()
}

#[catch(401)]
pub fn unauthorized_handler() -> APIResponse {
    unauthorized()
}

#[catch(404)]
pub fn not_fount_handler() -> APIResponse {
    not_found()
}
