// const express = require("express");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // const users = [
// //   {
// //     id: 1,
// //     firstName: "Samiul Baree",
// //     lastName: "Sifat",
// //     email: "sifat@gmail.com",
// //     password: "1234",
// //   },
// //   {
// //     id: 2,
// //     firstName: "Ashiqur",
// //     lastName: "Rahman",
// //     email: "ashiq@gmail.com",
// //     password: "1234",
// //   },
// //   {
// //     id: 1,
// //     firstName: "Shafiur",
// //     lastName: "Rahman",
// //     email: "shafiur@gmail.com",
// //     password: "1234",
// //   },
// // ];

// app.get("/", (req, res) => {
//   res.send("Welcome to my API!");
// });

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;
//   // const user = users.find((u) => u.email === email);
//   // if (!user) {
//   //   return res.status(400).json({ error: "Invalid email or password" });
//   // }
//   // const isPasswordValid = password === user.password;
//   // if (!isPasswordValid) {
//   //   return res.status(400).json({ error: "Invalid email or password" });
//   // }

//   res.json({
//     message: "Login Successful",
//     user: {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     },
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const express = require("express");
// const cors = require("cors");
// const ldap = require("ldapjs");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // LDAP Connection Settings
// const server = "192.168.117.128"; // Replace with your LDAP server IP or hostname
// const adSuffix = "dc=codomain,dc=com"; // Replace with your AD domain components

// app.get("/", (req, res) => {
//   res.send("Welcome to my API!");
// });

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;

//   // Create an LDAP client
//   const client = ldap.createClient({
//     url: `ldap://${server}`,
//   });

//   // Construct the User Principal Name (UPN) or sAMAccountName
//   const userPrincipalName = `${username}@codomain.com`; // Assuming UPN format

//   // Attempt to bind (authenticate) with the user's credentials
//   client.bind(userPrincipalName, password, (err) => {
//     if (err) {
//       console.error("Authentication failed: " + err.message);
//       return res.status(400).json({ error: "Invalid username or password" });
//     }

//     // If authentication is successful, send a success message
//     res.json({
//       message: "Login Successful",
//       user: {
//         username: userPrincipalName,
//       },
//     });

//     // Optionally, perform a search for additional user details if needed
//     const searchOptions = {
//       scope: "sub",
//       filter: `(userPrincipalName=${userPrincipalName})`,
//     };

//     client.search(adSuffix, searchOptions, (searchErr, searchRes) => {
//       if (searchErr) {
//         console.error("Search error: " + searchErr.message);
//         return;
//       }

//       searchRes.on("searchEntry", (entry) => {
//         const attributes = entry.attributes;
//         const sAMAccountNameAttr = attributes.find(
//           (attr) => attr.type === "sAMAccountName"
//         );

//         if (sAMAccountNameAttr) {
//           const sAMAccountName = sAMAccountNameAttr.values[0];
//           console.log("sAMAccountName: " + sAMAccountName);

//           // Optionally, you could log or handle additional user data here
//         }
//       });

//       searchRes.on("error", (searchErr) => {
//         console.error("Search error: " + searchErr.message);
//       });

//       searchRes.on("end", () => {
//         client.unbind((unbindErr) => {
//           if (unbindErr) {
//             console.error("Failed to unbind: " + unbindErr.message);
//           }
//         });
//       });
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
