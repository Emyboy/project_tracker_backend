/* eslint-disable no-undef */
import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import setupSwagger from './utils/swagger';
import apiRoutes from './routes/api.route';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

setupSwagger(app, process.env.PORT);

app.use('/api/v1', apiRoutes);

app.get('/api', (req, res) => {
	res.status(200).send(`
		<div style="margin: 10%">
			<h1>Welcome To Project Tracker API</h1>
			<button><a href='https://project-tracker-api.herokuapp.com/api/v1/docs'>
				Go To Docs</a>
			</button>
		</div>
	`)
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
