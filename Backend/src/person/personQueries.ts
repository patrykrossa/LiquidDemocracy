export const addPerson = "INSERT INTO people (wallet_address,name,surname,birthday,living_address,pesel) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
export const checkWalletAddressExists = "SELECT * from people WHERE wallet_address = $1";
export const checkPeselExists = "SELECT * from people WHERE pesel = $1";
export const getPeople = "Select * FROM people";
export const getPersonById = "Select * FROM people WHERE person_id = $1";
export const deletePerson= "Delete FROM people WHERE person_id = $1";
export const updateUser = "Update people SET wallet_address = $1, name = $2, surname = $3, birthday = $4, living_address = $5, pesel = $6 WHERE person_id = $7 RETURNING *";
