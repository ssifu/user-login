const ldap = require("ldapjs");
const assert = require("assert");

// LDAP Connection Settings
const server = "192.168.117.128"; // 192.168.1.1
const userPrincipalName = "samiul.sifat@codomain.com"; // Username
const password = "SamBarSif35@."; // User password
const adSuffix = "dc=codomain,dc=com"; // test.com

// Create client and bind to AD
const client = ldap.createClient({
  url: `ldap://${server}`,
});

client.bind(userPrincipalName, password, (err) => {
  assert.ifError(err);
});

// Search AD for user
const searchOptions = {
  scope: "sub",
  filter: `(userPrincipalName=${userPrincipalName})`,
};

client.search(adSuffix, searchOptions, (err, res) => {
  assert.ifError(err);

  //   res.on("searchEntry", (entry) => {
  //     console.log("entry: " + entry);
  //   });

  res.on("searchEntry", (entry) => {
    const attributes = entry.attributes;
    const sAMAccountNameAttr = attributes.find(
      (attr) => attr.type === "sAMAccountName"
    );

    if (sAMAccountNameAttr) {
      const sAMAccountName = sAMAccountNameAttr.values[0];
      console.log("sAMAccountName: " + sAMAccountName);
    } else {
      console.log("sAMAccountName not found");
    }
  });
  res.on("searchReference", (referral) => {
    console.log("referral: " + referral.uris.join());
  });
  res.on("error", (err) => {
    console.error("error: " + err.message);
  });
  res.on("end", (result) => {
    // console.log(result);
  });
});

// Wrap up
client.unbind((err) => {
  assert.ifError(err);
});
