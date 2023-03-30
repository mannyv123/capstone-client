import { useState } from "react";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";

function SignUpPage() {
    const [step, setStep] = useState("account");

    const handleSteps = () => {
        setStep("profile");
    };

    return (
        <section className="signup">
            {step === "account" ? <CreateAccount handleSteps={handleSteps} /> : <CreateProfile />}
        </section>
    );
}

export default SignUpPage;
