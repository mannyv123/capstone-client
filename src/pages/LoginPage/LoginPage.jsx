import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

function LoginPage({ setIsLoggedIn }) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    const handleUsernameInput = (event) => {
        setUser(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("username", user);
        setIsLoggedIn(true);
        navigate(`/profile/${user}`);
    };

    // useEffect(() => {
    //     if (loggedIn) {
    //         setTimeout(() => {
    //             localStorage.setItem("username", user);
    //             navigate(`/profile/${user}`);
    //         }, 2000);
    //     }
    // }, [loggedIn, user, navigate]);

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
