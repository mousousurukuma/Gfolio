import React from "react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full z-40 w-64 bg-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]`}
      >
        <div className="p-4 text-white">
          <h2 className="text-lg font-semibold">Friends</h2>
          {/* プレースホルダー */}
          <div className="mt-4 space-y-4">
            <div className="w-full h-12 bg-gray-600 rounded"></div>
            <div className="w-full h-12 bg-gray-600 rounded"></div>
            <div className="w-full h-12 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
