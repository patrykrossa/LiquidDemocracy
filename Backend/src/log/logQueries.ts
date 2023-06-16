export const addLog = "INSERT INTO logs (description, loglevel_id, date) VALUES ($1,$2,$3) RETURNING *";
export const checkLoglevelExists = "SELECT * FROM loglevels WHERE loglevel_id = $1";
export const getLogs = "SELECT * FROM logs INNER JOIN loglevels on logs.loglevel_id = loglevels.loglevel_id";
export const getLogById = "SELECT * FROM logs INNER JOIN loglevels on logs.loglevel_id = loglevels.loglevel_id WHERE log_id = $1 ";
export const deleteLog = "DELETE FROM logs WHERE log_id = $1";
export const updateLog = "UPDATE logs SET description = $1, loglevel_id = $2, date = $3 WHERE log_id = $4 RETURNING *";