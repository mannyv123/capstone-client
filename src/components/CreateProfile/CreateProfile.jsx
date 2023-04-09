// import { useState } from "react";
import "./CreateProfile.scss";

function CreateProfile({ setStep, handleInputChange, handleImageUpload, profileImgUrl, profileImg }) {
    return (
        <section className="new-profile">
            <h2 className="new-profile__title">Create Profile</h2>
            <div className="new-profile__form">
                {profileImgUrl && (
                    <img src={profileImgUrl} alt="profile upload" className="new-profile__preview" />
                )}
                <input
                    type="file"
                    name="profileImg"
                    id="profileImg"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageUpload}
                    className="new-profile__image"
                />
                <label htmlFor="profileImg" className="new-profile__select-img">
                    {profileImg ? profileImg.name : "Select a Profile Image"}
                </label>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={handleInputChange} />
                <label htmlFor="about">About You:</label>
                <textarea name="about" id="about" onChange={handleInputChange}></textarea>
                <label htmlFor="setup">Your Setup: </label>
                <textarea name="setup" id="setup" onChange={handleInputChange}></textarea>
                <div className="new-profile__btn-container">
                    <button
                        onClick={() => setStep("account")}
                        type="button"
                        className="signup__btn signup__btn--back"
                    >
                        Back
                    </button>
                    <button className="signup__btn signup__btn--complete" type="submit">
                        Finish
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CreateProfile;
