const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  const foundUser = userDB.users.find((dbUser) => dbUser.username === user);

  if (!foundUser)
    return res.status(401).json({
      message: "User not registered",
    });

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    //create JWT's
    res.json({
      message: "Successfully loggedIn User",
    });
  } else {
    res.status(401).json({
      message: "Unauthorized User!!",
    });
  }
};

module.exports = { handleLogin };
