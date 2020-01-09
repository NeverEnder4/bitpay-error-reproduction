const bitpay = require("bitpay-rest");
const bitauth = require("bitauth");
const fs = require("fs");

const privkey = bitauth.decrypt(
  "",
  fs.readFileSync("/Users/tonypdev/.bitpay/api.key", "utf8")
);
const client = bitpay.createClient(privkey);

client.on("error", err => {
  console.error(err);
});

client.on("ready", () => {
  console.log("CONNECTED AND READY");

  client
    .as("pos")
    .post("invoices", { price: 1, currency: "USD" }, function(err, invoice) {
      if (err) console.error(err);
      else console.log(invoice);
    });
});
