use crate::core::{context, error, redis};
use crate::custom::schema;

pub trait RedisIndex {
    fn index_name() -> String;
    fn prefix() -> String;
    fn tag() -> Option<(String, String)>;

    fn index() -> (
        String,
        Vec<redis::FTSchemaField>,
        Option<redis::FTCreateParameters>,
    ) {
        let schema_fields = match Self::tag() {
            Some((tag_name, tag_as)) => {
                let schema_field = redis::FTSchemaField::build()
                    .name(tag_name)
                    .field_type("TAG".into())
                    .field_as(tag_as);
                vec![schema_field]
            }
            None => vec![],
        };
        let prefix = redis::FTCreateParametersPrefix {
            count: 1,
            name: Self::prefix(),
        };
        let create_parameters = redis::FTCreateParameters::build().prefix(&[prefix]);
        (Self::index_name(), schema_fields, Some(create_parameters))
    }
}

impl RedisIndex for schema::User {
    fn index_name() -> String {
        "users".into()
    }

    fn prefix() -> String {
        "nodes:users:".into()
    }

    fn tag() -> Option<(String, String)> {
        Some(("$.email".into(), "email".into()))
    }
}
impl RedisIndex for schema::Referrer {
    fn index_name() -> String {
        "referrers".into()
    }

    fn prefix() -> String {
        "nodes:referrers:".into()
    }

    fn tag() -> Option<(String, String)> {
        Some(("$.code".into(), "code".into()))
    }
}
impl RedisIndex for schema::Job {
    fn index_name() -> String {
        "jobs".into()
    }

    fn prefix() -> String {
        "nodes:jobs:".into()
    }

    fn tag() -> Option<(String, String)> {
        Some(("$.email".into(), "email".into()))
    }
}

pub async fn index(context: &context::Context) -> Result<(), error::Error> {
    let mut redis_search = context.redis.search().await?;
    {
        let (name, schema_fields, parameters) = schema::User::index();
        let _ = redis_search
            .create(name, "JSON".into(), schema_fields, parameters)
            .await;
    }
    {
        let (name, schema_fields, parameters) = schema::Referrer::index();
        let _ = redis_search
            .create(name, "JSON".into(), schema_fields, parameters)
            .await;
    }
    Ok(())
}
