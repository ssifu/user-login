const express = require("express");
const cors = require("cors");
const ldap = require("ldapjs");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = "192.168.117.128"; 
const adSuffix = "dc=codomain,dc=com";

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const client = ldap.createClient({
    url: `ldap://${server}`,
  });

  const userPrincipalName = `${username}@codomain.com`;

  client.bind(userPrincipalName, password, (err) => {
    if (err) {
      console.error("Authentication failed: " + err.message);
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // If authentication is successful, search for the user's details
    const searchOptions = {
      scope: "sub",
      filter: `(userPrincipalName=${userPrincipalName})`,
    };

    client.search(adSuffix, searchOptions, (searchErr, searchRes) => {
      if (searchErr) {
        console.error("Search error: " + searchErr.message);
        return res.status(500).json({ error: "Failed to search user details" });
      }

      searchRes.on("searchEntry", (entry) => {
        const attributes = entry.attributes;
        const displayNameAttr = attributes.find(
          (attr) => attr.type === "displayName"
        );
        const givenNameAttr = attributes.find(
          (attr) => attr.type === "givenName"
        );
        const snAttr = attributes.find((attr) => attr.type === "sn");

        let fullName = displayNameAttr ? displayNameAttr.values[0] : null;

        // If displayName is not available, construct full name from givenName and sn
        if (!fullName && givenNameAttr && snAttr) {
          fullName = `${givenNameAttr.values[0]} ${snAttr.values[0]}`;
        }

        if (fullName) {
          console.log("Full Name: " + fullName);

          // Return successful login response with full name
          res.json({
            message: "Login Successful",
            user: {
              username: userPrincipalName,
              fullName: fullName,
              email: userPrincipalName,
            },
          });
        } else {
          res.status(404).json({ error: "User full name not found" });
        }
      });

      searchRes.on("error", (searchErr) => {
        console.error("Search error: " + searchErr.message);
        res.status(500).json({ error: "An error occurred during the search" });
      });

      searchRes.on("end", () => {
        client.unbind((unbindErr) => {
          if (unbindErr) {
            console.error("Failed to unbind: " + unbindErr.message);
          }
        });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
