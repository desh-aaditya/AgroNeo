const axios = require("axios")

// Replace with your actual API URL when deployed
const API_BASE_URL = process.env.API_URL || "http://localhost:5000/api"

/**
 * AgroNeo Mobile API Client
 *
 * This is a sample client to demonstrate how a mobile app might
 * interact with the AgroNeo API.
 */
class AgroNeoApiClient {
  /**
   * Get all crops with optional filtering
   */
  static async getAllCrops(filters = {}) {
    try {
      const queryParams = new URLSearchParams()

      if (filters.location) queryParams.append("location", filters.location)
      if (filters.date) queryParams.append("date", filters.date)
      if (filters.sort) queryParams.append("sort", filters.sort)

      const queryString = queryParams.toString()
      const url = `${API_BASE_URL}/crops${queryString ? "?" + queryString : ""}`

      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error("Error fetching crops:", error.message)
      throw error
    }
  }

  /**
   * Get latest crop prices
   */
  static async getLatestCrops() {
    try {
      const response = await axios.get(`${API_BASE_URL}/crops/latest`)
      return response.data
    } catch (error) {
      console.error("Error fetching latest crops:", error.message)
      throw error
    }
  }

  /**
   * Get all available locations
   */
  static async getLocations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/crops/locations`)
      return response.data
    } catch (error) {
      console.error("Error fetching locations:", error.message)
      throw error
    }
  }

  /**
   * Get crops by location
   */
  static async getCropsByLocation(location) {
    try {
      const response = await axios.get(`${API_BASE_URL}/crops/by-location/${location}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching crops for location ${location}:`, error.message)
      throw error
    }
  }

  /**
   * Get crop by ID
   */
  static async getCropById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/crops/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching crop with ID ${id}:`, error.message)
      throw error
    }
  }
}

// Example usage (commented out)
/*
(async () => {
  try {
    // Get all crops
    const allCrops = await AgroNeoApiClient.getAllCrops();
    console.log(`Found ${allCrops.count} crops`);
    
    // Get crops from Punjab
    const punjabCrops = await AgroNeoApiClient.getCropsByLocation('Punjab');
    console.log(`Found ${punjabCrops.count} crops in Punjab`);
    
    // Get locations
    const locations = await AgroNeoApiClient.getLocations();
    console.log(`Available locations: ${locations.data.join(', ')}`);
  } catch (error) {
    console.error('API test failed:', error);
  }
})();
*/

module.exports = AgroNeoApiClient
