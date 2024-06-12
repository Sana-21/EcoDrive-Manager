import React, { useState, useEffect } from "react";
import "./edit-screen.css";
import Header from "../../components/Header/Header";
import MainButton from "../../components/MainButton/Main_Button";
import LocationIcon from "../../assets/images/location-icon.png";
import SearchLocationInput from "../../components/LocationSearchBar/Find_Location";
import MapComponent from "../../components/Map/MapComponent";
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/userActions';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function EditScreen() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const userData = useSelector(state => state.user.userData);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData(userId));
        }
    }, [dispatch, userId]);


    const { manager } = userData;

    const [formState, setFormState] = useState({
        companyName: "",
        officeLocation: "",
        selectedFile: null,
        selectedLocation: {
            lat: 31.5204,
            lng: 74.3587,
        },
        errorMessage: "",
        passwordPopupOpen: false,
        currentPassword: "",
        newPassword: "",
        passwordChangeSuccess: false
    });


    useEffect(() => {
        // Update form state with fetched user data
        if (userData && userData.manager) {
            setFormState(prevState => ({
                ...prevState,
                companyName: manager.companyName || "",
                officeLocation: manager.officeAddress || ""
            }));
        }
    }, [userData]);

    const handleFileChange = (e) => {
        setFormState(prevState => ({
            ...prevState,
            selectedFile: e.target.files[0]
        }));
    };

    const handleLocationChange = (location) => {
        setFormState(prevState => ({
            ...prevState,
            officeLocation: location
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("companyName", formState.companyName);
            formData.append("officeLocation", formState.officeLocation);
            formData.append("officeImage", formState.selectedFile);

            const response = await axios.put(`http://localhost:3001/api/manager/${manager.id}`, formData);

            if (response.data.success) {
                setFormState(prevState => ({
                    ...prevState,
                    errorMessage: "",
                    passwordChangeSuccess: false
                }));

                // Display success message for 2 seconds
                setTimeout(() => {
                    setFormState(prevState => ({
                        ...prevState,
                        successMessage: "",
                    }));
                }, 2000);
            } else {
                setFormState(prevState => ({
                    ...prevState,
                    errorMessage: response.data.message
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            setFormState(prevState => ({
                ...prevState,
                errorMessage: error.response?.data?.message
            }));
        }
    };

    const handlePasswordChangeSubmit = async (event) => {
        event.preventDefault();

        try {
            const { currentPassword, newPassword } = formState;
            const response = await axios.put(`http://localhost:3001/api/manager/${manager.id}/change-password`, {
                currentPassword,
                newPassword
            });

            if (response.data.success) {
                // Update state to indicate password change success
                setFormState(prevState => ({
                    ...prevState,
                    passwordChangeSuccess: true,
                    errorMessage: "",
                }));

                // Display success message for 2 seconds
                setTimeout(() => {
                    setFormState(prevState => ({
                        ...prevState,
                        successMessage: "Password changed successfully!",
                    }));
                }, 2000);
            } else {
                // Handle password change failure
                setFormState(prevState => ({
                    ...prevState,
                    errorMessage: response.data.message
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            setFormState(prevState => ({
                ...prevState,
                errorMessage: error.response?.data?.message
            }));
        }
    };



    const handleCancelPasswordChange = () => {
        setFormState(prevState => ({
            ...prevState,
            passwordPopupOpen: false,
            errorMessage: "" // Reset error message
        }));
    };

    const handleOpenPasswordPopup = () => {
        setFormState(prevState => ({
            ...prevState,
            passwordPopupOpen: true,
            errorMessage: "",
        }));
    };


    return (
        <div className="edit-bg">
            <Header showButton={false} showOptions={false} />

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
                                value={formState.companyName}
                                onChange={(e) => setFormState(prevState => ({
                                    ...prevState,
                                    companyName: e.target.value
                                }))}
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
                                            value={formState.officeLocation}
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
                                    <SearchLocationInput setSelectedLocation={handleLocationChange} setOfficeLocation={handleLocationChange} />
                                    <MapComponent selectedLocation={formState.selectedLocation} />
                                    <div className="btn-container">
                                        <MainButton text="Update Location" onClick={() => { close(); }} />
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

                        <label>Change Password</label>
                        <button id="change-password" onClick={handleOpenPasswordPopup}>Change Password</button>
                        {formState.errorMessage && <div className="error-message">{formState.errorMessage}</div>}
                        {formState.passwordChangeSuccess && <div className="success-message">Password changed successfully!</div>}
                        <div className="save-button">
                        <MainButton text="Save Changes" type="submit" className="btn-container" />
                        </div>

                    </form>
                </div>
            </div>

            {/* Password change popup */}
            <Popup open={formState.passwordPopupOpen} onClose={() => setFormState(prevState => ({ ...prevState, passwordPopupOpen: false }))}>
                <div className="password-change-popup">
                    <h3>Change Password</h3>
                    <form onSubmit={handlePasswordChangeSubmit}>
                        <div className="form-group">
                            <label htmlFor="current-password">Current Password</label>
                            <input
                                type="password"
                                id="current-password"
                                value={formState.currentPassword}
                                onChange={(e) => setFormState(prevState => ({ ...prevState, currentPassword: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                value={formState.newPassword}
                                onChange={(e) => setFormState(prevState => ({ ...prevState, newPassword: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="pass-btn-container">
                            <button className="main-button" type="submit">Change</button>
                            <button className="cancel-button" onClick={handleCancelPasswordChange}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Popup>

        </div>
    );
}

export default EditScreen;
