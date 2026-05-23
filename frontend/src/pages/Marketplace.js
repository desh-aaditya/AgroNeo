"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa"

const Marketplace = () => {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    cropName: "",
    Maxprice: "",
    Minprice: "",
    Avgprice: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [previewData, setPreviewData] = useState(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [expandedDates, setExpandedDates] = useState({})

  const getAuthHeader = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  useEffect(() => {
    fetchCrops()
  }, [])

  const fetchCrops = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/crops")
      setCrops(response.data.data || response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching crops:", error)
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    if (!formData.cropName || !formData.Maxprice || !formData.Minprice || !formData.Avgprice || !formData.location) {
      setError("Please fill in all fields")
      return
    }

    setPreviewData({
      ...formData,
      Maxprice: Number.parseFloat(formData.Maxprice),
      Minprice: Number.parseFloat(formData.Minprice),
      Avgprice: Number.parseFloat(formData.Avgprice),
    })
    setShowForm(false)
  }

  const confirmSubmission = async () => {
    try {
      const dataToSubmit = {
        cropName: previewData.cropName,
        Maxprice: previewData.Maxprice,
        Minprice: previewData.Minprice,
        Avgprice: previewData.Avgprice,
        location: previewData.location,
        date: previewData.date,
      }

      const response = await axios.post("http://localhost:5000/api/crops", dataToSubmit, {
        headers: getAuthHeader(),
      })

      if (response.data && (response.data.success || response.status === 201)) {
        setSuccess("Crop rate added successfully!")
        setPreviewData(null)
        setFormData({
          cropName: "",
          Maxprice: "",
          Minprice: "",
          Avgprice: "",
          location: "",
          date: new Date().toISOString().split("T")[0],
        })
        fetchCrops()

        setTimeout(() => {
          setSuccess("")
        }, 3000)
      } else {
        throw new Error("Failed to add crop rate")
      }
    } catch (error) {
      console.error("Error adding crop rate:", error)
      setError("Failed to add crop rate. Please try again.")
      setPreviewData(null)
    }
  }

  const cancelSubmission = () => {
    setPreviewData(null)
    setShowForm(true)
  }

  const groupByDate = (items) => {
    return items.reduce((acc, item) => {
      const dateKey = new Date(item.date).toLocaleDateString()
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(item)
      return acc
    }, {})
  }

  const toggleDate = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Marketplace</h1>

          {!showForm && !previewData && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg flex items-center transition duration-300"
            >
              <FaPlus className="mr-2" /> Add Crop Rate
            </button>
          )}
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>
        )}

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Crop Rate</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                {["cropName", "Maxprice", "Minprice", "Avgprice", "location", "date"].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                      {field === "cropName"
                        ? "Crop Name"
                        : field === "Maxprice"
                        ? "Max Price"
                        : field === "Minprice"
                        ? "Min Price"
                        : field === "Avgprice"
                        ? "Avg Price"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "date" ? "date" : field.toLowerCase().includes("price") ? "number" : "text"}
                      step={field.toLowerCase().includes("price") ? "0.01" : undefined}
                      className="shadow appearance-none border rounded w-full py-2 px-3"
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
                  Preview
                </button>
              </div>
            </form>
          </div>
        )}

        {previewData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-green-500">
            <h2 className="text-xl font-semibold mb-4">Confirm Crop Rate Details</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div><strong>Crop:</strong> {previewData.cropName}</div>
              <div><strong>MaxPrice:</strong> ₹{previewData.Maxprice}</div>
              <div><strong>MinPrice:</strong> ₹{previewData.Minprice}</div>
              <div><strong>AvgPrice:</strong> ₹{previewData.Avgprice}</div>
              <div><strong>Location:</strong> {previewData.location}</div>
              <div><strong>Date:</strong> {new Date(previewData.date).toLocaleDateString()}</div>
            </div>
            <div className="flex justify-between">
              <button onClick={cancelSubmission} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button onClick={confirmSubmission} className="bg-green-700 text-white px-4 py-2 rounded flex items-center">
                <FaCheck className="mr-2" /> Confirm & Save
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 p-6 border-b">Current Crop Rates</h2>

          {loading ? (
            <div className="p-6 text-center">Loading crop rates...</div>
          ) : crops.length === 0 ? (
            <div className="p-6 text-center">No crop rates available.</div>
          ) : (
            <div className="p-4">
              {Object.entries(groupByDate(crops)).map(([date, cropList]) => (
                <div key={date} className="mb-6 border rounded">
                  <button
                    onClick={() => toggleDate(date)}
                    className="w-full text-left px-4 py-3 bg-green-200 hover:bg-green-300 font-semibold text-green-900 flex justify-between items-center"
                  >
                    <span>{date}</span>
                    <span>{expandedDates[date] ? "▲" : "▼"}</span>
                  </button>

                  {expandedDates[date] && (
                    <div className="overflow-x-auto p-4 bg-white border-t">
                      <table className="w-full table-auto border">
                        <thead className="bg-green-100">
                          <tr>
                            <th className="px-4 py-2 text-left">Crop</th>
                            <th className="px-4 py-2 text-left">Max Price</th>
                            <th className="px-4 py-2 text-left">Min Price</th>
                            <th className="px-4 py-2 text-left">Avg Price</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Added By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cropList.map((crop) => (
                            <tr key={crop._id || crop.id} className="border-t">
                              <td className="px-4 py-2">{crop.cropName}</td>
                              <td className="px-4 py-2">₹{crop.Maxprice}</td>
                              <td className="px-4 py-2">₹{crop.Minprice}</td>
                              <td className="px-4 py-2">₹{crop.Avgprice}</td>
                              <td className="px-4 py-2">{crop.location}</td>
                              <td className="px-4 py-2">{crop.admin?.name || "Unknown"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Marketplace
