/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import setupSwagger from './src/utils/swagger';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


setupSwagger(app, process.env.PORT);

app.get('/api', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the Project Tracker API'
	  });
});

app.get('*', (req, res) => {
	res.status(404).json({
		message: 'Endpoint not found'
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export default app;
