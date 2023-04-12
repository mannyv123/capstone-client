import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage({ setIsLoggedIn }) {
    const [user, setUser] = useState(""); //tracks username
    const navigate = useNavigate();

    //Handles username input
    const handleUsernameInput = (event) => {
        setUser(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
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
                    className="login__input"
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleUsernameInput}
                />
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
