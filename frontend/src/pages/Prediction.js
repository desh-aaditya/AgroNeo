import React, { useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
 YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const Prediction = () => {

  const [crop, setCrop] = useState("Maize");
  const [day, setDay] = useState(7);

  const [result, setResult] = useState(null);

  const crops = [
    "Maize",
    "Tomato",
    "Onion",
    "Potato",
    "Rice",
    "Wheat"
  ];

  const COLORS = [
    "#14a44d",
    "#0b6b2d",
    "#7bd389",
    "#b7efc5"
  ];

  const [monthlyData, setMonthlyData] =
    useState([]);

  const [marketData, setMarketData] =
    useState([]);

  const [weeklyTrend, setWeeklyTrend] =
    useState([]);

  const [demandData, setDemandData] =
    useState([]);

  const handlePredict = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/predict",
        {
          crop,
          day
        }
      );

      const predictedPrice =
        response.data.predicted_price;

      setResult(predictedPrice);

      // Monthly Trend

      setMonthlyData([
        { month: "Jan", price: 2100 },
        { month: "Feb", price: 2400 },
        { month: "Mar", price: 2200 },
        { month: "Apr", price: 2800 },
        { month: "May", price: 3000 },
        {
          month: "Jun",
          price: predictedPrice
        }
      ]);

      // Market Comparison

      setMarketData([
        { market: "Pune", price: 2300 },
        { market: "Mumbai", price: 2600 },
        { market: "Nashik", price: 2200 },
        { market: "Nagpur", price: predictedPrice }
      ]);

      // Weekly Forecast

      setWeeklyTrend([
        { week: "Week 1", value: 2200 },
        { week: "Week 2", value: 2500 },
        { week: "Week 3", value: 2400 },
        {
          week: "Week 4",
          value: predictedPrice
        }
      ]);

      // Demand Data

      setDemandData([
        { name: "High Demand", value: 45 },
        { name: "Medium", value: 35 },
        { name: "Low", value: 20 }
      ]);

    } catch (error) {

      console.log(error);

      alert("Prediction failed");

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f3fdf5",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      {/* HERO SECTION */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#0b6b2d,#14a44d)",
          borderRadius: "25px",
          padding: "50px",
          color: "white",
          marginBottom: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px"
          }}
        >
          AI Crop Price Prediction
        </h1>

        <p
          style={{
            fontSize: "18px",
            opacity: 0.9,
            maxWidth: "700px"
          }}
        >
          Predict future agricultural crop
          prices using Machine Learning
          and advanced analytics.
        </p>

      </div>

      {/* PREDICTION CARD */}

      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "25px",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)",
          marginBottom: "40px"
        }}
      >

        <h2
          style={{
            color: "#0b6b2d",
            marginBottom: "25px"
          }}
        >
          Predict Future Crop Price
        </h2>

        {/* INPUTS */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "25px"
          }}
        >

          {/* Crop Dropdown */}

          <select
            value={crop}
            onChange={(e) =>
              setCrop(e.target.value)
            }
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              minWidth: "250px",
              fontSize: "16px"
            }}
          >

            {crops.map((item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))}

          </select>

          {/* Days Ahead */}

          <input
            type="number"
            value={day}
            onChange={(e) =>
              setDay(e.target.value)
            }
            placeholder="Days Ahead"
            style={{
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              minWidth: "250px",
              fontSize: "16px"
            }}
          />

          {/* Button */}

          <button
            onClick={handlePredict}
            style={{
              background: "#14a44d",
              color: "white",
              border: "none",
              padding: "15px 35px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            Predict Price
          </button>

        </div>

        {/* RESULT */}

        {result && (

          <div
            style={{
              background: "#ecfff1",
              padding: "25px",
              borderRadius: "15px",
              borderLeft:
                "6px solid #14a44d"
            }}
          >

            <h3
              style={{
                color: "#0b6b2d",
                marginBottom: "10px"
              }}
            >
              Predicted Price
            </h3>

            <h1
              style={{
                color: "#14a44d",
                fontSize: "50px"
              }}
            >
              ₹ {result}
            </h1>

          </div>

        )}

      </div>

      {/* ANALYTICS DASHBOARD */}

      {result && (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(450px,1fr))",
            gap: "25px"
          }}
        >

          {/* LINE CHART */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#0b6b2d",
                marginBottom: "20px"
              }}
            >
              Monthly Price Trend
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#14a44d"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* BAR CHART */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#0b6b2d",
                marginBottom: "20px"
              }}
            >
              Market Comparison
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart data={marketData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="market" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="price"
                  fill="#14a44d"
                  radius={[10,10,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* AREA CHART */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#0b6b2d",
                marginBottom: "20px"
              }}
            >
              Weekly Forecast
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <AreaChart data={weeklyTrend}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="week" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#14a44d"
                  fill="#b7efc5"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#0b6b2d",
                marginBottom: "20px"
              }}
            >
              Demand Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={demandData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >

                  {demandData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

    </div>
  );
};

export default Prediction;