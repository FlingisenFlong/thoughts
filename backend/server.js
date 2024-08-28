import path from "path"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import Post from "./models/post.js"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const __dirname = path.resolve()

app.use(express.json()) // Middleware för att hantera JSON-body requests
app.use(
  cors({
    origin: process.env.CORSURL,
  })
)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

// Anslut till MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Ansluten till MongoDB"))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB", err))

// API-rutt för att skapa ett nytt inlägg
app.post("/api/posts", async (req, res) => {
  const { title, body } = req.body

  if (!title || !body) {
    return res.status(400).json({ message: "Title och body är obligatoriska" })
  }

  try {
    const post = new Post({ title, body })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: "Ett fel uppstod", error: err })
  }
})

app.get("/api/getthoughts", async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: 9 } }])
    res.status(200).json(randomPosts)
  } catch (error) {}
})

app.listen(port, () => {
  console.log(`Servern kör på port ${port}`)
})
