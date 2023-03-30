import "./CreateProfile";

function CreateProfile({ setStep }) {
    return (
        <section className="new-profile">
            <h2 className="new-profile__title">Create Profile</h2>
            <div className="new-profile__form">
                <button onClick={() => setStep("account")} type="button" className="new-profile__btn--back">
                    Back
                </button>
            </div>
        </section>
    );
}

export default CreateProfile;
