import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./PageHeader.scss";

function PageHeader({ isLoggedIn, setIsLoggedIn }) {
    //Note: Mobile view/breakpoint not implemented

    const [expanded, setExpanded] = useState(true); //use to track state of header in mobile view

    //Checks if at desktop breakpoint; if true, then header always expanded
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setExpanded(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //When user clicks logout, will update state and remove details for local storage
    const handleLogout = () => {
        localStorage.removeItem("username");
        setIsLoggedIn(false);
    };

    return (
        <header>
            <nav className={`nav ${expanded ? "nav--expanded" : ""}`}>
                <div className="nav__container">
                    <h3 className="nav__title">COLLECTIONS</h3>
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
                                    <NavLink onClick={handleLogout} to="/home" className="nav__item">
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
                    </ul>
                    {/* Only used for mobile view */}
                    <div className="nav__btn" onClick={() => setExpanded(!expanded)}></div>
                </div>
            </nav>
        </header>
    );
}

export default PageHeader;
