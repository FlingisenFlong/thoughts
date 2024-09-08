import Thoughts from "../components/Thoughts"
import { TfiThought } from "react-icons/tfi"
import { FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div
        className="flex flex-row text-5xl m-6 cursor-pointer w-20 gap-1"
        onClick={() => navigate("/new")}
      >
        <TfiThought />
        <FaPlus />
      </div>
      <div className="text-3xl pt-8 text-center font-bold">Home</div>
      <Thoughts />
    </div>
  )
}
export default Home
