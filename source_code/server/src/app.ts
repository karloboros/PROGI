import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import errorHandler from 'shared/error/errorHandler';
import express from 'express';
import router from 'router';
import sequelize from 'shared/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.static('.tmp'));
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

// test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
  } catch {
    console.error('Unable to connect to the database');
  }
})();

app.listen(port, () => console.log(`App is listening on port ${port} !`));
