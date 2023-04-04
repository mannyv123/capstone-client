import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage({ setCurrentUser }) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const handleUsernameInput = (event) => {
        setUser(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        localStorage.setItem("username", user);
        navigate(`/profile/${user}`);
    };

    return (
        <section className="login">
            <form action="submit" onSubmit={handleFormSubmit} className="login__form">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={handleUsernameInput} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </section>
    );
}

export default LoginPage;
