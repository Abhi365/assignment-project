const { Client } = require("pg");

const client = new Client({
  host: "host.docker.internal",
  port: 5432,
  user: "postgres",
  password: "postgrespassword",
  database: "postgres",
});

const dbSetUp = () => {
  client
    .connect()
    .then(() => {
      console.log("Connection Success");
    })
    .catch((err) => {
      console.log(`Connection Failed.`, err);
    });
};

const getClient = async () => {
  return client;
};

module.exports = { dbSetUp, getClient };
