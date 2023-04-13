import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage({ setIsLoggedIn }) {
    const [user, setUser] = useState(""); //tracks username
    const navigate = useNavigate();
    const [isErrorUsername, setIsErrorUsername] = useState(false); //Note: only username validation implemented as authentication not implemented yet

    //Handles username input
    const handleUsernameInput = (event) => {
        setUser(event.target.value);
    };

    //Form validation
    const isFormValid = () => {
        setIsErrorUsername(false);
        if (user === "") {
            setIsErrorUsername(true);
            return false;
        } else {
            return true;
        }
    };

    //Form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            return console.error("Form is incomplete");
        }

        localStorage.setItem("username", user); //saves username to local storage
        setIsLoggedIn(true); //sets logged in to true
        navigate(`/profile/${user}`); //navigates to profile page based on username
    };

    return (
        <section className="login">
            <h1 className="login__title">Login</h1>
            <form action="submit" onSubmit={handleFormSubmit} className="login__form">
                <label className="login__input-label" htmlFor="username">
                    Username:
                </label>
                <input
                    className={`login__input ${isErrorUsername ? "input-error" : ""}`}
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleUsernameInput}
                />
                {isErrorUsername && <p className="error-msg">Missing information!</p>}
                <label className="login__input-label" htmlFor="password">
                    Password:
                </label>
                <input className="login__input" type="password" name="password" id="password" />
                <button className="login__btn" type="submit">
                    Login
                </button>
            </form>
        </section>
    );
}

export default LoginPage;
