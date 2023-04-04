import "./AddCollectionPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import { useState, useEffect } from "react";

const initialValues = {
    title: "",
    description: "",
};

function AddCollectionPage({ currentUser }) {
    const [userId, setUserId] = useState("");
    const [values, setValues] = useState(initialValues);
    const [images, setImages] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const navigate = useNavigate();
    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
            // console.log(key, values[key]);
        }

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        createPost(formData);

        navigate(`/profile/${currentUser}`);
    };

    //Handle text input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //Handle image uploads
    const handleImageUploads = (event) => {
        setImages(event.target.files);
    };

    //Create new post
    async function createPost(newPost) {
        try {
            const resp = await axios.post(`${API_URL}/users/${userId}/posts`, newPost);
            console.log(resp);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Details
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${currentUser}`);
            console.log("get user response", resp);
            setUserId(resp.data[0].id);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(currentUser);
    console.log(images);
    return (
        <section className="new-collection">
            <h1 className="new-collection__title">Add New Collection</h1>
            <form onSubmit={handleFormSubmit} action="" className="new-collection__form">
                <div className="new-collection__container-imgs">
                    <h3 className="new-collection__sub-hdr">Select files</h3>
                    <input type="file" name="images" id="images" multiple onChange={handleImageUploads} />
                </div>
                <div className="new-collection__container-details">
                    <h3 className="new-collection__sub-hdr">Add Details</h3>
                    <label htmlFor="title" className="new-collection__input-label">
                        Title:
                    </label>
                    <input
                        className="new-collection__input-title"
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description" className="new-collection__input-label">
                        Description:
                    </label>
                    <textarea
                        className="new-collection__input-description"
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Create Collection</button>
            </form>
        </section>
    );
}

export default AddCollectionPage;
