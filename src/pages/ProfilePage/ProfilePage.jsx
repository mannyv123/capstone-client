import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
// import { useState, useEffect } from "react";
import "./ProfilePage.scss";

function ProfilePage() {
    const { username } = useParams();
    const [user, setUser] = useState("");
    const [postsData, setPostsData] = useState([]);

    //Get the current user data
    useEffect(() => {
        getUser();
    }, []);

    //If there is a user, get the related posts of that user
    useEffect(() => {
        if (user) {
            getPosts(user.id);
        }
    }, [user]);

    //Get User Details
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${username}`);
            console.log("get user response", resp);
            setUser(resp.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Posts
    async function getPosts(user) {
        try {
            const resp = await axios.get(`${API_URL}/users/${user}/posts`);
            console.log("Get posts response: ", resp);
            setPostsData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    console.log("user data: ", user);
    console.log("posts data: ", postsData);
    console.log("user profile image", user.profileImg);

    return (
        <section className="profile">
            <div className="profile__details">
                <h1 className="profile__title">Welcome {user.username}</h1>
                <img src={`${API_URL}${user.profileImg}`} alt="user profile" className="profile__image" />
            </div>
            <div className="profile__add-collection">Add New Collection</div>
            <h2 className="profile__collections-title">Your Collections</h2>
            <CollectionsList postsData={postsData} />
        </section>
    );
}

export default ProfilePage;
