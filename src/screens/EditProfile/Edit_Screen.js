import React, { useState, useEffect } from "react";
import "./edit-screen.css"; 
import Header from "../../components/Header/Header";
import MainButton from "../../components/MainButton/Main_Button";
import LocationIcon from "../../assets/images/location-icon.png";
import SearchLocationInput from "../../components/LocationSearchBar/Find_Location";
import MapComponent from "../../components/Map/MapComponent";
import Popup from 'reactjs-popup';
import axios from 'axios';

function EditScreen({ userData }) {
    const [companyName, setCompanyName] = useState(userData.companyName || "");
    const [officeLocation, setOfficeLocation] = useState(userData.officeLocation || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 31.5204,
        lng: 74.3587,
    });

    useEffect(() => {
        setCompanyName(userData.companyName || "");
        setOfficeLocation(userData.officeLocation || "");
    }, [userData]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       

        try {
            const formData = new FormData();
            formData.append("companyName", companyName);
            formData.append("officeLocation", officeLocation);
            formData.append("officeImage", selectedFile);

            const response = await axios.put(`http://localhost:3001/api/user/${userData.id}`, formData);

            if (response.data.success) {
                // Handle success
            } else {
                setErrorMessage(response.data.message || 'Error during update process.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.response?.data?.message || 'Error during update process');
        }
    };

    return (
        <div className="edit-bg">
            <Header showButton={true} showOptions={true} />

            <div className="edit-box">
                <div className="edit-title">
                    <h3>Edit Profile</h3>
                </div>

                <div className="edit-form">
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
                                            value={officeLocation}
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
                                    <SearchLocationInput setSelectedLocation={setSelectedLocation} setOfficeLocation={setOfficeLocation} />
                                    <MapComponent selectedLocation={selectedLocation} />
                                    <div className="btn-container">
                                        <MainButton text="Update Location" onClick={() => { close(); setSelectedLocation(selectedLocation); }}/>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <div className="form-group">
                            <label htmlFor="office-image">Upload New Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                id="office-image"
                                name="officeImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="btn-container">
                            <MainButton text="Save Changes" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditScreen;
