require("dotenv").config({ quiet: true });
const dns = require("node:dns");
const mongoose = require("mongoose");
const app = require("./app");

// Some networks give Node a DNS server that cannot resolve Atlas SRV records.
// Set DNS_SERVERS (comma separated) in .env to override. Leave it unset on Railway.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });
