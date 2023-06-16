import express, { Express, Request, Response } from 'express';
import personRoutes from './src/person/personRoutes';
var cors = require('cors');

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/people', personRoutes);

app.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
