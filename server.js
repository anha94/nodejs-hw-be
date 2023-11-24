const configs = require('./src/constants/configs');
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/helpers/dbConnect');

connectDB()
  .then(() => {
    const server = app.listen(configs.PORT, () => {
      console.log(`Server started on port ${configs.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

  
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
