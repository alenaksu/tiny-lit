const path = require('path');
const express = require('express');

const app  = express();

// app.set('port', 3000);
app.use(express.static(__dirname));
app.use('/src/tiny-lit', express.static(path.join(__dirname, '..', 'dist', 'tiny-lit.js')));
app.use('/src/tiny-element', express.static(path.join(__dirname, '..', 'dist', 'tiny-element.js')));
app.use('/src/tiny-scheduler', express.static(path.join(__dirname, '..', 'dist', 'tiny-scheduler.js')));

app.listen(3000, function() {
  console.log('Demo listening on port 3000!');
});

module.exports = app;