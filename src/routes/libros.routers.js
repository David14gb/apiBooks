const {Router} = require ("express")
const router = Router();
const booksCtrl = require("../controller/libros.controller")

router.get("/p", booksCtrl.getStart);
router.get("/libros", booksCtrl.getLibros);
router.get("/libros?id", booksCtrl.getLibrosId);
router.post("/libros", booksCtrl.postLibros);
router.put("/libros", booksCtrl.putLibros);
router.delete("/libros", booksCtrl.deleteLibros);


module.exports = router; 