import Navbar from "../components/Navbar"
import { FaCalendarAlt, FaUsers, FaVideo } from "react-icons/fa"

const ExpertTalk = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Expert Talk</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                This feature is coming soon! We're currently working on bringing agricultural experts to our platform.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">What to Expect</h2>
          <p className="text-gray-700 mb-6">
            Our Expert Talk section will connect you with agricultural specialists who can provide guidance on farming
            techniques, crop management, pest control, and more. Stay tuned for these exciting features!
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FaVideo className="text-2xl text-green-700" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Video Consultations</h3>
              <p className="text-gray-600 text-sm">
                One-on-one video calls with agricultural experts to discuss your specific farming challenges.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt className="text-2xl text-green-700" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Webinars & Workshops</h3>
              <p className="text-gray-600 text-sm">
                Regular online sessions covering seasonal farming topics and new agricultural technologies.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl text-green-700" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm">
                Connect with other farmers and experts to share knowledge, experiences, and best practices.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-100 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Register Your Interest</h2>
          <p className="text-gray-700 mb-4">
            Want to be notified when Expert Talk launches? Leave your email address below and we'll keep you updated.
          </p>

          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExpertTalk
