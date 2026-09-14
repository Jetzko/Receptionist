require('dotenv').config();

const express = require('express');
const dns = require('node:dns/promises');
const mongoose = require('mongoose');
const cabinsRouter = require('./routes/cabinsRouter');

// Server
const app = express();
dns.setServers(['1.1.1.1', '1.0.0.1']);
app.listen(process.env.PORT, () => {
  console.log('Listening to PORT', process.env.PORT);
});

app.use(express.json());

// Router
app.use('/api/cabins/', cabinsRouter);

// Database
main().catch((err) => console.log(err));
async function main() {
  console.log('Attempt to connect to DB');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Succeccfully connected to DB');
}
