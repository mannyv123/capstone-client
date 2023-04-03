import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import CreateProfile from "../../components/CreateProfile/CreateProfile";
import "./SignUpPage.scss";

const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    about: "",
    setup: "",
};

function SignUpPage({ users, setCurrentUser }) {
    const [step, setStep] = useState("account");
    const navigate = useNavigate();
    const [values, setValues] = useState(initialValues);

    const [profileImg, setProfileImg] = useState(null);
    const [imgDataUrl, setImgDataUrl] = useState(null);
    // const [imgFilename, setImgFilename] = useState("");

    //useEffect to read the selected file and set the file data url
    useEffect(() => {
        let fileReader,
            isCancel = false;
        if (profileImg) {
            fileReader = new FileReader();
            fileReader.onload = (event) => {
                const { result } = event.target;
                if (result && !isCancel) {
                    setImgDataUrl(result);
                    // setImgFilename(currentUser.profileImg.name);
                }
            };
            fileReader.readAsDataURL(profileImg);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [profileImg]);

    //Handles updating form input values
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //Handles updating for image uploads
    const handleImageUpload = (event) => {
        setProfileImg(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        values.imgDataUrl = imgDataUrl;
        values.profileImg = profileImg;

        users.push(values);
        setCurrentUser(values);

        navigate(`/profile/${values.username}`);
    };

    console.log(values);
    return (
        <section className="signup">
            <h1 className="signup__title">Sign Up</h1>
            <form action="" className="signup__form" onSubmit={handleFormSubmit}>
                {step === "account" ? (
                    <CreateAccount setStep={setStep} handleInputChange={handleInputChange} />
                ) : (
                    <CreateProfile
                        setStep={setStep}
                        handleInputChange={handleInputChange}
                        handleImageUpload={handleImageUpload}
                    />
                )}
            </form>
        </section>
    );
}

export default SignUpPage;
