const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

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
    const roles = Object.values(foundUser.roles);

    //create JWT's
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60s",
      }
    );
    const refreshToken = jwt.sign(
      {
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const otherUser = userDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUser, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
    });
  } else {
    res.status(401).json({
      message: "Unauthorized User!!",
    });
  }
};

module.exports = { handleLogin };
