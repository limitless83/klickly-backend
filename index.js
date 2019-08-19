const app = require('./src/app');

app.listen(process.env.API_SERVER_PORT, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log(`Server listening on ${process.env.API_SERVER_PORT}`);
});
