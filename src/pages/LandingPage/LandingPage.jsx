import { useEffect, useState } from "react";
import CollectionsList from "../../components/CollectionsList/CollectionsList";
import "./LandingPage.scss";
import axios from "axios";
import { API_URL } from "../../App";

//Landing Page for website; displays recent 5 posts
function LandingPage() {
    const [recentPostData, setRecentPostData] = useState([]); //use state to track recent posts from get call

    //Loads recent posts on page render
    useEffect(() => {
        getRecentPosts();
    }, []);

    //Get recent posts function
    async function getRecentPosts() {
        try {
            const resp = await axios.get(`${API_URL}/posts`);
            setRecentPostData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="landing-page">
            <h1 className="landing-page__title">LATEST COLLECTIONS</h1>
            <div className="landing-page__feed">
                <CollectionsList postsData={recentPostData} showDelete="no" />
            </div>
        </section>
    );
}

export default LandingPage;
