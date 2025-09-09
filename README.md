
# AGRONEO Web Portal

The AGRONEO Web Portal is a community-driven agricultural platform designed to provide farmers with daily crop rates based on location and date. It enables admins to manage and upload crop rates, while farmers can access updated rates via API integration in the mobile app.

This project bridges the information gap between farmers and market trends, empowering them to make better financial decisions.

Features

Admin Authentication – Secure Login and Registration system.

Crop Rate Management – Admins can add, update, and delete crop rates.

Location-based Rates – Rates are displayed based on admin’s registered location.

Date-wise Records – Farmers can check daily crop rates for any selected date.

API Integration – Mobile app fetches crop rates using Express.js APIs.

Notification System (App Side) – Farmers get alerts when new crop rates are published.

Database Storage – All records are stored in a MySQL database for accuracy and security.

Tech Stack

Frontend: HTML, CSS, JavaScript (Attractive UI for Admin Portal)

Backend: Node.js with Express.js

Database: MySQL


2. Backend Setup
cd backend
npm install


Configure MySQL database in .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=agroneo


Run the server:

node server.js

3. Frontend Setup

Open frontend/index.html in your browser.

Connect frontend forms with backend APIs (fetch() in JS).

API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new admin
POST	/api/auth/login	Admin login
POST	/api/crops/add	Add crop rate (admin only)
GET	/api/crops/:location	Get crop rates for a location
GET	/api/crops/:location/:date	Get crop rates for location & date
Sustainability & Community Impact

Farmer Empowerment: Farmers get transparent pricing and can make better selling decisions.

Local Market Strengthening: Encourages fair trade within local communities.

Scalability: Can expand to cover multiple regions and integrate with government price indexes.

Community Engagement: Helps small-scale farmers stay updated with real-time market data.

Future Enhancements

Mobile App Expansion with push notifications.

Multilingual Support for regional farmers.

AI-based Price Forecasting using historical data.

Farmer-to-Farmer Marketplace inside the portal.


