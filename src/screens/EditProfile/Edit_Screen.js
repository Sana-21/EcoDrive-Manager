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
import axios from 'axios';

function EditScreen() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    const userData = useSelector(state => state.user.userData);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserData(userId)); // Fetch user data when component mounts and userId is available
        }
    }, [dispatch, userId]);

    const [formState, setFormState] = useState({
        companyName: "",
        officeLocation: "",
        selectedFile: null,
        selectedLocation: {
            lat: 31.5204,
            lng: 74.3587,
        },
        errorMessage: ""
    });
  

    useEffect(() => {
        // Update form state with fetched user data
        setFormState(prevState => ({
            ...prevState,
            companyName: userData.manager.companyName || "",
            officeLocation: userData.manager.officeLocation || ""
        }));
    },[]);

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

            const response = await axios.put(`http://localhost:3001/api/user/${userData.id}`, formData);

            if (response.data.success) {
                // Handle success
            } else {
                setFormState(prevState => ({
                    ...prevState,
                    errorMessage: response.data.message || 'Error during update process.'
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            setFormState(prevState => ({
                ...prevState,
                errorMessage: error.response?.data?.message || 'Error during update process'
            }));
        }
    };

    return (
        <div className="edit-bg">
            <Header showButton={false} showOptions={true} />

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
                                        <MainButton text="Update Location" onClick={() => { close(); }}/>
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
                        {formState.errorMessage && <div className="error-message">{formState.errorMessage}</div>}
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
