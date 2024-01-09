import React from "react";
import "./signup-screen.css";
import Header from "../../components/Header/Header";
import network from "../../assets/images/network-image.jpg";
import MainButton from "../../components/MainButton/Main_Button";
import LocationIcon from "../../assets/images/location-icon.png";

function SignupScreen() {
    return (
        <div class="signup-bg">
            <Header showButton={true} showOptions = {true}/>
            <div class="network-box">
                <img class="network-img" src={network} alt="network" />
            </div>
            <div class="signup-box">
                <div class="signup-title">
                    <h3>Sign Up</h3>
                </div>
                <div class="signup-form">
                    <form>
                        <div class="form-group">
                            <label for="company-name">Company Name</label>
                            <input
                                class="form-control"
                                type="text"
                                name="company-name"
                                id="company-name"
                                placeholder="Enter your company name"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Domain Email</label>
                            <input
                                class="form-control"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                class="form-control"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input
                                class="form-control"
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                placeholder="Enter your password again"
                                required
                            />
                        </div>
                        <div class="form-group office-location-group">
                            <label for="office-location">Office Location</label>
                            <div class="input-group">
                                <input
                                    className="form-control office-location-input"
                                    type="text"
                                    name="office-location"
                                    id="office-location"
                                    placeholder="Address"
                                    required
                                />
                                <div class="location-button">

                                    <img src={LocationIcon} alt="Location" />
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="office-image">Upload Picture</label>
                            <input
                                class="form-control"
                                type="file"
                                name="office-image"
                                id="office-image"
                                placeholder="Office Image"
                                required
                            />
                        </div>
                        <div class="btn-container">
                            <MainButton text="Sign Up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupScreen;