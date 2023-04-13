import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
import "./ProfilePage.scss";

function ProfilePage() {
    const { username } = useParams(); //pull which user profile to load based on params in url
    const [user, setUser] = useState(null);
    const [postsData, setPostsData] = useState([]);

    //Get user details on load
    useEffect(() => {
        getUser();
    }, []);

    //If there is a user, get the related posts of that user
    useEffect(() => {
        if (user) {
            getPosts(user.id);
        }
    }, [user]);

    //Get User Details; set user to response
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${username}`);
            setUser(resp.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Posts; save to postsData
    async function getPosts(userId) {
        try {
            const resp = await axios.get(`${API_URL}/users/${userId}/posts`);
            setPostsData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    //Delete Posts and then reload posts data
    const handleCollectionDelete = (userId, postId) => {
        deletePost(userId, postId).then(() => {
            getPosts(userId);
        });
    };

    //Delete post async/await function api call
    async function deletePost(userId, postId) {
        try {
            await axios.delete(`${API_URL}/users/${userId}/posts/${postId}`);
        } catch (error) {
            console.error(error);
        }
    }

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
