import React, { useState, useEffect } from "react";
import "./signup-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/MainButton/Main_Button";
import LocationIcon from "../../assets/images/location-icon.png";
import SearchLocationInput from "../../components/LocationSearchBar/Find_Location";
import MapComponent from "../../components/Map/MapComponent";
import Popup from 'reactjs-popup';
import axios from 'axios';

function SignupScreen() {

    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 31.5204,
        lng: 74.3587,
    });



    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);


    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("companyName", companyName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("officeAddress", officeAddress);
            // formData.append("officeLatitude", selectedLocation.lat); 
            // formData.append("officeLongitude", selectedLocation.lng);
            formData.append("officeLocation", JSON.stringify({
                longitude: selectedLocation.lng,
                latitude: selectedLocation.lat
            }));
            formData.append("officeImage", selectedFile);

            const response = await axios.post("http://localhost:3001/api/manager/signup", formData);

            if (response.data.success) {
                setSuccessMessage('Please check your email for verification');
            } else {
                setErrorMessage(response.data.message || 'Error during signup process.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.response?.data?.message || 'Error during signup process');
        }
    };


    return (
        <div className="signup-bg">
            <Header showSignIn={true} showSignUp={false} showOptions={true} />

            <div className="network-box">
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <img className="network-img" src={network} alt="Network" />
            </div>

            <div className="signup-box">
                <div className="signup-title">
                    <h3>Sign Up</h3>
                </div>

                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="company-name">Company Name</label>
                            <input
                                className="form-control"
                                type="text"
                                id="company-name"
                                placeholder="Enter your company name"
                                required
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Domain Email</label>
                            <input
                                className="form-control"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                className="form-control"
                                type="password"
                                id="confirm-password"
                                placeholder="Enter your password again"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Popup
                            trigger={
                                <div className="form-group office-location-group">
                                    <label htmlFor="office-location">Office Location</label>
                                    <div className="input-group">
                                        <input
                                            className="form-control office-location-input"
                                            type="text"
                                            id="office-location"
                                            placeholder="Address"
                                            required
                                            value={officeAddress}
                                            readOnly 
                                        />
                                        <div className="location-button">
                                            <img src={LocationIcon} alt="Location" />
                                        </div>
                                    </div>
                                </div>
                            }
                            modal
                            nested
                           >
                            {(close) => (
                                <div className="popup">
                                    <SearchLocationInput setSelectedLocation={setSelectedLocation} setOfficeAddress={setOfficeAddress} />
                                    <MapComponent selectedLocation={selectedLocation} />
                                    <div className="btn-container">
                                    <MainButton text="Add Location" onClick={() => { close(); setSelectedLocation(selectedLocation); }}/>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <div className="form-group">
                            <label htmlFor="office-image">Upload Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                id="office-image"
                                name="officeImage"
                                onChange={handleFileChange}
                            />
                            <div className="btn-container">
                            <MainButton text="Sign Up" type="submit" />
                            </div>
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupScreen;

