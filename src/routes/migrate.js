const { spawn } = require('child_process');

module.exports = (app) => {
  app.post('/api/migrate', async (req, res) => {
    try {
      const { storeName } = req.query;
      const child = spawn('node', ['./src/scripts/migrate.js', storeName]);
      // child.pid

      res.send({
        message: 'started migration',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: error.toString(),
      });
    }
  });
};
