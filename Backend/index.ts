import express, { Express, Request, Response } from 'express';
var cors = require('cors');

const app: Express = express();

app.use(express.json());
app.use(cors());

app.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
