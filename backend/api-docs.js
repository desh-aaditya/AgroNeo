"use client"

/**
 * AgroNeo Mobile App API Documentation
 *
 * This file provides documentation for the AgroNeo API endpoints
 * that can be used by mobile applications.
 *
 * Base URL: https://your-deployed-api.com (Replace with your actual API URL)
 */

// API Endpoints

/**
 * 1. Get All Crops
 * URL: /api/crops
 * Method: GET
 * Description: Fetches all crop data with pagination
 *
 * Query Parameters:
 * - location (optional): Filter by location
 * - date (optional): Filter by date (YYYY-MM-DD)
 * - sort (optional): Sort by price-asc, price-desc, name-asc, name-desc, date-asc, date-desc
 *
 * Example Request:
 * GET /api/crops?location=Punjab&sort=price-desc
 *
 * Example Response:
 * {
 *   "success": true,
 *   "count": 2,
 *   "data": [
 *     {
 *       "id": "60d5ec9f1d7c82001c9b1234",
 *       "cropName": "Wheat",
 *       "price": 2500,
 *       "location": "Punjab",
 *       "date": "2023-06-15T00:00:00.000Z",
 *       "admin": {
 *         "name": "Admin User",
 *         "id": "60d5ec9f1d7c82001c9b5678"
 *       },
 *       "createdAt": "2023-06-15T10:30:00.000Z"
 *     },
 *     // More crop objects...
 *   ]
 * }
 */

/**
 * 2. Get Latest Crop Prices
 * URL: /api/crops/latest
 * Method: GET
 * Description: Fetches the latest price for each crop type
 *
 * Example Request:
 * GET /api/crops/latest
 *
 * Example Response:
 * {
 *   "success": true,
 *   "count": 3,
 *   "data": [
 *     {
 *       "id": "60d5ec9f1d7c82001c9b1234",
 *       "cropName": "Rice",
 *       "price": 3000,
 *       "location": "Tamil Nadu",
 *       "date": "2023-06-15T00:00:00.000Z",
 *       "admin": {
 *         "name": "Admin User",
 *         "id": "60d5ec9f1d7c82001c9b5678"
 *       },
 *       "createdAt": "2023-06-15T10:30:00.000Z"
 *     },
 *     // More crop objects...
 *   ]
 * }
 */

/**
 * 3. Get All Locations
 * URL: /api/crops/locations
 * Method: GET
 * Description: Fetches all unique locations where crops are recorded
 *
 * Example Request:
 * GET /api/crops/locations
 *
 * Example Response:
 * {
 *   "success": true,
 *   "count": 3,
 *   "data": ["Punjab", "Maharashtra", "Tamil Nadu"]
 * }
 */

/**
 * 4. Get Crops by Location
 * URL: /api/crops/by-location/:location
 * Method: GET
 * Description: Fetches all crops for a specific location
 *
 * Example Request:
 * GET /api/crops/by-location/Punjab
 *
 * Example Response:
 * {
 *   "success": true,
 *   "location": "Punjab",
 *   "count": 2,
 *   "data": [
 *     {
 *       "id": "60d5ec9f1d7c82001c9b1234",
 *       "cropName": "Wheat",
 *       "price": 2500,
 *       "location": "Punjab",
 *       "date": "2023-06-15T00:00:00.000Z",
 *       "admin": {
 *         "name": "Admin User",
 *         "id": "60d5ec9f1d7c82001c9b5678"
 *       },
 *       "createdAt": "2023-06-15T10:30:00.000Z"
 *     },
 *     // More crop objects...
 *   ]
 * }
 */

/**
 * 5. Get Crop by ID
 * URL: /api/crops/:id
 * Method: GET
 * Description: Fetches a specific crop by its ID
 *
 * Example Request:
 * GET /api/crops/60d5ec9f1d7c82001c9b1234
 *
 * Example Response:
 * {
 *   "success": true,
 *   "data": {
 *     "id": "60d5ec9f1d7c82001c9b1234",
 *     "cropName": "Wheat",
 *     "price": 2500,
 *     "location": "Punjab",
 *     "date": "2023-06-15T00:00:00.000Z",
 *     "admin": {
 *       "name": "Admin User",
 *       "id": "60d5ec9f1d7c82001c9b5678"
 *     },
 *     "createdAt": "2023-06-15T10:30:00.000Z"
 *   }
 * }
 */

/**
 * Mobile App Integration Examples
 *
 * React Native Example:
 *
 * import React, { useState, useEffect } from 'react';
 * import { View, Text, FlatList, ActivityIndicator } from 'react-native';
 *
 * const API_URL = 'https://your-deployed-api.com/api/crops';
 *
 * const CropListScreen = () => {
 *   const [crops, setCrops] = useState([]);
 *   const [loading, setLoading] = useState(true);
 *   const [error, setError] = useState(null);
 *
 *   useEffect(() => {
 *     fetchCrops();
 *   }, []);
 *
 *   const fetchCrops = async () => {
 *     try {
 *       setLoading(true);
 *       const response = await fetch(API_URL);
 *       const result = await response.json();
 *
 *       if (result.success) {
 *         setCrops(result.data);
 *       } else {
 *         setError(result.message || 'Failed to fetch crops');
 *       }
 *     } catch (err) {
 *       setError('Network error. Please check your connection.');
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   if (loading) {
 *     return <ActivityIndicator size="large" color="#15803d" />;
 *   }
 *
 *   if (error) {
 *     return <Text>Error: {error}</Text>;
 *   }
 *
 *   return (
 *     <View>
 *       <FlatList
 *         data={crops}
 *         keyExtractor={(item) => item.id}
 *         renderItem={({ item }) => (
 *           <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
 *             <Text style={{ fontWeight: 'bold' }}>{item.cropName}</Text>
 *             <Text>Price: ₹{item.price}</Text>
 *             <Text>Location: {item.location}</Text>
 *             <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
 *             <Text>Added by: {item.admin.name}</Text>
 *           </View>
 *         )}
 *       />
 *     </View>
 *   );
 * };
 *
 * export default CropListScreen;
 */

// module.exports is not actually used - this file is just for documentation
module.exports = {}
