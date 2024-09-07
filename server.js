const express = require("express")
const heroes = require("./people.js")
const multer = require("multer")
const {getHeroes, getHeroById, addHero, deleteHeroById, updateHero} = require("./db.js")

const app = express()
const port = 3000
const upload = multer({storage})

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    }, 
    fileName:(req, file, cb) => {
        cb(null, file.originalName)
    }
}) 

app.use(express.json())


app.post("/api/planets/:id/image",upload.single("image"), createImage);