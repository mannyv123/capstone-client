import "./AddCollectionPage.scss";
import { useNavigate } from "react-router-dom";

function AddCollectionPage({ currentUser }) {
    const navigate = useNavigate();
    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate("/profile");
    };

    console.log(currentUser);
    return (
        <section className="new-collection">
            <h1 className="new-collection__title">Add New Collection</h1>
            <form onSubmit={handleFormSubmit} action="" className="new-collection__form">
                <div className="new-collection__container-imgs">
                    <h3 className="new-collection__sub-hdr">Select files</h3>
                    <input type="file" name="image" id="image" />
                </div>
                <div className="new-collection__container-details">
                    <h3 className="new-collection__sub-hdr">Add Details</h3>
                    <label htmlFor="title" className="new-collection__input-label">
                        Title:
                    </label>
                    <input className="new-collection__input-title" type="text" name="title" id="title" />
                    <label htmlFor="Description" className="new-collection__input-label">
                        Description:
                    </label>
                    <textarea
                        className="new-collection__input-description"
                        name="description"
                        id="description"
                    ></textarea>
                </div>
                <button type="submit">Create Collection</button>
            </form>
        </section>
    );
}

export default AddCollectionPage;
