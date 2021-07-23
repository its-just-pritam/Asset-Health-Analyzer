const express = require('express');
const fs = require('fs');
const path = require('path');
const setEnvironment = require('./setEnvironment');
const updateIndex = require('./updateIndex');
const { checkDependencyHealth } = require('./dependencyHealthCheck');
var server = express();
server.use(express.static(__dirname));
setEnvironment(path.join(__dirname, 'tmp_config.js'), __dirname)
  .then((hash) => {
    updateIndex(hash)
  })
  .catch((err) => {
    console.log(err);
  });

server.get('/health/startup', async (req, res) => {
  var resultsForDependentCheck = await checkDependencyHealth();
  if (resultsForDependentCheck) {
    return res.send("Healthy");
  }
  return res.status(503).send("Unhealthy");

});

server.get('/health/liveness', (req, res) => {
  res.send("Healthy");
});

server.get('/health/readiness', (req, res) => {
  res.send("Healthy");
});


server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => console.log('listening on port 3000!'));