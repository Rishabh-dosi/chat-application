const { register, setAvatar , getAllUsers, login } = require("../controllers/userController");

const router = require("express").Router();
const multer = require("multer");  //from here
const { v4: uuidv4 } = require("uuid");
let path = require("path");
let User = require("../model/userModel"); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Data.now() + path.extname(file.originalname()));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
}//work in progress



router.post("/register", register)
router.post("/login", login);
router.post("/setProfile/:id", setAvatar)

router.get("/allusers/:id", getAllUsers);
module.exports = router;