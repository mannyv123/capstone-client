import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./PageHeader.scss";
// import logo from "../../assets/logos/logo-white.svg";

function PageHeader({ isLoggedIn, setIsLoggedIn }) {
    const [expanded, setExpanded] = useState(true);
    // const [currentUser, setCurrentUser] = useState(localStorage.getItem("username"));
    //Checks if at desktop breakoint; if true, then header always expanded
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // set breakpoint as per your design
                setExpanded(true);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        console.log("log out");
    };

    return (
        <header>
            <nav className={`nav ${expanded ? "nav--expanded" : ""}`}>
                <div className="nav__container">
                    <h3 className="nav__title">COLLECTIONS</h3>
                    {/* <img src={logo} alt="logo" className="nav__logo" /> */}
                    <ul className={`nav__list ${expanded ? "" : "nav__list--hidden"}`}>
                        <li className="nav__link">
                            <NavLink className="nav__item" to="/">
                                {" "}
                                Home
                            </NavLink>
                        </li>

                        {isLoggedIn ? (
                            <>
                                <li className="nav__link">
                                    <NavLink
                                        className="nav__item"
                                        to={`/profile/${localStorage.getItem("username")}`}
                                    >
                                        My Profile
                                    </NavLink>
                                </li>
                                <li className="nav__link">
                                    <NavLink onClick={handleLogout} to="/" className="nav__item">
                                        Logout
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav__link">
                                    <NavLink className="nav__item" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav__link">
                                    <NavLink className="nav__item" to="/signup">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* <NavLink
                                className="nav__item"
                                to={currentUser ? `/profile/${currentUser}` : "/login"}
                            >
                                My Profile
                            </NavLink> */}

                        {/* <li className="nav__link">
                            <NavLink className="nav__item" to="/signup">
                                Sign Up
                            </NavLink>
                        </li> */}
                        {/* <li className="nav__link">
                            <NavLink className="nav__item" to="/login">
                                Login
                            </NavLink>
                        </li> */}
                    </ul>
                    <div className="nav__btn" onClick={() => setExpanded(!expanded)}></div>
                </div>
            </nav>
        </header>
    );
}

export default PageHeader;
