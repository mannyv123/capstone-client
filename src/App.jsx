import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import PageHeader from "./components/PageHeader/PageHeader";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AddCollectionPage from "./pages/AddCollectionPage/AddCollectionPage";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";

export const API_URL = "http://localhost:5001";

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <div className="App">
            <BrowserRouter>
                <PageHeader />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/signup" element={<SignUpPage setCurrentUser={setCurrentUser} />} />
                    <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                    <Route path="/profile/:username" element={<ProfilePage currentUser={currentUser} />} />
                    <Route path="/addcollection" element={<AddCollectionPage currentUser={currentUser} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
