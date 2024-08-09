const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    firstName: "Samiul Baree",
    lastName: "Sifat",
    email: "sifat@gmail.com",
    password: "1234",
  },
  {
    id: 2,
    firstName: "Ashiqur",
    lastName: "Rahman",
    email: "ashiq@gmail.com",
    password: "1234",
  },
  {
    id: 1,
    firstName: "Shafiur",
    lastName: "Rahman",
    email: "shafiur@gmail.com",
    password: "1234",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const isPasswordValid = password === user.password;
  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  res.json({
    message: "Login Successful",
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
