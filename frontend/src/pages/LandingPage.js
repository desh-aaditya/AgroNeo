"use client"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowRight, FaLeaf, FaSeedling, FaUserShield } from "react-icons/fa"

// Image imports for the slider
const sliderImages = ["/images/photo1.jpg", "/images/photo2.jpg", "/images/photo3.jpg"]

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
      },
    }),
  }

  // Split the text for letter animation
  const title = "AgroNeo"
  const letters = Array.from(title)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header with Login Button */}
      <header className="bg-green-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex justify-center items-center space-x-4 ">
            <img src="/images/logo.png" alt="AgroNeo Logo" className="h-8 w-auto" />
            <h2 className="text-3xl font-bold text-white">AgroNeo</h2>
            </div>
            <Link
              to="/login"
              className="flex items-center bg-green-700 hover:bg-green-600 px-4 py-2 rounded-md transition duration-300"
            >
              <FaUserShield className="mr-2" /> Admin Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Text */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          {sliderImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
          <div className="mb-6 flex">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-6xl md:text-8xl font-bold text-green-300"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl text-center max-w-2xl px-4"
          >
            Your one-stop platform for agricultural information and market rates
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full flex items-center transition duration-300 transform hover:scale-105"
            >
              Get Started <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-green-400" : "bg-white bg-opacity-50"}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Empowering Agriculture Through Technology
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLeaf className="text-4xl text-green-600" />,
                title: "Daily Crop Rates",
                description: "Stay updated with the latest market prices for various crops in your region.",
              },
              {
                icon: <FaSeedling className="text-4xl text-green-600" />,
                title: "Government Schemes",
                description: "Access information about agricultural subsidies and government programs.",
              },
              {
                icon: <FaUserShield className="text-4xl text-green-600" />,
                title: "Expert Guidance",
                description: "Connect with agricultural experts for advice on farming techniques and best practices.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-4 bg-green-800 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About AgroNeo</h2>

            <div className="bg-green-700 rounded-xl p-8 shadow-xl">
              <p className="text-lg mb-6">
                AgroNeo is a comprehensive agricultural information platform designed to bridge the gap between farmers,
                markets, and agricultural resources. Our mission is to empower farmers with timely information and tools
                to make informed decisions.
              </p>

              <p className="text-lg mb-6">
                Founded with the vision of transforming agricultural practices through technology, AgroNeo provides
                real-time crop rates, information on government schemes, and expert guidance to farmers across the
                country.
              </p>

              <p className="text-lg">
                We believe that access to accurate information and resources is key to sustainable agriculture and
                improved livelihoods for farming communities.
              </p>

              <div className="mt-8 flex justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Link
                    to="/login"
                    className="bg-white text-green-800 font-bold py-3 px-8 rounded-full hover:bg-green-100 transition duration-300"
                  >
                    Join AgroNeo
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            What Farmers Say
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "AgroNeo has transformed how I access market information. Now I know the fair price for my crops before heading to the market.",
                name: "Rajesh Kumar",
                location: "Wheat Farmer, Pune",
              },
              {
                quote:
                  "The information about government schemes helped me secure a subsidy for my irrigation system. This platform is a blessing for small farmers.",
                name: "Anita Patel",
                location: "Vegetable Grower, Akola",
              },
              {
                quote:
                  "Expert guidance through AgroNeo helped me tackle a pest problem that was affecting my yield. Highly recommended for all farmers!",
                name: "Suresh Reddy",
                location: "Rice Farmer, Nagpur",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-green-600 text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex justify-center items-center space-x-4 ">
          <img src="/images/logo.png" alt="AgroNeo Logo" className="h-8 w-auto" />
            <h2 className="text-3xl font-bold text-white">AgroNeo</h2>
          </div>
            <div className="text-green-200 text-sm">© {new Date().getFullYear()} AgroNeo. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
