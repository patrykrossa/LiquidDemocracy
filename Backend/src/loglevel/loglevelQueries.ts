export const addLoglevel = "INSERT INTO loglevels (loglevel) VALUES ($1) RETURNING *";
export const getLoglevels = "SELECT * FROM loglevels";
export const getLoglevelById = "SELECT * FROM loglevels WHERE loglevel_id = $1";
export const deleteLoglevelById = "DELETE FROM loglevels WHERE loglevel_id = $1";
export const updateLoglevel = "Update loglevels SET loglevel = $1 WHERE loglevel_id = $2 RETURNING *";
