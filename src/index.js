const express = require('express');
const userRouter = require('./routers/user');
const capsuleRouter = require('./routers/capsule');

const app = express();
const port = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());

app.use(userRouter);
app.use(capsuleRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
