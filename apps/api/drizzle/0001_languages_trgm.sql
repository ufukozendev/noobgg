CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- GIN index for name & code LIKE %% searches
CREATE INDEX IF NOT EXISTS languages_name_trgm_idx ON languages USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS languages_code_trgm_idx ON languages USING gin (code gin_trgm_ops); 