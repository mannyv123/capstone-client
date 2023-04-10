import "./AddCollectionPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import { useState, useEffect } from "react";

const initialValues = {
    title: "",
    description: "",
};

function AddCollectionPage() {
    const [userId, setUserId] = useState("");
    const [values, setValues] = useState(initialValues);
    const [images, setImages] = useState(null);
    const [imagesArray, setImagesArray] = useState([]);
    const [imageInfo, setImageInfo] = useState([]);
    const currentUser = localStorage.getItem("username");

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

        formData.append("imageInfo", JSON.stringify(imageInfo));

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        createPost(formData).then((res) => {
            console.log("res after create: ", res);

            navigate(`/profile/${currentUser}`);
        });
    };

    //Handle text input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //Handle image uploads
    const handleImageUploads = (event) => {
        setImages(event.target.files);

        setImagesArray(Object.entries(event.target.files).map((event) => URL.createObjectURL(event[1])));
    };

    //Handle image info
    const handleImageInfo = (event, index) => {
        const { name, value } = event.target;
        const newImageInfo = [...imageInfo];
        newImageInfo[index] = { ...newImageInfo[index], [name]: value };
        setImageInfo(newImageInfo);
    };
    console.log("imageinfo: ", imageInfo);
    //Create new post
    async function createPost(newPost) {
        try {
            const resp = await axios.post(`${API_URL}/users/${userId}/posts`, newPost);
            console.log("resp from create post: ", resp);
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
    console.log(imagesArray);
    return (
        <section className="new-collection">
            <h1 className="new-collection__title">Add New Collection</h1>
            <form onSubmit={handleFormSubmit} action="" className="new-collection__form">
                <div className="new-collection__container-imgs">
                    <h3 className="new-collection__sub-hdr">Select Photos</h3>
                    <input
                        className="new-collection__images-input"
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        onChange={handleImageUploads}
                    />
                </div>
                <label htmlFor="images" className="new-collection__select-label">
                    Choose Files
                </label>
                <div className="new-collection__container-details">
                    <h3 className="new-collection__sub-hdr">Add Details</h3>
                    <label htmlFor="title" className="new-collection__label">
                        Title:
                    </label>
                    <input
                        className="new-collection__input"
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="description" className="new-collection__label">
                        Description:
                    </label>
                    <textarea
                        className="new-collection__input new-collection__input--description"
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className="new-collection__container-locations">
                    {imagesArray.length > 0 && <h3 className="new-collection__sub-hdr">Add Photo Details</h3>}
                    {imagesArray.map((image, index) => (
                        <div key={index} className="new-collection__image-details">
                            <img src={image} alt="photo" className="new-collection__image-preview" />
                            <label className="new-collection__label" htmlFor={`imgTitle${index}`}>
                                Image Title:
                            </label>
                            <input
                                type="text"
                                name={`imgTitle${index}`}
                                id={`imgTitle${index}`}
                                onChange={(event) => handleImageInfo(event, index)}
                                className="new-collection__image-input"
                            />
                            <label className="new-collection__label" htmlFor="imgLat">
                                Latitude:
                            </label>
                            <input
                                type="text"
                                name="imgLat"
                                id="imgLat"
                                onChange={(event) => handleImageInfo(event, index)}
                                className="new-collection__image-input new-collection__image-input--location"
                            />
                            <label className="new-collection__label" htmlFor="imgLong">
                                Longitude:
                            </label>
                            <input
                                type="text"
                                name="imgLong"
                                id="imgLong"
                                onChange={(event) => handleImageInfo(event, index)}
                                className="new-collection__image-input new-collection__image-input--location"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit">Create Collection</button>
            </form>
        </section>
    );
}

export default AddCollectionPage;
