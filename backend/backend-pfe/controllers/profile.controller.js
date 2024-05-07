const profileModel = require("../models/profile.Model");
const validateProfile = require("../validation/profile");
const FindAllProfiles = async (req, res) => {
  try {
    const data = await profileModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindOneProfile = async (req, res) => {
  try {
    const data = await profileModel.findOne({ user: req.user.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const AddProfile = async (req, res) => {
  const validate = validateProfile.validation.profileValidation;
  try {
    if (!validate) {
      res.status(404).json(error);
    } else {
      profileModel.findOne({ user: req.user.id }).then(async (profile) => {
        if (!profile) {
          req.body.user = req.user.id;
          await profileModel.create(req.body);
          res.status(200).json({ message: "success" });
        } else {
          await profileModel
            .findOneAndUpdate({ _id: profile._id }, req.body, { new: true })
            .then((result) => {
              res.status(200).json(result);
            });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const DeleteProfile = async (req, res) => {
  try {
    const data = await profileModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = {
  FindAllProfiles,
  FindOneProfile,
  DeleteProfile,
  AddProfile,
};
