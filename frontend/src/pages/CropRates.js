// import React, { useEffect, useState } from "react"

// const CropRates = () => {
//   const [crops, setCrops] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchCrops = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/crops") // ✅ Change if hosted
//         const data = await res.json()
//         setCrops(data)
//         setLoading(false)
//       } catch (err) {
//         console.error("Error fetching crops:", err)
//         setLoading(false)
//       }
//     }

//     fetchCrops()
//   }, [])

//   if (loading) return <p>Loading crop rates...</p>

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Crop Rates</h2>
//       {crops.length === 0 ? (
//         <p>No data available</p>
//       ) : (
//         <ul>
//           {crops.map((crop) => (
//             <li key={crop._id}>
//               <strong>{crop.cropName}</strong> - {crop.location}<br />
//               Max: {crop.Maxprice}, Min: {crop.Minprice}, Avg: {crop.Avgprice}<br />
//               Date: {new Date(crop.date).toLocaleDateString()}
//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default CropRates
