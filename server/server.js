const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})

const upload = multer ({ storage })

function readUsers() {
    return JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))
}

function saveUsers(data) {
    fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 2))
}

app.get("/api/users", (req, res) => {
    res.json(readUsers())
})

app.get("/api/users/:id", (req, res) => {
    const player = readUsers().find(u => u.id === req.params.id)
    res.json(player)
})

app.post("/api/users", upload.single("image"), (req, res) => {
    const all = readUsers()
    const newPlayer = {
        id: Date.now().toString(),
        name: req.body.name,
        score: 0,
        image: req.file ? "/uploads/" + req.file.filename : null
    }
    all.push(newPlayer)
    saveUsers(all)
    res.json(newPlayer)
})

app.put("/api/users/:id", (req, res) => {
    const all = readUsers()
    const index = all.findIndex(u => u.id === req.params.id)
    all[index].score = req.body.score
    saveUsers(all)
    res.json(all[index])
})

app.delete("/api/users/:id", (req, res) => {
    const remaining = readUsers().filter(u => u.id !== req.params.id)
    saveUsers(remaining)
    res.json({ message: "Deleted" })
})

app.listen(5000, () => console.log("server runs on påort 5000"))
