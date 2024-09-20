import React from "react"
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Oops! Page not found</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
