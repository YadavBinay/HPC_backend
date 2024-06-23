const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
const clinics = [
  {
    id: 1,
    "Pediatrician's Name": 'Dr. Emily Johnson, MD',
    'Clinic Name': 'Sunshine Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 123-4567',
      'Email Address': 'dr.johnson@sunshinepediatrics.com',
      'Clinic Address':
        '1234 Elm Street, Suite 567, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 5:00 PM',
      Tuesday: '8:00 AM - 5:00 PM',
      Wednesday: '8:00 AM - 5:00 PM',
      Thursday: '10:00 AM - 7:00 PM',
      Friday: '8:00 AM - 3:00 PM',
      Saturday: '9:00 AM - 12:00 PM (Urgent Appointments Only)',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 987-6543',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.sunshinepediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    "Pediatrician's Name": 'Dr. James Smith, MD',
    'Clinic Name': 'Happy Kids Clinic',
    'Contact Information': {
      'Phone Number': '(555) 234-5678',
      'Email Address': 'dr.smith@happykidsclinic.com',
      'Clinic Address':
        '5678 Oak Street, Suite 123, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 6:00 PM',
      Tuesday: '8:00 AM - 6:00 PM',
      Wednesday: '8:00 AM - 6:00 PM',
      Thursday: '8:00 AM - 6:00 PM',
      Friday: '8:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 876-5432',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.happykidsclinic.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 3,
    "Pediatrician's Name": 'Dr. Sarah Lee, MD',
    'Clinic Name': 'Bright Futures Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 345-6789',
      'Email Address': 'dr.lee@brightfuturespediatrics.com',
      'Clinic Address':
        '9101 Maple Avenue, Suite 234, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '9:00 AM - 5:00 PM',
      Tuesday: '9:00 AM - 5:00 PM',
      Wednesday: '9:00 AM - 5:00 PM',
      Thursday: '9:00 AM - 5:00 PM',
      Friday: '9:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 765-4321',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.brightfuturespediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 4,
    "Pediatrician's Name": 'Dr. Michael Brown, MD',
    'Clinic Name': 'Healthy Kids Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 456-7890',
      'Email Address': 'dr.brown@healthykidspediatrics.com',
      'Clinic Address':
        '3456 Pine Street, Suite 345, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 5:00 PM',
      Tuesday: '8:00 AM - 5:00 PM',
      Wednesday: '8:00 AM - 5:00 PM',
      Thursday: '10:00 AM - 7:00 PM',
      Friday: '8:00 AM - 3:00 PM',
      Saturday: '9:00 AM - 12:00 PM (Urgent Appointments Only)',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 543-2109',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.healthykidspediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 5,
    "Pediatrician's Name": 'Dr. Laura Davis, MD',
    'Clinic Name': "Kid's Health Clinic",
    'Contact Information': {
      'Phone Number': '(555) 567-8901',
      'Email Address': 'dr.davis@kidshealthclinic.com',
      'Clinic Address':
        '7890 Birch Street, Suite 456, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 6:00 PM',
      Tuesday: '8:00 AM - 6:00 PM',
      Wednesday: '8:00 AM - 6:00 PM',
      Thursday: '8:00 AM - 6:00 PM',
      Friday: '8:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 432-1098',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.kidshealthclinic.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: 6,
    "Pediatrician's Name": 'Dr. Jennifer Wilson, MD',
    'Clinic Name': 'Bright Smiles Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 678-9012',
      'Email Address': 'dr.wilson@brightsmilespediatrics.com',
      'Clinic Address':
        '4567 Cedar Avenue, Suite 567, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '9:00 AM - 5:00 PM',
      Tuesday: '9:00 AM - 5:00 PM',
      Wednesday: '9:00 AM - 5:00 PM',
      Thursday: '9:00 AM - 5:00 PM',
      Friday: '9:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 765-4321',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.brightsmilespediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 7,
    "Pediatrician's Name": 'Dr. David Martinez, MD',
    'Clinic Name': 'Healthy Futures Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 789-0123',
      'Email Address': 'dr.martinez@healthyfuturespediatrics.com',
      'Clinic Address':
        '6789 Pine Street, Suite 678, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 5:00 PM',
      Tuesday: '8:00 AM - 5:00 PM',
      Wednesday: '8:00 AM - 5:00 PM',
      Thursday: '10:00 AM - 7:00 PM',
      Friday: '8:00 AM - 3:00 PM',
      Saturday: '9:00 AM - 12:00 PM (Urgent Appointments Only)',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 876-5432',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.healthyfuturespediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 8,
    "Pediatrician's Name": 'Dr. Lisa Garcia, MD',
    'Clinic Name': 'Little Stars Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 890-1234',
      'Email Address': 'dr.garcia@littlestarspediatrics.com',
      'Clinic Address':
        '7890 Maple Avenue, Suite 789, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 6:00 PM',
      Tuesday: '8:00 AM - 6:00 PM',
      Wednesday: '8:00 AM - 6:00 PM',
      Thursday: '8:00 AM - 6:00 PM',
      Friday: '8:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 654-3210',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.littlestarspediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: 9,
    "Pediatrician's Name": 'Dr. Robert Lee, MD',
    'Clinic Name': 'Caring Hearts Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 901-2345',
      'Email Address': 'dr.lee@caringheartspediatrics.com',
      'Clinic Address':
        '8901 Birch Street, Suite 890, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '9:00 AM - 5:00 PM',
      Tuesday: '9:00 AM - 5:00 PM',
      Wednesday: '9:00 AM - 5:00 PM',
      Thursday: '9:00 AM - 5:00 PM',
      Friday: '9:00 AM - 4:00 PM',
      Saturday: 'Closed',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 543-2109',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.caringheartspediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: 10,
    "Pediatrician's Name": 'Dr. Karen Young, MD',
    'Clinic Name': 'Future Stars Pediatrics',
    'Contact Information': {
      'Phone Number': '(555) 012-3456',
      'Email Address': 'dr.young@futurestarspediatrics.com',
      'Clinic Address':
        '1234 Cedar Avenue, Suite 901, Springfield, State, ZIP Code',
    },
    'Office Hours': {
      Monday: '8:00 AM - 5:00 PM',
      Tuesday: '8:00 AM - 5:00 PM',
      Wednesday: '8:00 AM - 5:00 PM',
      Thursday: '10:00 AM - 7:00 PM',
      Friday: '8:00 AM - 3:00 PM',
      Saturday: '9:00 AM - 12:00 PM (Urgent Appointments Only)',
      Sunday: 'Closed',
    },
    'Services Provided': [
      'General Pediatric Care',
      'Immunizations and Vaccinations',
      'Well-Child Visits',
      'Developmental Screenings',
      'Nutritional Counseling',
      'Treatment of Acute and Chronic Illnesses',
      'Behavioral Consultations',
      'Adolescent Health Care',
    ],
    'Insurance Accepted': [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'United Healthcare',
      'Medicaid',
      'Self-Pay Options Available',
    ],
    'Emergency Contact': {
      'After-Hours Emergency Phone': '(555) 210-9876',
    },
    'Additional Notes': {
      'New Patient Information':
        'Please arrive 15 minutes early for your first appointment to complete necessary paperwork. Bring any medical records and a list of current medications.',
      'Appointment Cancellations':
        'Please notify us at least 24 hours in advance if you need to cancel or reschedule your appointment.',
    },
    Website: 'http://www.futurestarspediatrics.com',
    'Profile Picture': 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

app.get('/pediatricians', (req, res) => {
  res.json(pediatricians);
});

app.post('/update-pediatricians', (req, res) => {
  pediatricians = req.body;
  res.json({ message: 'Pediatricians data updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
