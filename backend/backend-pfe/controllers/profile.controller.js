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
const UpdateProfile = async (req, res) => {
  const { name, email, phone, residence, photo, password, repeat_password } =
    req.body;
  try {
    const profile = await profileModel.findOne({ user: req.user.id });
    if (!profile) {
      res.status(404).json({ message: "Profile not found" });
    } else {
      profile.name = name ?? profile.name;
      profile.email = email ?? profile.email;
      profile.phone = phone ?? profile.phone;
      profile.residence = residence ?? profile.residence;
      profile.photo = photo ?? profile.photo;
      profile.password = password ?? profile.password;
      profile.repeat_password = repeat_password ?? profile.repeat_password;

      await profile.save();
      res
        .status(200)
        .json({ message: "Profile updated successfully", profile });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  FindAllProfiles,
  FindOneProfile,
  DeleteProfile,
  AddProfile,
  UpdateProfile,
};
