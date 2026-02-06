import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: 'app_user',
  password: 'app_password_456',
  database: 'cafeteria_db',
  port: 5432,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);