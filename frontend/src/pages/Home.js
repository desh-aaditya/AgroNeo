import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import { FaShoppingBasket, FaFileAlt, FaComments } from "react-icons/fa"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
  }

  const sliderImages = [
    "/images/inside1.JPG",
    "/images/inside2.JPG",
    "/images/inside3.JPG",
    "/images/inside4.JPG",
    "/images/inside5.JPG",

  ]

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      {/* Hero with Slider Background */}
      <div className="relative h-[32rem] overflow-hidden">
        {/* Slider Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Slider {...sliderSettings}>
            {sliderImages.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-[32rem] object-cover"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to AgroNeo</h1>
            <p className="text-xl mb-8">
              Your one-stop platform for agricultural information and market rates
            </p>
            <Link
              to="/marketplace"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
            >
              Update Today's Crop Rate
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marketplace */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-5xl mb-4 flex justify-center">
              <FaShoppingBasket />
            </div>
            <h3 className="text-xl font-bold mb-4">Marketplace</h3>
            <p className="text-gray-600 mb-6">
              Update daily crop rate for the farmers of your location.
            </p>
            <Link to="/marketplace" className="text-green-600 hover:text-green-800 font-medium">
              View Marketplace →
            </Link>
          </div>

          {/* Government Schemes */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-5xl mb-4 flex justify-center">
              <FaFileAlt />
            </div>
            <h3 className="text-xl font-bold mb-4">Government Schemes</h3>
            <p className="text-gray-600 mb-6">
             Give information about different government schmes to the farmers.
             Feature coming soon!
            </p>
            <Link to="/government-schemes" className="text-green-600 hover:text-green-800 font-medium">
              Explore Schemes →
            </Link>
          </div>

          {/* Expert Talk */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
            <div className="text-green-600 text-5xl mb-4 flex justify-center">
              <FaComments />
            </div>
            <h3 className="text-xl font-bold mb-4">Expert Talk</h3>
            <p className="text-gray-600 mb-6">
              Get advice from agricultural experts on farming techniques and best practices.
              Feature coming soon!
            </p>
            <Link to="/expert-talk" className="text-green-600 hover:text-green-800 font-medium">
              Coming Soon →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <img src="/images/logo.png" alt="AgroNeo Logo" className="h-8 w-auto" />
                <span>AgroNeo</span>
              </h3>
              <p className="mt-2">Empowering farmers with information</p>
            </div>

            <div className="text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} AgroNeo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
