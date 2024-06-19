const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const pediatricians = [
  {
    id: 1,
    name: "Dr. Aarav Mehta",
    specialty: "General Pediatrics",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Dr. Anaya Sharma",
    specialty: "Pediatric Cardiology",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Dr. Vikram Patil",
    specialty: "Pediatric Endocrinology",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "Dr. Diya Kapoor",
    specialty: "Pediatric Neurology",
    location: "Hyderabad",
  },
  {
    id: 5,
    name: "Dr. Rohan Rao",
    specialty: "Pediatric Gastroenterology",
    location: "Chennai",
  },
  {
    id: 6,
    name: "Dr. Saanvi Nair",
    specialty: "Pediatric Hematology",
    location: "Pune",
  },
  {
    id: 7,
    name: "Dr. Aarush Singh",
    specialty: "Pediatric Infectious Disease",
    location: "Kolkata",
  },
  {
    id: 8,
    name: "Dr. Kavya Joshi",
    specialty: "Pediatric Nephrology",
    location: "Ahmedabad",
  },
  {
    id: 9,
    name: "Dr. Reyansh Reddy",
    specialty: "Pediatric Pulmonology",
    location: "Jaipur",
  },
  {
    id: 10,
    name: "Dr. Anika Desai",
    specialty: "Pediatric Rheumatology",
    location: "Surat",
  },
  {
    id: 11,
    name: "Dr. Vivaan Verma",
    specialty: "Pediatric Oncology",
    location: "Lucknow",
  },
  {
    id: 12,
    name: "Dr. Arjun Gupta",
    specialty: "Pediatric Surgery",
    location: "Kanpur",
  },
  {
    id: 13,
    name: "Dr. Meera Iyer",
    specialty: "Neonatology",
    location: "Nagpur",
  },
  {
    id: 14,
    name: "Dr. Ishaan Dutt",
    specialty: "Pediatric Allergy and Immunology",
    location: "Indore",
  },
  {
    id: 15,
    name: "Dr. Ishita Chopra",
    specialty: "Pediatric Dermatology",
    location: "Bhopal",
  },
];
app.get("/pediatricians", (req, res) => {
  res.json(pediatricians);
});

app.post("/update-pediatricians", (req, res) => {
  pediatricians = req.body;
  res.json({ message: "Pediatricians data updated successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
