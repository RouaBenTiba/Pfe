const Roles = {
  USER: 0,
  ADMIN: 1,
};
const inRole =
  (...roles) =>
  (req, res, next) => {
    const role = roles.find((role) => req.user.role === role);

    if (role === undefined) {
      return res.status(401).json({ message: "no access" });
    }
    next();
  };
module.exports = {
  inRole,
  Roles,
};
