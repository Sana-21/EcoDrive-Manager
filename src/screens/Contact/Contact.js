// ContactPage.js

import React from 'react';
import Header from '../../components/Header/Header';
import AppIcon from '../../assets/images/office.png';
import EmailIcon from '../../assets/images/email.png';
import PhoneIcon from '../../assets/images/telephone.png'

import './contact.css'; // Import your CSS file for styling

const ContactPage = () => {
  return (
    <div className="contact-container">
      <Header showButton={true} showOptions={true} />
      <div className="contact-content">
        <h2>Contact EcoDrive</h2>
        <p>
          For any inquiries or assistance, please feel free to contact us using the information below:
        </p>
        <ul className="contact-list">
          <li><img src={EmailIcon} alt="Email" /> Email: info@ecodrive.com</li>
          <li><img src={PhoneIcon} alt="Phone" /> Phone: +1 (123) 456-7890</li>
          <li><img src={AppIcon} alt="Address" /> Address: FAST NUCES LAHORE</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
