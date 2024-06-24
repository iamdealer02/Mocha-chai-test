import app from './src/app';
import config from './config';

const { PORT, NODE_ENV } = config;

const server = app.listen(PORT, () => {
	console.log(`Application running on port: ${PORT} in ${NODE_ENV} mode`);
});

module.exports = server;