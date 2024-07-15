// src/components/Sidebar.tsx
const Sidebar = () => {
  return (
    <aside className="bg-gray-800 fixed top-14 left-2 bottom-2 w-64 p-4 mt-2 rounded-lg rounded-b-lg z-40">
      <nav>
        <ul className="space-y-4">
          <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 transition">
            <a href="#" className="text-white">
              Sample Item 1
            </a>
          </li>
          <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 transition">
            <a href="#" className="text-white">
              Sample Item 2
            </a>
          </li>
          <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 transition">
            <a href="#" className="text-white">
              Sample Item 3
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
