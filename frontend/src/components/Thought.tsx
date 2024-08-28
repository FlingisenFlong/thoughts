interface ThoughtProps {
  title: string
  body: string
}

const Thought: React.FC<ThoughtProps> = ({ title, body }) => {
  return (
    <div className="w-56 bg-purple-950 text-white my-5 mx-5 px-5 py-2 rounded-lg">
      <h2 className="text-2xl text-center">{title}</h2>
      <p className="text-center">{body}</p>
    </div>
  )
}

export default Thought
