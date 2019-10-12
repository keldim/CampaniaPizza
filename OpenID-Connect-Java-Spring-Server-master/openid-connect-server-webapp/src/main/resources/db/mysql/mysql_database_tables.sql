--
-- Tables for OIDC Server functionality, MySQL
--

USE `mitre-openid-connect`;

CREATE TABLE IF NOT EXISTS access_token (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	token_value TEXT,
	expiration TIMESTAMP NULL,
	token_type TEXT,
	refresh_token_id BIGINT,
	client_id BIGINT,
	auth_holder_id BIGINT,
	approved_site_id BIGINT
);

CREATE TABLE IF NOT EXISTS access_token_permissions (
	access_token_id BIGINT NOT NULL,
	permission_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS address (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	formatted TEXT,
	street_address TEXT,
	locality TEXT,
	region TEXT,
	postal_code TEXT,
	country TEXT
);

CREATE TABLE IF NOT EXISTS approved_site (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_id TEXT,
	client_id TEXT,
	creation_date TIMESTAMP NULL,
	access_date TIMESTAMP NULL,
	timeout_date TIMESTAMP NULL,
	whitelisted_site_id BIGINT
);

CREATE TABLE IF NOT EXISTS approved_site_scope (
	owner_id BIGINT,
	scope TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	user_auth_id BIGINT,
	approved BOOLEAN,
	redirect_uri TEXT,
	client_id TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_authority (
	owner_id BIGINT,
	authority TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_resource_id (
	owner_id BIGINT,
	resource_id TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_response_type (
	owner_id BIGINT,
	response_type TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_extension (
	owner_id BIGINT,
	extension TEXT,
	val TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_scope (
	owner_id BIGINT,
	scope TEXT
);

CREATE TABLE IF NOT EXISTS authentication_holder_request_parameter (
	owner_id BIGINT,
	param TEXT,
	val TEXT
);

CREATE TABLE IF NOT EXISTS saved_user_auth (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name TEXT,
	authenticated BOOLEAN,
	source_class TEXT
);

CREATE TABLE IF NOT EXISTS saved_user_auth_authority (
	owner_id BIGINT,
	authority TEXT
);

CREATE TABLE IF NOT EXISTS client_authority (
	owner_id BIGINT,
	authority TEXT
);

CREATE TABLE IF NOT EXISTS authorization_code (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	code TEXT,
	auth_holder_id BIGINT,
	expiration TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS client_grant_type (
	owner_id BIGINT,
	grant_type TEXT
);

CREATE TABLE IF NOT EXISTS client_response_type (
	owner_id BIGINT,
	response_type TEXT
);

CREATE TABLE IF NOT EXISTS blacklisted_site (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	uri TEXT
);

CREATE TABLE IF NOT EXISTS client_details (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,

	client_description TEXT,
	reuse_refresh_tokens BOOLEAN DEFAULT true NOT NULL,
	dynamically_registered BOOLEAN DEFAULT false NOT NULL,
	allow_introspection BOOLEAN DEFAULT false NOT NULL,
	id_token_validity_seconds BIGINT DEFAULT 600 NOT NULL,
	device_code_validity_seconds BIGINT,
	
	client_id VARCHAR(256),
	client_secret TEXT,
	access_token_validity_seconds BIGINT,
	refresh_token_validity_seconds BIGINT,
	
	application_type TEXT,
	client_name TEXT,
	token_endpoint_auth_method TEXT,
	subject_type TEXT,
	
	logo_uri TEXT,
	policy_uri TEXT,
	client_uri TEXT,
	tos_uri TEXT,

	jwks_uri TEXT,
	jwks TEXT,
	sector_identifier_uri TEXT,
	
	request_object_signing_alg TEXT,
	
	user_info_signed_response_alg TEXT,
	user_info_encrypted_response_alg TEXT,
	user_info_encrypted_response_enc TEXT,
	
	id_token_signed_response_alg TEXT,
	id_token_encrypted_response_alg TEXT,
	id_token_encrypted_response_enc TEXT,
	
	token_endpoint_auth_signing_alg TEXT,
	
	default_max_age BIGINT,
	require_auth_time BOOLEAN,
	created_at TIMESTAMP NULL,
	initiate_login_uri TEXT,
	clear_access_tokens_on_refresh BOOLEAN DEFAULT true NOT NULL,
	
	software_statement TEXT,
	software_id TEXT,
	software_version TEXT,
	
	code_challenge_method TEXT,
	
	UNIQUE (client_id)
);

CREATE TABLE IF NOT EXISTS client_request_uri (
	owner_id BIGINT,
	request_uri TEXT
);

CREATE TABLE IF NOT EXISTS client_post_logout_redirect_uri (
	owner_id BIGINT,
	post_logout_redirect_uri TEXT
);

CREATE TABLE IF NOT EXISTS client_default_acr_value (
	owner_id BIGINT,
	default_acr_value TEXT
);

CREATE TABLE IF NOT EXISTS client_contact (
	owner_id BIGINT,
	contact TEXT
);

CREATE TABLE IF NOT EXISTS client_redirect_uri (
	owner_id BIGINT, 
	redirect_uri TEXT 
);

CREATE TABLE IF NOT EXISTS client_claims_redirect_uri (
	owner_id BIGINT, 
	redirect_uri TEXT 
);

CREATE TABLE IF NOT EXISTS refresh_token (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	token_value TEXT,
	expiration TIMESTAMP NULL,
	auth_holder_id BIGINT,
	client_id BIGINT
);

CREATE TABLE IF NOT EXISTS client_resource (
	owner_id BIGINT, 
	resource_id TEXT 
);

CREATE TABLE IF NOT EXISTS client_scope (
	owner_id BIGINT,
	scope TEXT
);

CREATE TABLE IF NOT EXISTS token_scope (
	owner_id BIGINT,
	scope TEXT
);

CREATE TABLE IF NOT EXISTS system_scope (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	scope VARCHAR(256) NOT NULL,
	description TEXT,
	icon TEXT,
	restricted BOOLEAN DEFAULT false NOT NULL,
	default_scope BOOLEAN DEFAULT false NOT NULL,
    structured BOOLEAN DEFAULT false NOT NULL,
	structured_param_description TEXT,
	UNIQUE (scope)
);

CREATE TABLE IF NOT EXISTS user_info (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	sub TEXT,
	preferred_username TEXT,
	name TEXT,
	given_name TEXT,
	family_name TEXT,
	middle_name TEXT,
	nickname TEXT,
	profile TEXT,
	picture TEXT,
	website TEXT,
	email TEXT,
	email_verified BOOLEAN,
	gender TEXT,
	zone_info TEXT,
	locale TEXT,
	phone_number TEXT,
	phone_number_verified BOOLEAN,
	address_id TEXT,
	updated_time TEXT,
	birthdate TEXT,
	src TEXT
);

CREATE TABLE IF NOT EXISTS whitelisted_site (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	creator_user_id TEXT,
	client_id TEXT
);

CREATE TABLE IF NOT EXISTS whitelisted_site_scope (
	owner_id BIGINT,
	scope TEXT
);

CREATE TABLE IF NOT EXISTS pairwise_identifier (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	identifier TEXT,
	sub TEXT,
	sector_identifier TEXT
);

CREATE TABLE IF NOT EXISTS resource_set (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name TEXT NOT NULL,
	uri TEXT,
	icon_uri TEXT,
	rs_type TEXT,
	owner TEXT NOT NULL,
	client_id TEXT
);

CREATE TABLE IF NOT EXISTS resource_set_scope (
	owner_id BIGINT NOT NULL,
	scope TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS permission_ticket (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	ticket TEXT NOT NULL,
	permission_id BIGINT NOT NULL,
	expiration TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS permission (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	resource_set_id BIGINT
);

CREATE TABLE IF NOT EXISTS permission_scope (
	owner_id BIGINT NOT NULL,
	scope TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS claim (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name TEXT,
	friendly_name TEXT,
	claim_type TEXT,
	claim_value TEXT
);

CREATE TABLE IF NOT EXISTS claim_to_policy (
	policy_id BIGINT NOT NULL,
	claim_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS claim_to_permission_ticket (
	permission_ticket_id BIGINT NOT NULL,
	claim_id BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS policy (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	name TEXT,
	resource_set_id BIGINT
);

CREATE TABLE IF NOT EXISTS policy_scope (
	owner_id BIGINT NOT NULL,
	scope TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS claim_token_format (
	owner_id BIGINT NOT NULL,
	claim_token_format TEXT
);

CREATE TABLE IF NOT EXISTS claim_issuer (
	owner_id BIGINT NOT NULL,
	issuer TEXT
);

CREATE TABLE IF NOT EXISTS saved_registered_client (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	issuer TEXT,
	registered_client TEXT
);

CREATE TABLE IF NOT EXISTS device_code (
	id BIGINT AUTO_INCREMENT PRIMARY KEY,
	device_code TEXT,
	user_code TEXT,
	expiration TIMESTAMP NULL,
	client_id TEXT,
	approved BOOLEAN,
	auth_holder_id BIGINT	
);

CREATE TABLE IF NOT EXISTS device_code_scope (
	owner_id BIGINT NOT NULL,
	scope TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS device_code_request_parameter (
	owner_id BIGINT,
	param TEXT,
	val TEXT
);
