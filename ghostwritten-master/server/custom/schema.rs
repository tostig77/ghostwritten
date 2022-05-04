use crate::core::{auth, error, graphql, util};
use crate::custom::{jwt, redis};

use self::redis::RedisIndex;
use auth::Token;

#[derive(juniper::GraphQLObject)]
pub struct Error {
    message: String,
}

#[juniper::graphql_interface(for = [User, Referrer])]
pub trait Node {
    fn id(&self) -> juniper::ID;
}
#[derive(juniper::GraphQLObject)]
pub struct PageInfo {
    has_next_page: bool,
    has_previous_page: bool,
    start_cursor: Option<String>,
    end_cursor: Option<String>,
}

#[derive(
    juniper::GraphQLEnum, Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize,
)]
pub enum Roles {
    Admin,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct User {
    id: juniper::ID,
    email: String,
    roles: Vec<Roles>,

    password: String,

    pub jti: Option<String>,
    pub sub: String,
}
#[juniper::graphql_object(impl = NodeValue)]
impl User {
    fn id(&self) -> juniper::ID {
        self.id.clone()
    }
    fn email(&self) -> String {
        self.email.clone()
    }
    fn roles(&self) -> Vec<Roles> {
        self.roles.clone()
    }
}
#[juniper::graphql_interface]
impl Node for User {
    fn id(&self) -> juniper::ID {
        self.id.clone()
    }
}

#[derive(juniper::GraphQLObject, Debug, serde::Serialize, serde::Deserialize)]
pub struct Referrer {
    id: juniper::ID,
    code: String,
}
#[juniper::graphql_interface]
impl Node for Referrer {
    fn id(&self) -> juniper::ID {
        self.id.clone()
    }
}

#[derive(
    juniper::GraphQLEnum, Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize,
)]
pub enum JobType {
    Essay,
    Application,
    Test,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Job {
    id: juniper::ID,
    job_type: JobType,
    email: String,
    details: String,
    price: i32,
}
#[juniper::graphql_object(impl = NodeValue)]
impl Job {
    fn id(&self) -> juniper::ID {
        self.id.clone()
    }
    fn job_type(&self) -> JobType {
        self.job_type
    }
    fn email(&self) -> String {
        self.email.clone()
    }
    fn details(&self) -> String {
        self.details.clone()
    }
    fn price(&self) -> i32 {
        self.price
    }
}
#[juniper::graphql_interface]
impl Node for Job {
    fn id(&self) -> juniper::ID {
        self.id.clone()
    }
}

#[derive(juniper::GraphQLInputObject)]
pub struct CreateUserInput {
    pub email: String,
    pub password: String,
    pub roles: Option<Vec<Roles>>,
}
#[derive(juniper::GraphQLInputObject)]
pub struct LoginUserInput {
    pub email: String,
    pub password: String,
}
#[derive(juniper::GraphQLInputObject)]
pub struct CreateReferrerInput {
    pub code: String,
}
#[derive(juniper::GraphQLInputObject)]
pub struct CreateJobInput {
    pub job_type: JobType,
    pub email: String,
    pub details: String,
    pub price: i32,
}
#[derive(juniper::GraphQLInputObject)]
pub struct DeleteJobInput {
    pub id: juniper::ID,
}
#[derive(juniper::GraphQLInputObject)]
pub struct SendEmailInput {
    pub from: String,
    pub to: Vec<String>,
    pub reply_to: Option<String>,
    pub subject: String,
    pub text: String,
    pub html: String,
}

pub struct Query;
#[juniper::graphql_object(context = graphql::JuniperContext)]
impl Query {
    pub async fn node(
        id: juniper::ID,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Option<NodeValue>> {
        let regex = regex::Regex::new("(.*:)*.*")?;
        let id = id.to_string();
        fn prefix(id: &str, regex: &regex::Regex) -> Option<String> {
            let captures = regex.captures(id)?;
            let prefix = captures.get(1)?;
            Some(prefix.as_str().to_string())
        }
        if let Some(prefix) = prefix(&id, &regex) {
            if prefix == User::prefix() {
                let mut redis_json = context.global.redis.json().await?;
                let json_data = match redis_json.get(id.clone(), None, None).await {
                    Ok(data) => Ok(data),
                    Err(_error) => {
                        let message = format!("No JSON data found for id {}", id);
                        Err(error::Error::new(&message))
                    }
                }?;
                let user = serde_json::from_str::<User>(json_data.as_str())?;
                return Ok(Some(user.into()));
            }
            if prefix == Referrer::prefix() {
                let mut redis_json = context.global.redis.json().await?;
                let json_data = match redis_json.get(id.clone(), None, None).await {
                    Ok(data) => Ok(data),
                    Err(_error) => {
                        let message = format!("No JSON data found for id {}", id);
                        Err(error::Error::new(&message))
                    }
                }?;
                let referrer = serde_json::from_str::<Referrer>(json_data.as_str())?;
                return Ok(Some(referrer.into()));
            }
        }
        let error_message = format!("No node found with id {}", id);
        Err(error::Error::new(&error_message).into())
    }

    pub async fn read_user(
        email: String,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Option<User>> {
        {
            let message = context.message.try_read()?;
            let claims = auth::util::authenticate(&message, &context.global)?;
            if claims.ajd.email != email {
                let message = format!("Failed to authenticate user with email {}", email);
                return Err(error::Error::new(&message).into());
            }
        }
        let query = format!(
            "@email:{{{}}}",
            email.replace("@", "\\@").replace(".", "\\.")
        );
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search.search(User::index_name(), query, None).await?;
        if search_result.results.len() > 1 {
            let message = format!("More than one user found with email {}", email);
            return Err(error::Error::new(&message).into());
        }
        match search_result.results.first() {
            Some(result) => {
                let user = serde_json::from_str::<User>(result.value.as_str())?;
                Ok(Some(user))
            }
            None => {
                let message = format!("No user found with email {}", email);
                Err(error::Error::new(&message).into())
            }
        }
    }
    pub async fn read_current_user(
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Option<User>> {
        let claims = {
            let message = context.message.try_read()?;
            auth::util::authenticate(&message, &context.global)?
        };
        let mut redis_json = context.global.redis.json().await?;
        let json_result = redis_json.get(claims.sub, None, None).await?;
        let user = serde_json::from_str::<User>(json_result.as_str())?;
        Ok(Some(user))
    }

    pub async fn read_referrer(
        code: String,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Option<Referrer>> {
        let query = format!("@code:{{{}}}", code);
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search
            .search(Referrer::index_name(), query, None)
            .await?;
        if search_result.results.len() > 1 {
            let message = format!("More than one referrer found with code {}", code);
            return Err(error::Error::new(&message).into());
        }
        match search_result.results.first() {
            Some(result) => {
                let referrer = serde_json::from_str::<Referrer>(result.value.as_str())?;
                Ok(Some(referrer))
            }
            None => {
                let message = format!("No referrer found with code {}", code);
                Err(error::Error::new(&message).into())
            }
        }
    }

    pub async fn read_jobs(
        email: String,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Option<Vec<Job>>> {
        {
            let message = context.message.try_read()?;
            let claims = auth::util::authenticate(&message, &context.global)?;
            if !claims.ajd.roles.contains(&Roles::Admin) {
                return Err(error::Error::new("Cannot read jobs without admin role").into());
            }
        }
        let query = format!("@email:{{{}}}", email);
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search.search(Job::index_name(), query, None).await?;
        let mut jobs = vec![] as Vec<Job>;
        for result in search_result.results {
            jobs.push(serde_json::from_str::<Job>(result.value.as_str())?);
        }
        Ok(Some(jobs))
    }
}
impl Query {
    pub fn new() -> Self {
        Self {}
    }
}
pub struct Mutation;
#[juniper::graphql_object(context = graphql::JuniperContext)]
impl Mutation {
    pub async fn create_user(
        input: CreateUserInput,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<User> {
        use scrypt::password_hash::PasswordHasher;

        let email = input.email.clone();
        let password = input.password.clone();
        let roles = input.roles.clone();

        if let Some(roles) = &roles {
            if roles.contains(&Roles::Admin) && email.as_str() != "admin@ghostwritten.io" {
                let message = context.message.try_read()?;
                let claims = auth::util::authenticate(&message, &context.global)?;
                if !claims.ajd.roles.contains(&Roles::Admin) {
                    return Err(
                        error::Error::new("Cannot create admin user without admin role").into(),
                    );
                }
            }
        }

        let id = format!("{}{}", User::prefix(), util::uuid());
        let query = format!(
            "@email:{{{}}}",
            email.replace("@", "\\@").replace(".", "\\.")
        );
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search.search(User::index_name(), query, None).await?;
        if !search_result.results.is_empty() {
            let message = format!("Email {} is already in use", email);
            return Err(error::Error::new(&message).into());
        }

        let hashed_password = scrypt::Scrypt
            .hash_password(password.as_bytes(), &context.global.auth.salt)?
            .to_string() as String;

        let user = User {
            id: id.clone().into(),
            email,
            roles: match roles {
                Some(value) => value,
                None => [].into(),
            },
            password: hashed_password,

            jti: None,
            sub: id.clone(),
        };
        let mut redis_json = context.global.redis.json().await?;
        redis_json
            .set(id, "$".into(), serde_json::to_string(&user)?, None)
            .await?;

        Ok(user)
    }
    pub async fn login_user(
        input: LoginUserInput,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<String> {
        use scrypt::password_hash::PasswordVerifier;

        let email = input.email.clone();
        let password = input.password.clone();

        let query = format!(
            "@email:{{{}}}",
            email.replace("@", "\\@").replace(".", "\\.")
        );
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search.search(User::index_name(), query, None).await?;
        if search_result.results.len() > 1 {
            let message = format!("More than one user found with email {}", email);
            return Err(error::Error::new(&message).into());
        }
        match search_result.results.first() {
            Some(result) => {
                let user = serde_json::from_str::<User>(result.value.as_str())?;
                let parsed_hash = scrypt::password_hash::PasswordHash::new(user.password.as_str())?;
                if scrypt::Scrypt
                    .verify_password(password.as_bytes(), &parsed_hash)
                    .is_err()
                {
                    let message = format!("Incorrect password for user with email {}", email);
                    Err(error::Error::new(&message).into())
                } else {
                    let claims = jwt::Payload {
                        id: user.id,
                        jti: user.jti,
                        email: user.email,
                        roles: user.roles,
                    };
                    let token = {
                        let mut message = context.message.try_write()?;
                        context
                            .global
                            .auth
                            .refresh
                            .create(claims.clone(), &mut message)?;
                        context.global.auth.access.create(claims, &mut message)?
                    };
                    Ok(token)
                }
            }
            None => {
                let message = format!("No user found with email {}", email);
                Err(error::Error::new(&message).into())
            }
        }
    }
    pub async fn logout_user(context: &graphql::JuniperContext) -> juniper::FieldResult<bool> {
        {
            let mut message = context.message.try_write()?;
            context.global.auth.refresh.reset(&mut message);
        }
        Ok(true)
    }
    /* @todo: implement revoke_user(id, context) -> bool */

    pub async fn create_referrer(
        input: CreateReferrerInput,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Referrer> {
        let code = input.code.clone();

        {
            let message = context.message.try_read()?;
            let claims = auth::util::authenticate(&message, &context.global)?;
            if !claims.ajd.roles.contains(&Roles::Admin) {
                return Err(error::Error::new("Cannot create referrer without admin role").into());
            }
        }
        let id = format!("{}{}", Referrer::prefix(), util::uuid());
        let query = format!("@code:{{{}}}", code);
        let mut redis_search = context.global.redis.search().await?;
        let search_result = redis_search
            .search(Referrer::index_name(), query, None)
            .await?;
        if !search_result.results.is_empty() {
            let message = format!("Code {} is already in use", code);
            return Err(error::Error::new(&message).into());
        }
        let referrer = Referrer {
            id: id.clone().into(),
            code,
        };
        let mut redis_json = context.global.redis.json().await?;
        redis_json
            .set(id, "$".into(), serde_json::to_string(&referrer)?, None)
            .await?;

        Ok(referrer)
    }

    pub async fn create_job(
        input: CreateJobInput,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<Job> {
        let job_type = input.job_type.clone();
        let email = input.email.clone();
        let details = input.details.clone();
        let price = input.price.clone();

        let id = format!("{}{}", Job::prefix(), util::uuid());
        let job = Job {
            id: id.clone().into(),
            job_type,
            email,
            details,
            price,
        };
        let mut redis_json = context.global.redis.json().await?;
        redis_json
            .set(id, "$".into(), serde_json::to_string(&job)?, None)
            .await?;

        Ok(job)
    }
    pub async fn delete_job(
        input: DeleteJobInput,
        context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<bool> {
        let id = input.id.clone();
        let mut redis_json = context.global.redis.json().await?;
        redis_json.del(id.to_string(), None).await?;

        Ok(true)
    }

    pub async fn send_email(
        input: SendEmailInput,
        _context: &graphql::JuniperContext,
    ) -> juniper::FieldResult<bool> {
        let from = input.from.clone();
        let reply_to = input.reply_to.unwrap_or(input.from);
        let mut to = input.to.clone();
        let personalization = match to.pop() {
            Some(first) => {
                let mut temp = sendgrid::v3::Personalization::new(sendgrid::v3::Email::new(first));
                for recipient in to {
                    temp = temp.add_to(sendgrid::v3::Email::new(recipient));
                }
                temp
            }
            None => {
                return Err(error::Error::new("Email has no recipients").into());
            }
        };

        let text_content = sendgrid::v3::Content::new()
            .set_content_type("text/plain")
            .set_value(input.text);

        let html_content = sendgrid::v3::Content::new()
            .set_content_type("text/html")
            .set_value(input.html);

        let email = sendgrid::v3::Message::new(sendgrid::v3::Email::new(from.clone()))
            .add_personalization(personalization)
            .add_content(text_content)
            .add_content(html_content)
            .set_subject(input.subject.as_str())
            .set_reply_to(sendgrid::v3::Email::new(reply_to))
            .set_from(sendgrid::v3::Email::new(from));
        let sender = sendgrid::v3::Sender::new(std::env::var("SENDGRID_KEY")?);
        sender.send(&email).await?;
        Ok(true)
    }
}
impl Mutation {
    pub fn new() -> Self {
        Self {}
    }
}

pub type Subscription = juniper::EmptySubscription<graphql::JuniperContext>;
