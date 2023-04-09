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
                <label htmlFor="name" className="new-profile__label">
                    Name:{" "}
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    className="new-profile__input"
                />
                <label htmlFor="about" className="new-profile__label">
                    About You:
                </label>
                <textarea
                    name="about"
                    id="about"
                    onChange={handleInputChange}
                    className="new-profile__input new-profile__input--textarea "
                ></textarea>
                <label htmlFor="setup" className="new-profile__label">
                    Your Setup:{" "}
                </label>
                <textarea
                    name="setup"
                    id="setup"
                    onChange={handleInputChange}
                    className="new-profile__input new-profile__input--textarea "
                ></textarea>
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
