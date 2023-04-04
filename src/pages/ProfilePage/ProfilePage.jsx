import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
// import { useState, useEffect } from "react";
import "./ProfilePage.scss";

function ProfilePage() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [postsData, setPostsData] = useState([]);

    // const myPromise = new Promise((resolve, reject) => {
    //     getUser();
    // });

    //Get the current user data
    // useEffect(() => {
    //     myPromise.then();

    //     if (user) {
    //         getPosts(user.id);
    //     }
    // }, []);

    useEffect(() => {
        getUser();
    }, []);

    //If there is a user, get the related posts of that user
    useEffect(() => {
        if (user) {
            console.log(" I AM GEtTING POST");
            getPosts(user.id);
        }
    }, [user]);

    // //Get User Details
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${username}`);
            setUser(resp.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Posts
    async function getPosts(user) {
        try {
            const resp = await axios.get(`${API_URL}/users/${user}/posts`);

            console.log(" resp : ", resp.data);
            setPostsData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    console.log("hello");

    return (
        <section className="profile">
            {user ? (
                <div className="profile__details">
                    <h1 className="profile__title">Welcome {user.username}</h1>
                    <img src={`${API_URL}${user.profileImg}`} alt="user profile" className="profile__image" />
                </div>
            ) : (
                ""
            )}

            <Link to="/addcollection">
                <div className="profile__add-collection">Add New Collection</div>
            </Link>
            <h2 className="profile__collections-title">Your Collections</h2>
            <CollectionsList postsData={postsData} />
        </section>
    );
}

export default ProfilePage;
