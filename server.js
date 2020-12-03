const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const dbCredentialsMap = {
  '<USER>': process.env.MONGODB_USER,
  '<PASSWORD>': process.env.MONGODB_PASSWORD,
};
const dbConnectionString = process.env.MONGODB_URI.replace(
  /<USER>|<PASSWORD>/gi,
  (matched) => dbCredentialsMap[matched]
);

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Successfully connected to database'));

// SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => process.exit(1));
});
