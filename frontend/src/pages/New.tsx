import { useState } from "react"
import toast from "react-hot-toast"
import { FaHome } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const New = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    setLoading(true)
    e.preventDefault()

    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        toast.success("Published")
        setTitle("")
        setBody("")
        setLoading(false)
      })
      .catch((error) => {
        toast.error("Something went wrong")
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <>
      <div onClick={() => navigate("/")}>
        <FaHome className="text-5xl m-4" />
      </div>
      <div>
        <h1 className="text-3xl pt-8 text-center font-bold">New Thought</h1>
        <form
          onSubmit={handleSubmit}
          className="w-10/12 mx-auto flex flex-col items-center gap-4 pt-16"
        >
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => {
              if (e.target.value.length <= 200) {
                setTitle(e.target.value)
              }
            }}
            value={title}
          />
          <br />
          <textarea
            className="textarea textarea-primary resize-none w-80 h-96"
            placeholder="Content"
            onChange={(e) => {
              if (e.target.value.length <= 2000) {
                setBody(e.target.value)
              }
            }}
            value={body}
          ></textarea>
          <br />
          <button className="btn btn-primary w-80" disabled={loading}>
            {loading ? (
              <span className="loading loading-infinity loading-md"></span>
            ) : (
              "Publish"
            )}
          </button>
        </form>
      </div>
    </>
  )
}

export default New
