import { useState } from "react";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";

function SignUpPage() {
    const [step, setStep] = useState("account");

    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form action="" className="signup__form">
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
