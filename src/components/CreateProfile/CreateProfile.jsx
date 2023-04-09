import "./CreateProfile.scss";

function CreateProfile({ setStep, handleInputChange, handleImageUpload }) {
    return (
        <section className="new-profile">
            <h2 className="new-profile__title">Create Profile</h2>
            <div className="new-profile__form">
                <label htmlFor="profileImg">Profile Picture:</label>
                <input
                    type="file"
                    name="profileImg"
                    id="profileImg"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageUpload}
                />
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" onChange={handleInputChange} />
                <label htmlFor="about">About You:</label>
                <textarea name="about" id="about" onChange={handleInputChange}></textarea>
                <label htmlFor="setup">Your Setup: </label>
                <textarea name="setup" id="setup" onChange={handleInputChange}></textarea>
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
        </section>
    );
}

export default CreateProfile;
