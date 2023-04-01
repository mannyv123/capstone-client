import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";

function SignUpPage() {
    const [step, setStep] = useState("account");
    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form action="" className="signup__form" onSubmit={handleFormSubmit}>
                {step === "account" ? (
                    <CreateAccount setStep={setStep} />
                ) : (
                    <CreateProfile setStep={setStep} />
                )}
            </form>
        </section>
    );
}

export default SignUpPage;
