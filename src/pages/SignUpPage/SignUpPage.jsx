import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";
import { API_URL } from "../../App";

const initialValues = {
    username: "",
    password: "",
    email: "",
    name: "",
    about: "",
    setup: "",
};

//Component for Sign Up Page
function SignUpPage({ setIsLoggedIn }) {
    const [step, setStep] = useState("account"); //tracks whether to render create account component or create profile component
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues); //tracks form inputs
    const [profileImg, setProfileImg] = useState(null); //tracks uploaded profile image
    const [profileImgUrl, setProfileImgUrl] = useState(null); //used for preview of profile image

    //Handles form input values
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //Handles updating for image uploads
    const handleImageUpload = (event) => {
        setProfileImg(event.target.files[0]);
        setProfileImgUrl(URL.createObjectURL(event.target.files[0]));
    };

    //Handles form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        //Append text inputs to formData object
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        //Append profile image data to formData
        formData.append("profileImg", profileImg);

        //set new user as logged in and save to local storage
        localStorage.setItem("username", values.username);

        //Post new user data via API
        createNewUser(formData).then(() => {
            //navigate to profile page of new user
            setIsLoggedIn(true);
            navigate(`/profile/${values.username}`);
        });
    };

    //Async/await function to create new user
    async function createNewUser(newUser) {
        try {
            await axios.post(`${API_URL}/users`, newUser);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form
                action=""
                className="signup__form"
                onSubmit={handleFormSubmit}
                encType="multipart/form-data"
            >
                {step === "account" ? (
                    <CreateAccount setStep={setStep} handleInputChange={handleInputChange} />
                ) : (
                    <CreateProfile
                        setStep={setStep}
                        handleInputChange={handleInputChange}
                        handleImageUpload={handleImageUpload}
                        profileImgUrl={profileImgUrl}
                        profileImg={profileImg}
                    />
                )}
            </form>
        </section>
    );
}

export default SignUpPage;
