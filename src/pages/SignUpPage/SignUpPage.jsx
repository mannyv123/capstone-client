import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";

const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    profileImg: null,
    profileImgData: {
        imgDataUrl: null,
        imgFilename: "",
    },
    name: "",
    about: "",
    setup: "",
};

function SignUpPage() {
    const [step, setStep] = useState("account");
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    //Handles updating form input values
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate("/profile");
    };
    console.log(values);
    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form action="" className="signup__form" onSubmit={handleFormSubmit}>
                {step === "account" ? (
                    <CreateAccount setStep={setStep} handleInputChange={handleInputChange} />
                ) : (
                    <CreateProfile setStep={setStep} handleInputChange={handleInputChange} />
                )}
            </form>
        </section>
    );
}

export default SignUpPage;
