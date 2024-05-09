var express = require("express");
const {
  Register,
  Login,
  Test,
  Admin,
  GetAllEmployees,
  DeleteEmployee,
} = require("../controllers/users.controllers");
var router = express.Router();
const passport = require("passport");
const { inRole, Roles } = require("../security/Rolemiddleware");
const {
  AddProfile,
  FindAllProfiles,
  FindOneProfile,
  DeleteProfile,
} = require("../controllers/profile.controller");
const { Send } = require("../controllers/nodemailer");
const {
  createConge,
  getAllConge,
  getConge,
  CancelConge,
  ValiderConge,
  getCongeemployé,
} = require("../controllers/conge.controller");
const {
  pointerPresence,
  monpointage,
  pointages,
  validerPresence,
} = require("../controllers/presence.controller");
const {
  sendNotification,
  getNotifications,
} = require("../controllers/notif.controller");
const {
  createPlanning,
  getAllPlannings,
  getEmployeePlanning,
  getplanninguser,
  updateEmployeePlanning,
  deleteEmployeePlanning,
} = require("../controllers/planning.controller");

//authetifier route
router.post("/register", Register);
router.post("/login", Login);
router.get(
  "/employees",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  GetAllEmployees
);
router.delete(
  "/employee/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  DeleteEmployee
);

/*profile route*/
router.post(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  AddProfile
);
router.get(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  FindAllProfiles
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  FindOneProfile
);
router.delete(
  "/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  DeleteProfile
);
router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  UpdateProfile
);

//nodemailer
router.post("/mail", passport.authenticate("jwt", { session: false }), Send);
//Congé
router.post(
  "/demanderconge",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  createConge
);
router.get(
  "/gererconge",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),

  getAllConge
);
router.get(
  "/gererconge/:user",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  getConge
);
router.get(
  "/mesconges",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  getCongeemployé
);
//Annuler Conge
router.delete(
  "/annulation/:congeId",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  CancelConge
);
//valider congé :
router.put(
  "/validerconge/:congeId",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  ValiderConge
);
//pointer la présence
router.post(
  "/pointerpresence",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  pointerPresence
);
//consulter le pointage d'un employé particulier'
router.get(
  "/presences/:user",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  pointages
);
router.get(
  "/monpresence",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  monpointage
);
//valider pointage
router.put(
  "/validerprésence",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  validerPresence
);
// Envoyer une notification
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  sendNotification
);
//creation de planning
router.post(
  "/createplanning",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  createPlanning
);
// get all planning pour l'admin
router.get(
  "/getallplanning",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  getAllPlannings
);
//get le planning d'un employé spécifique pour l'admin
router.get(
  "/getplanninguser",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  getEmployeePlanning
);
//get le planning d'un employé spécifique pour l'employé cncté
router.get(
  "/getmyplanning",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.USER),
  getplanninguser
);
// Modifier le planning d'un employé du coté admin
router.put(
  "/updateEmployeePlanning/:planningID",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  updateEmployeePlanning
);
// Supprimer le planning d'un employé du coté admin
router.delete(
  "/deleteEmployeePlanning/:planningID",
  passport.authenticate("jwt", { session: false }),
  inRole(Roles.ADMIN),
  deleteEmployeePlanning
);
module.exports = router;
