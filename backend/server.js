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

app.use(express.json()) // Middleware to handle JSON-body requests
app.use(
  cors({
    origin: process.env.CORSURL,
  })
)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// API route to create a new post
app.post("/api/posts", async (req, res) => {
  const { title, body } = req.body

  // Validate title and body presence
  if (!title || !body) {
    return res.status(400).json({ message: "Title and body are required" })
  }

  // Validate title and body length
  if (title.length > 200) {
    return res
      .status(400)
      .json({ message: "Title cannot exceed 200 characters" })
  }

  if (body.length > 2000) {
    return res
      .status(400)
      .json({ message: "Body cannot exceed 2000 characters" })
  }

  try {
    const post = new Post({ title, body })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err })
  }
})

// API route to get random thoughts
app.get("/api/getthoughts", async (req, res) => {
  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: 9 } }])
    res.status(200).json(randomPosts)
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
