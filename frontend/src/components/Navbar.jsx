import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showModal]);

  return (
    <>
      <nav className="bg-blue-900 p-4 text-white flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-xl font-bold select-none">
          <span className="text-blue-300">Task</span>
          <span className="text-white">Mate</span>
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Logout"
        >
          Logout
        </button>
      </nav>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-modal-title"
          tabIndex={-1}
          ref={modalRef}
        >
          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-xl w-80 max-w-full text-center transform transition-transform animate-scaleIn relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black focus:outline-none"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2
              id="logout-modal-title"
              className="text-lg font-semibold mb-5 text-gray-800 select-none"
            >
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-5">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-7 py-2 rounded hover:bg-red-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
