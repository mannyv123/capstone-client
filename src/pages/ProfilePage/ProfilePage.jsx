import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
// import { useState, useEffect } from "react";
import "./ProfilePage.scss";

function ProfilePage({ currentUser }) {
    const { username } = useParams();
    const [user, setUser] = useState("");

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getPosts(user.id);
    }, [user]);

    //Get User Details
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${username}`);
            console.log(resp);
            setUser(resp.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Posts
    async function getPosts(user) {
        try {
            const resp = await axios.get(`${API_URL}/users/${user}/posts`);
            console.log(resp);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(user);
    console.log(user.profileImg);

    return (
        <section className="profile">
            <div className="profile__details">
                <h1 className="profile__title">Welcome {user.username}</h1>
                <img src={`${API_URL}${user.profileImg}`} alt="user profile" className="profile__image" />
            </div>
            <div className="profile__add-collection">Add New Collection</div>
            <h2 className="profile__collections-title">Your Collections</h2>
            <CollectionsList />
        </section>
    );
}

export default ProfilePage;
