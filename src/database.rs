use diesel::MysqlConnection;
use rocket_contrib::database;
#[database("passwd")]
pub struct DbConn(MysqlConnection);

use diesel::prelude::*;
use diesel::query_dsl::methods::LoadQuery;

#[derive(Debug, Clone, Copy, QueryId)]
pub struct OffsetLimited<T> {
    query: T,
    offset: i64,
    limit: i64,
}

pub trait OffsetLimit: Sized {
    fn offset_and_limit(self, offset: i64, limit: i64) -> OffsetLimited<Self>;
}

impl<T> OffsetLimit for T {
    fn offset_and_limit(self, offset: i64, limit: i64) -> OffsetLimited<T> {
        OffsetLimited {
            query: self,
            limit,
            offset,
        }
    }
}

impl<T> OffsetLimited<T> {
    pub fn load_and_count<U>(self, conn: &MysqlConnection) -> QueryResult<(Vec<U>, i64)>
    where
        Self: LoadQuery<MysqlConnection, (U, i64)>,
    {
        let results = self.load::<(U, i64)>(conn)?;
        let total = results.get(0).map(|x| x.1).unwrap_or(0);
        let records = results.into_iter().map(|x| x.0).collect();
        Ok((records, total))
    }
}
