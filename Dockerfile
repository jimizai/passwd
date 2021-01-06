FROM rust:latest as build

RUN rustup set profile minimal

RUN USER=root cargo new /app

WORKDIR /app

COPY ./Cargo.* ./
COPY ./rust-toolchain ./rust-toolchain

COPY . .

RUN cargo build --features mysql --release


FROM debian:buster-slim

RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    openssl \
    ca-certificates \
    curl \
    libmariadb-dev-compat \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /data
VOLUME /data
WORKDIR /data
# COPY Rocket.toml .
COPY --from=build /app/target/release/passwd .

CMD ["/data/passwd"]