-- =========================
-- user_roles enum
-- =========================
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- =========================
-- users table
-- =========================
CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================
-- auth_providers table
-- =========================
CREATE TABLE auth_providers (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'local', 'google', 'facebook', etc.
    provider_user_id TEXT,
    email TEXT NOT NULL,
    password_hash TEXT,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (provider, provider_user_id)
);

-- =========================
-- log_level enum
-- =========================
CREATE TYPE log_level AS ENUM ('debug', 'info', 'warn', 'error');

-- =========================
-- app_logs table
-- =========================
CREATE TABLE app_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    level log_level NOT NULL,
    category TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
