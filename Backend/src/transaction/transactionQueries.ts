export const addTransaction = "INSERT INTO transactions (hash, details, actiontype_id) VALUES ($1,$2,$3) RETURNING *";
export const checkActionTypeExists = "SELECT * FROM actiontypes WHERE actiontype_id = $1";
export const getTransactions = "SELECT * FROM transactions INNER JOIN actiontypes on transactions.actiontype_id = actiontypes.actiontype_id";
export const getTransactionById = "SELECT * FROM transactions INNER JOIN actiontypes on transactions.actiontype_id = actiontypes.actiontype_id WHERE transaction_id = $1 ";
export const deleteTransaction = "DELETE FROM transactions WHERE transaction_id = $1";
export const updateTransaction = "UPDATE transactions SET hash = $1, details = $2, actiontype_id = $3 WHERE transaction_id = $4 RETURNING *";