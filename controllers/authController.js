const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const staffsFilePath = path.join(__dirname, "../data/staffs.json");
const staffData = JSON.parse(fs.readFileSync(staffsFilePath, "utf-8"));

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if user with the email & password exists
  const staff = staffData.find(
    (s) => s.email === email && s.password === password
  );
  if (!staff) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: staff.id,
      email: staff.email,
      role: staff.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

exports.logout = (req, res) => {
  // With JWT, "logout" is typically handled on the client side by discarding the token.
  // Or you can implement a token blacklist. For demonstration, we’ll just respond with success.
  return res.status(200).json({ message: "Logged out successfully" });
};
