const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user | !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  //Check for duplicate username in database
  const duplicateUser = userDB.users.find((dbUser) => dbUser.username === user);
  if (duplicateUser)
    return res.status(409).json({ message: "User has been already created" });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
      roles: {
        User: 2001,
      },
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log("userDB.users", userDB.users);
    res.status(201).json({
      message: "New User has been created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleNewUser,
};
