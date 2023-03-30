import "./SignUpPage.scss";

function SignUpPage() {
    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form action="" className="signup__form">
                <label htmlFor="username" className="signup__label">
                    Create username:
                </label>
                <input type="text" name="username" id="username" className="signup__input" />
                <label htmlFor="password" className="signup__label">
                    Create password:
                </label>
                <input type="password" name="password" id="password" className="signup__input" />
                <label htmlFor="confirmPassword" className="signup__label">
                    Confirm password:
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="signup__input"
                />
                <label htmlFor="email" className="signup__label">
                    Add email:
                </label>
                <input type="email" name="email" id="email" className="signup__input" />
            </form>
        </section>
    );
}

export default SignUpPage;
