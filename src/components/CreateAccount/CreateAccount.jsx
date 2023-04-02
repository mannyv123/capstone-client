import "./CreateAccount.scss";

function CreateAccount({ setStep, handleInputChange }) {
    return (
        <section className="new-account">
            <h2 className="new-account__title">Create Account</h2>
            <div className="new-account__form">
                <label htmlFor="username" className="new-account__label">
                    Create username:
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    className="new-account__input"
                    onChange={handleInputChange}
                />
                <label htmlFor="password" className="new-account__label">
                    Create password:
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="new-account__input"
                    onChange={handleInputChange}
                />
                <label htmlFor="confirmPassword" className="new-account__label">
                    Confirm password:
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="new-account__input"
                    onChange={handleInputChange}
                />
                <label htmlFor="email" className="new-account__label">
                    Add email:
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="new-account__input"
                    onChange={handleInputChange}
                />
                <button onClick={() => setStep("profile")} type="button" className="new-account__btn--next">
                    Next
                </button>
            </div>
        </section>
    );
}

export default CreateAccount;
