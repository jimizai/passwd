use rocket_contrib::database;
#[database("passwd")]
pub struct DbConn(diesel::MysqlConnection);
