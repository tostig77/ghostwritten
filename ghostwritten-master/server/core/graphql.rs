use crate::core::{context, error, message};
use crate::custom::schema;

pub struct JuniperContext {
    pub message: std::sync::Arc<std::sync::RwLock<message::Message>>,
    pub global: context::Context,
}
impl JuniperContext {
    pub fn new(
        message: std::sync::Arc<std::sync::RwLock<message::Message>>,
        global: context::Context,
    ) -> Self {
        Self { message, global }
    }
}
impl juniper::Context for JuniperContext {}

#[derive(Clone)]
pub struct GraphQLContext {
    pub root_node: std::sync::Arc<
        juniper::RootNode<'static, schema::Query, schema::Mutation, schema::Subscription>,
    >,
}
impl GraphQLContext {
    pub fn new() -> Result<Self, error::Error> {
        crate::console_log!("Creating GraphQL context...");

        let root_node = juniper::RootNode::new(
            schema::Query::new(),
            schema::Mutation::new(),
            schema::Subscription::new(),
        );

        let schema = root_node.as_schema_language();
        let schema_path = std::path::Path::new(".").join("graphql").join("schema.gql");
        std::fs::write(schema_path, schema)?;

        let instance = Self {
            root_node: std::sync::Arc::new(root_node),
        };
        Ok(instance)
    }
}
