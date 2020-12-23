use rocket::data::Data;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::request::Request;
use rocket::response::Response;
use std::time::SystemTime;
#[derive(Copy, Clone)]
pub struct Timer(Option<SystemTime>);

impl Timer {
    pub fn new() -> Timer {
        Timer(Some(SystemTime::now()))
    }
}

impl Fairing for Timer {
    fn info(&self) -> Info {
        Info {
            name: "Request Timer",
            kind: Kind::Request | Kind::Response,
        }
    }

    fn on_request(&self, request: &mut Request, _: &Data) {
        request.local_cache(|| Timer(Some(SystemTime::now())));
    }

    fn on_response(&self, request: &Request, _: &mut Response) {
        let start_time = request.local_cache(|| Timer(None));
        if let Some(Ok(duration)) = start_time.0.map(|st| st.elapsed()) {
            let ms = duration.as_secs() * 1000 + duration.subsec_millis() as u64;
            println!("{} {} =======> {}ms", request.method(), request.uri(), ms);
        }
    }
}
