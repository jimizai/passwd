use passwd;

fn main() -> Result<(), String> {
    let rocket = passwd::rocket_factory()?;
    rocket.launch();
    Ok(())
}
