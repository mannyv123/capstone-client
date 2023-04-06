import { useEffect, useState } from "react";
import CollectionsList from "../../components/CollectionsList/CollectionsList";
import "./LandingPage.scss";
import axios from "axios";
import { API_URL } from "../../App";

function LandingPage() {
    const [recentPostData, setRecentPostData] = useState([]);

    useEffect(() => {
        getRecentPosts();
    }, []);

    //Get recent posts
    async function getRecentPosts() {
        try {
            const resp = await axios.get(`${API_URL}/posts`);
            console.log(resp.data);
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
