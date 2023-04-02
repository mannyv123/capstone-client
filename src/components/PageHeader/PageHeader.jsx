import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./PageHeader.scss";
// import logo from "../../assets/logos/logo-white.svg";

function PageHeader() {
    const [expanded, setExpanded] = useState(false);

    console.log(expanded);

    return (
        <header>
            <nav className={`nav ${expanded ? "nav--expanded" : ""}`}>
                <div className="nav__container">
                    <h3 className="nav__title">COLLECTIONS</h3>
                    {/* <img src={logo} alt="logo" className="nav__logo" /> */}
                    <ul className={`nav__list ${expanded ? "" : "nav__list--hidden"}`}>
                        <li className="nav__link">
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                        <li className="nav__link">Login</li>
                        <li className="nav__link">
                            <NavLink to="/"> Home</NavLink>
                        </li>
                        <li className="nav__link">
                            <NavLink to="/profile">My Profile</NavLink>
                        </li>
                        <li className="nav__link">Logout</li>
                    </ul>
                    <div className="nav__btn" onClick={() => setExpanded(!expanded)}></div>
                </div>
            </nav>
        </header>
    );
}

export default PageHeader;
