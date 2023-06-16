export const addActionType = "INSERT INTO actiontypes (actiontype) VALUES ($1) RETURNING *";
export const getActionTypes = "SELECT * FROM actiontypes";
export const getActionTypeById = "SELECT * FROM actiontypes WHERE actiontype_id = $1";
export const deleteActionTypeById = "DELETE FROM actionTypes WHERE actiontype_id = $1";
export const updateActionType = "UPDATE actionTypes SET actiontype = $1 WHERE actiontype_id = $2 RETURNING *";