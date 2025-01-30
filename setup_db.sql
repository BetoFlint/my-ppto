-- Conectarse a la base de datos postgres por defecto
\c postgres;

-- Crear la base de datos
DROP DATABASE IF EXISTS BDPPTO;
CREATE DATABASE BDPPTO;

-- Crear el usuario si no existe
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'USUARIOPPTO') THEN
      CREATE USER USUARIOPPTO WITH PASSWORD 'USUARIOPPTO';
   END IF;
END
$do$;

-- Otorgar privilegios a nivel de base de datos
GRANT ALL PRIVILEGES ON DATABASE BDPPTO TO USUARIOPPTO;

-- Ahora nos conectamos a la base de datos recién creada
\c BDPPTO;

-- Crear la tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Otorgar privilegios sobre los objetos
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO USUARIOPPTO;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO USUARIOPPTO;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO USUARIOPPTO;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO USUARIOPPTO;