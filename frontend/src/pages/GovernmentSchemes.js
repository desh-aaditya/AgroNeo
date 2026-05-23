"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa"

const GovernmentSchemes = () => {
  const [schemes] = useState([
    {
      id: 1,
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description:
        "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families.",
      eligibility: "All landholding farmers' families, subject to certain exclusion criteria.",
      link: "https://pmkisan.gov.in/",
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description:
        "Provides comprehensive insurance coverage against crop failure, helping farmers stabilize their income and ensure credit worthiness.",
      eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops.",
      link: "https://pmfby.gov.in/",
    },
    {
      id: 3,
      title: "Kisan Credit Card (KCC)",
      description: "Provides farmers with timely access to credit for their agricultural needs.",
      eligibility:
        "All farmers, sharecroppers, tenant farmers, and individuals engaged in animal husbandry and fisheries.",
      link: "https://www.nabard.org/content1.aspx?id=572&catid=23&mid=530",
    },
    {
      id: 4,
      title: "Soil Health Card Scheme",
      description:
        "Provides information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients for improving soil health and fertility.",
      eligibility: "All farmers across the country.",
      link: "https://soilhealth.dac.gov.in/",
    },
    {
      id: 5,
      title: "Paramparagat Krishi Vikas Yojana (PKVY)",
      description:
        "Promotes organic farming through adoption of organic village by cluster approach and PGS certification.",
      eligibility: "Farmers willing to adopt organic farming practices.",
      link: "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
    },
  ])

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Government Agricultural Schemes</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            The government offers various schemes to support farmers and agricultural development. Below are some key
            schemes that can benefit farmers across the country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <FaFileAlt className="text-2xl text-green-700" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{scheme.title}</h3>
                    <p className="text-gray-600 mb-4">{scheme.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800">Eligibility:</h4>
                      <p className="text-gray-600">{scheme.eligibility}</p>
                    </div>

                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-600 font-medium inline-flex items-center"
                    >
                      Visit Official Website <FaExternalLinkAlt className="ml-2 text-sm" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-100 rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Apply for These Schemes</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Visit the official website of the scheme or your nearest agriculture office.</li>
            <li>Prepare the required documents (Aadhaar card, land records, bank details, etc.).</li>
            <li>Fill out the application form with accurate information.</li>
            <li>Submit the application and supporting documents as per the guidelines.</li>
            <li>Follow up on your application status through the provided tracking mechanism.</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default GovernmentSchemes
