import {
  SunIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // Optional: For animations
import { FaReact } from "react-icons/fa";
import { SiGraphql, SiPhp, SiMysql } from "react-icons/si";
import { useNavigate } from "react-router-dom";
export default function HomePage() {

    const Navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-50 relative overflow-hidden">
      {/* Floating Clouds */}
      <div className="absolute top-20 -left-20 w-32 h-32 bg-white/30 rounded-full filter blur-xl animate-float" />
      <div className="absolute top-40 right-10 w-48 h-48 bg-white/40 rounded-full filter blur-xl animate-float-delayed" />

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
        <motion.div whileHover={{ rotate: 20 }}>
            <SunIcon className="cursor-pointer w-8 h-8 text-sky-700" />
          </motion.div>          <h1 className=" cursor-pointer text-2xl font-bold text-sky-900">Scandiweb Ready</h1>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => {Navigate('/login')}} className="cursor-pointer flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all">
            <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
            Login
          </button>
          <button onClick={() => {Navigate('/signup')}} className="cursor-pointer flex items-center px-4 py-2 bg-white text-sky-600 border-2 border-sky-600 rounded-lg hover:bg-sky-50 transition-all">
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-sky-900 mb-6">
            Welcome to the
            <span className="bg-gradient-to-r from-sky-600 to-blue-500 text-transparent bg-clip-text">
              {" "}
              Scandiweb Preparation Challenge
            </span>
          </h1>
          <p className="text-xl text-sky-700 mb-8">
            Check if you are elligible for scandiweb here and get ready for it
            with these platform
          </p>

          {/* 3D Card Effect */}
          <div className="relative group perspective-1000 mt-16">
            <div className="relative transition-all duration-700 transform group-hover:rotate-x-12 group-hover:rotate-y-12">
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12">
                  <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/20 hover:transform hover:scale-110 transition-all">
                    <FaReact className="w-16 h-16 text-sky-600 mb-2" />
                    <span className="text-sky-900 font-medium">React.js</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/20 hover:transform hover:scale-110 transition-all">
                    <SiGraphql className="w-16 h-16 text-pink-600 mb-2" />
                    <span className="text-sky-900 font-medium">GraphQL</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/20 hover:transform hover:scale-110 transition-all">
                    <SiPhp className="w-16 h-16 text-indigo-700 mb-2" />
                    <span className="text-sky-900 font-medium">PHP</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/30 backdrop-blur-lg rounded-xl border border-white/20 hover:transform hover:scale-110 transition-all">
                    <SiMysql className="w-16 h-16 text-blue-700 mb-2" />
                    <span className="text-sky-900 font-medium">MySQL</span>
                  </div>
                </div>{" "}
                <h3 className="text-2xl font-semibold text-sky-900 mb-4">
                  Graphql + React JS
                </h3>
                <p className="text-sky-700">PHP + MYSQL</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sky-300/30 to-transparent" />
    </div>
  );
}
