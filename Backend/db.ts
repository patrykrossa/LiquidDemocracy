import { Pool } from 'pg';

const pool: Pool = new Pool({
	user: 'postgres',
	password: 'postgres',
	database: 'liquid_democracy_database',
	host: 'localhost',
	port: 5432,
});

export default pool;
