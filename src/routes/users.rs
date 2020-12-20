use crate::auth::Auth;
use crate::responses::{ok, APIResponse};

#[get("/")]
pub fn index(auth: Auth) -> APIResponse {
    println!("{}", auth.id);
    ok().set_message("success")
}

#[get("/test")]
pub fn test() -> APIResponse {
    ok().set_message("success")
}
