use diesel::MysqlConnection;
use rocket_contrib::database;
#[database("passwd")]
pub struct DbConn(MysqlConnection);
