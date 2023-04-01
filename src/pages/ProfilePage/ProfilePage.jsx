import CollectionsList from "../../components/CollectionsList/CollectionsList";
import "./ProfilePage.scss";

function ProfilePage() {
    return (
        <section className="profile">
            <h1 className="profile__title">Welcome User</h1>
            <div className="profile__add-collection">Add New Collection</div>
            <h2 className="profile__collections-title">Your Collections</h2>
            <CollectionsList />
        </section>
    );
}

export default ProfilePage;
