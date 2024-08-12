const ldap = require("ldapjs");

// LDAP Connection Settings
const server = "192.168.117.128";
const userPrincipalName = "abc.def@codomain.com"; // The user's UPN
const password = "SamBarSif35@."; // The user's password

// Create an LDAP client
const client = ldap.createClient({
  url: `ldap://${server}`,
});

// Attempt to bind (authenticate) with the user's credentials
client.bind(userPrincipalName, password, (err) => {
  if (err) {
    console.error("Authentication failed: " + err.message);
    // Handle the error (e.g., wrong credentials)
  } else {
    console.log("Authentication successful");
    // Proceed with further operations if needed
  }

  // Unbind after the operation
  client.unbind((unbindErr) => {
    if (unbindErr) {
      console.error("Failed to unbind: " + unbindErr.message);
    }
  });
});
