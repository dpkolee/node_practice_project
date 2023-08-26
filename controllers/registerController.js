const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user | !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  //Check for duplicate username in database
  const duplicateUser = await User.findOne({ username: user }).exec();
  if (duplicateUser)
    return res.status(409).json({ message: "User has been already created" });

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

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
