import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import PageHeader from "./components/PageHeader/PageHeader";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddCollectionPage from "./pages/AddCollectionPage/AddCollectionPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

//API URL
export const API_URL = process.env.REACT_APP_API_URL;

function App() {
    //use state variable to track when a user is logged in; will change header nav links based on logged in status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <PageHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/addcollection" element={<AddCollectionPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
