import bcrypt from "bcrypt";
const users = [
  {
    name: "vaibhav",
    email: "vaibhav@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "raju",
    email: "raju@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "ayush",
    email: "ayush@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
