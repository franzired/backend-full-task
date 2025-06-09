const config = {
  "issuer": "https://keycloak.gawron.cloud/realms/webentwicklung",
  "authorization_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/auth",
  "token_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/token",
  "introspection_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/token/introspect",
  "userinfo_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/userinfo",
  "end_session_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/logout",
  "frontchannel_logout_session_supported": true,
  "frontchannel_logout_supported": true,
  "jwks_uri": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/certs",
  "check_session_iframe": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/login-status-iframe.html",
  "grant_types_supported": [
    "authorization_code",
    "client_credentials",
    "implicit",
    "password",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:device_code",
    "urn:ietf:params:oauth:grant-type:token-exchange",
    "urn:ietf:params:oauth:grant-type:uma-ticket",
    "urn:openid:params:grant-type:ciba"
  ],
  "acr_values_supported": [
    "0",
    "1"
  ],
  "response_types_supported": [
    "code",
    "none",
    "id_token",
    "token",
    "id_token token",
    "code id_token",
    "code token",
    "code id_token token"
  ],
  "subject_types_supported": [
    "public",
    "pairwise"
  ],
  "prompt_values_supported": [
    "none",
    "login",
    "consent"
  ],
  "registration_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/clients-registrations/openid-connect",
  "token_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "client_secret_basic",
    "client_secret_post",
    "tls_client_auth",
    "client_secret_jwt"
  ],
  "claims_supported": [
    "aud",
    "sub",
    "iss",
    "auth_time",
    "name",
    "given_name",
    "family_name",
    "preferred_username",
    "email",
    "acr"
  ],
  "claim_types_supported": [
    "normal"
  ],
  "claims_parameter_supported": true,
  "scopes_supported": [
    "openid",
    "email",
    "offline_access",
    "basic",
    "organization",
    "address",
    "service_account",
    "microprofile-jwt",
    "roles",
    "phone",
    "web-origins",
    "profile",
    "acr"
  ],
  "request_parameter_supported": true,
  "request_uri_parameter_supported": true,
  "require_request_uri_registration": true,
  "code_challenge_methods_supported": [
    "plain",
    "S256"
  ],
  "tls_client_certificate_bound_access_tokens": true,
  "revocation_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/revoke",
  "revocation_endpoint_auth_methods_supported": [
    "private_key_jwt",
    "client_secret_basic",
    "client_secret_post",
    "tls_client_auth",
    "client_secret_jwt"
  ],
  "backchannel_logout_supported": true,
  "backchannel_logout_session_supported": true,
  "device_authorization_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/auth/device",
  "backchannel_token_delivery_modes_supported": [
    "poll",
    "ping"
  ],
  "backchannel_authentication_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/ext/ciba/auth",
  "require_pushed_authorization_requests": false,
  "pushed_authorization_request_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/ext/par/request",
  "mtls_endpoint_aliases": {
    "token_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/token",
    "revocation_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/revoke",
    "introspection_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/token/introspect",
    "device_authorization_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/auth/device",
    "registration_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/clients-registrations/openid-connect",
    "userinfo_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/userinfo",
    "pushed_authorization_request_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/ext/par/request",
    "backchannel_authentication_endpoint": "https://keycloak.gawron.cloud/realms/webentwicklung/protocol/openid-connect/ext/ciba/auth"
  },
  "authorization_response_iss_parameter_supported": true,
  "user" : "public",
  "password":"todo"
};

export default config;