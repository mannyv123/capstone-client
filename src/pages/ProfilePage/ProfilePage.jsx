import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
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
    async function getPosts(userId) {
        try {
            const resp = await axios.get(`${API_URL}/users/${userId}/posts`);

            console.log(" resp : ", resp.data);
            setPostsData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    //Delete Posts
    const handleCollectionDelete = (userId, postId) => {
        console.log("delete", postId);
        deletePost(userId, postId).then(() => {
            getPosts(userId); //might be able to avoid an api call and just set posts data to something else
        });
    };

    async function deletePost(userId, postId) {
        try {
            const resp = await axios.delete(`${API_URL}/users/${userId}/posts/${postId}`);
            console.log("delete resp: ", resp);
        } catch (error) {
            console.error(error);
        }
    }

    console.log("hello");
    console.log("user: ", user);
    return (
        <section className="profile">
            {user ? (
                <div className="profile__details">
                    <h1 className="profile__title">Welcome {user.username}</h1>
                    <img src={user.profileImgUrl} alt="user profile" className="profile__image" />
                    <div className="profile__details-text">
                        <h3 className="profile__about-title">About</h3>
                        <p className="profile__about-text">{user.about}</p>
                        <h3 className="profile__about-title">Equipment Setup</h3>
                        <p className="profile__about-text">{user.setup}</p>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="profile__sub-header">
                <h2 className="profile__collections-title">Your Collections</h2>
                <Link className="profile__add-collection-link" to="/addcollection">
                    <div className="profile__add-collection">Add New Collection</div>
                </Link>
            </div>
            <CollectionsList
                postsData={postsData}
                handleCollectionDelete={handleCollectionDelete}
                showDelete="yes"
            />
        </section>
    );
}

export default ProfilePage;
