import CollectionsList from "../../components/CollectionsList/CollectionsList";
import { useParams } from "react-router-dom";
import "./ProfilePage.scss";

function ProfilePage({ currentUser }) {
    const { username } = useParams();
    console.log(currentUser);
    return (
        <section className="profile">
            <div className="profile__details">
                <h1 className="profile__title">Welcome {username}</h1>
                <img src={currentUser.profileImg} alt="user profile" className="profile__image" />
            </div>
            <div className="profile__add-collection">Add New Collection</div>
            <h2 className="profile__collections-title">Your Collections</h2>
            <CollectionsList />
        </section>
    );
}

export default ProfilePage;
