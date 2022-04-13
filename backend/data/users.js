import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@exemple.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@exemple.com",
    password: bcrypt.hashSync("1234567", 10),
  },
  {
    name: "Joe Doe",
    email: "Joe@exemple.com",
    password: bcrypt.hashSync("1234567", 10),
  },
];

export default users;
