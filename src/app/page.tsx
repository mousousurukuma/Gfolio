import React from "react"

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Gfolio</h1>
      <p className="text-gray-300 mb-4">
        Gfolio is your personal portfolio and tracking platform. Showcase your
        projects, track your progress, and connect with other professionals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          <p className="text-gray-400">
            Start adding your projects to showcase your skills and experience.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Track Progress</h2>
          <p className="text-gray-400">
            Monitor your growth and achievements over time with our tracking
            tools.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
