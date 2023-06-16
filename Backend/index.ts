import express, { Express, Request, Response } from 'express';
import personRoutes from './src/person/personRoutes';
import loglevelRoutes from './src/loglevel/loglevelRoutes';
import actionTypeRoutes from './src/actionTypes/actionTypeRoutes';
import logRoutes from './src/log/logRoutes';
var cors = require('cors');

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/people', personRoutes);
app.use('/api/loglevels', loglevelRoutes);
app.use('/api/actionTypes', actionTypeRoutes);
app.use('/api/logs', logRoutes);

app.listen(8000, () => {
	console.log('Server is listening on port 8000');
});
