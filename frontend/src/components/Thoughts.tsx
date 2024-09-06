import React, { useState, useEffect } from "react"
import Thought from "./Thought"

interface Post {
  _id: string // Använd '_id' som nyckel istället för 'id'
  title: string
  body: string
}

const Thoughts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch("/api/getthoughts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: Post[]) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error))
    setLoading(false)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center items-center">
      {loading ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : (
        posts.map((post) => (
          <Thought key={post._id} title={post.title} body={post.body} />
        ))
      )}
    </div>
  )
}

export default Thoughts
