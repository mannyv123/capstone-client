import CollectionsList from "../../components/CollectionsList/CollectionsList";
import "./LandingPage.scss";

function LandingPage() {
    return (
        <section className="landing-page">
            <h1 className="landing-page__title">LATEST COLLECTIONS</h1>
            <div className="landing-page__feed">
                <CollectionsList />
            </div>
        </section>
    );
}

export default LandingPage;
