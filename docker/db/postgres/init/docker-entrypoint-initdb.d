#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_USERNAME" --dbname "$DB_DATABASE" <<-EOSQL
	CREATE EXTENSION IF NOT EXISTS unaccent;
EOSQL