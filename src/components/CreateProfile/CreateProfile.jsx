import "./CreateProfile.scss";

function CreateProfile({ setStep }) {
    return (
        <section className="new-profile">
            <h2 className="new-profile__title">Create Profile</h2>
            <div className="new-profile__form">
                <label htmlFor="profileImg">Profile Picture:</label>
                <input type="file" name="profileImg" id="profileImg" />
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" />
                <label htmlFor="about">About You:</label>
                <textarea name="about" id="about"></textarea>
                <label htmlFor="setup">Your Setup: </label>
                <textarea name="setup" id="setup"></textarea>
                <button onClick={() => setStep("account")} type="button" className="new-profile__btn--back">
                    Back
                </button>
                <button className="new-profile__btn--complete" type="submit">
                    Finish
                </button>
            </div>
        </section>
    );
}

export default CreateProfile;
