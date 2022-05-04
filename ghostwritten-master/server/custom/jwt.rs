use crate::core::auth;
use crate::custom::schema;

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct AdditionalData {
    pub email: String,
    pub roles: Vec<schema::Roles>,
}

#[derive(Clone, Debug, serde::Serialize, serde::Deserialize)]
pub struct Payload {
    pub id: juniper::ID,
    pub jti: Option<String>,
    pub email: String,
    pub roles: Vec<schema::Roles>,
}

pub fn convert(payload: &Payload, exp: usize) -> auth::Claims {
    auth::Claims {
        sub: payload.id.to_string(),
        exp,
        ajd: AdditionalData {
            email: payload.email.clone(),
            roles: payload.roles.clone(),
        },
        jti: payload.jti.clone(),
    }
}
