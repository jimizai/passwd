use ring::rand::{SecureRandom, SystemRandom};
use ring::{digest, pbkdf2};
use std::num::NonZeroU32;

static DIGEST_ALG: pbkdf2::Algorithm = pbkdf2::PBKDF2_HMAC_SHA256;
const CREDENTIAL_LEN: usize = digest::SHA256_OUTPUT_LEN;

pub fn hash_password(secret: &[u8], salt: &[u8], iterations: u32) -> Vec<u8> {
    let mut out = vec![0u8; CREDENTIAL_LEN];
    let iterations = NonZeroU32::new(iterations).expect("Iterations can't be zero");
    pbkdf2::derive(DIGEST_ALG, iterations, &salt, secret, &mut out);
    out
}

pub fn verify_password(secret: &[u8], salt: &[u8], previous: &[u8], iterations: u32) -> bool {
    let iterations = NonZeroU32::new(iterations).expect("Iterations can't be zero");
    pbkdf2::verify(DIGEST_ALG, iterations, salt, secret, previous).is_ok()
}

pub fn get_random_64() -> Vec<u8> {
    get_random(vec![0u8; 64])
}

pub fn get_random(mut array: Vec<u8>) -> Vec<u8> {
    SystemRandom::new()
        .fill(&mut array)
        .expect("Error generating random values");
    array
}
