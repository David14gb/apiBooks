const {Router} = require ("express")
const router = Router();
const userCtrl = require("../controller/usuarios.controller")

router.get("/", userCtrl.getStart);
router.post("/registro", userCtrl.postUser);
router.post("/login", userCtrl.postLogin);


module.exports = router; 