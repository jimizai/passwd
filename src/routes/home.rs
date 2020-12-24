use crate::responses::{ok, APIResponse};

#[get("/")]
pub fn index() -> APIResponse {
    ok().set_message("hello passwd")
}
