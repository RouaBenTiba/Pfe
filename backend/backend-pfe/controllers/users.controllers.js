const { authValidation } = require("../validation/authValidation");
const employéModel = require("../models/employéModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const Register = async (req, res) => {
  const value = await authValidation.schemaRegisterValidation.validate(
    req.body
  );
  try {
    if (value?.error?.details?.length > 0) {
      return res.status(400).json(value.error.details);
    } else {
      const exist = await employéModel.findOne({ email: req.body.email });
      if (exist) {
        res.status(409).json({ message: "employé exist" });
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const response = await employéModel.create(req.body);
        const data = await employéModel
          .findById(response._id)
          .select("-password");
        return res.status(200).json({ message: "success", data });
      }
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const Login = async (req, res) => {
  const value = await authValidation.schemaLoginValidation.validate(req.body);
  try {
    if (value && value?.error?.details?.length > 0) {
      return res.status(400).json(value.error.details);
    } else {
      employéModel.findOne({ email: req.body.email }).then((employé) => {
        if (!employé) {
          res.status(404).json({ message: "not found" });
        } else {
          bcrypt
            .compare(req.body.password, employé.password)
            .then((isMatch) => {
              if (!isMatch) {
                return res.status(404).json({ message: "incorrect password" });
              } else {
                const payload = {
                  id: employé._id,
                  name: employé.firstname,
                  email: employé.email,
                  role: employé.role,
                };
                var token = jwt.sign(payload, process.env.privateKey, {
                  expiresIn: "1h",
                });
                res.status(200).json({
                  message: "success",
                  token: token,
                  user: payload,
                });
              }
            });
        }
      });
    }
  } catch (error) {
    res.status(500).send("error");
  }
};
const Test = (req, res) => {
  res.send("welcome user");
};
const Admin = (req, res) => {
  res.send("welcome Admin");
};

module.exports = {
  Register,
  Login,
  Test,
  Admin,
};
