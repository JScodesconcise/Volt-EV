https://drive.google.com/file/d/1kpsnmMZAf3OCTNew64CJQhyIJsvpUclR/view?usp=sharing

# Volt-EV

A full-stack application built with React for the frontend, Spring Boot for the backend, and MongoDB for the database.

Overview

This project demonstrates a typical MERN-style stack (minus Express) using:

Frontend: React (with Create React App)

Backend: Spring Boot (Java 17+)

Database: MongoDB (local or Atlas)

Prerequisites

Before you begin, ensure you have installed:

Java 17+ (and mvn or the Maven Wrapper)

Node.js 14+ and npm

MongoDB (running locally or a connection URI from MongoDB Atlas)

Git

Installation & Setup

1. Clone the repository

git clone https://github.com/JScodesconcise/Volt-EV.git
cd Volt-EV

2. Configure MongoDB

If you’re running MongoDB locally, the default URI is:

spring.data.mongodb.uri=mongodb://localhost:27017/volt-ev

If you use MongoDB Atlas, copy your connection string and replace username, password, and dbname accordingly.

Backend (Spring Boot)

Navigate to the backend directory:

cd backend

Create your application properties:

cp src/main/resources/application.example.properties src/main/resources/application.properties

Edit application.properties:

spring.data.mongodb.uri=YOUR_MONGODB_URI
server.port=8080

Build the application:

./mvnw clean package

Or if you don’t have the wrapper:

mvn clean package

Run the application:

java -jar target/*.jar

The API will be available at http://localhost:8080

Frontend (React)

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm start

The React app will open at http://localhost:3000

Build for production:

npm run build


Navigate to http://localhost:3000 to see the app in action.
