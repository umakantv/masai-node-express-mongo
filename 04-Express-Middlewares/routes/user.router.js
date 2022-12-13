const express = require('express')
const multer  = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'uploads/', preservePath: true })
const router = express.Router()

router.post('/profile', upload.single('avatar'), (req, res, next) => {
    // console.log('In the profile middleware');

    let name = req.body?.name;
    let email = req.body?.email;
    let imagePath = null;
    if(req.file) {
        // const path = 
        imagePath = req.file.path + '-' + req.file.originalname;
        fs.rename(req.file.path, imagePath, (err) => {
            if (err) console.log(err);
        });

        imagePath = 'http://localhost:3001/' + imagePath;
    }

    return res.send({
        data: {
            id: 1,
            name,
            email,
            profileImage: imagePath
        }
    })
})

module.exports = {
    router
}