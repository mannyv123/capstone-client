import "./AddCollectionPage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import { useState, useEffect } from "react";

const initialValues = {
    title: "",
    description: "",
};

//Component to collect details for new collection post

function AddCollectionPage() {
    const [userId, setUserId] = useState(""); //used for creation of new post to correct user
    const [values, setValues] = useState(initialValues); //tracks input values for post title and description
    const [images, setImages] = useState(null); //tracks uploaded image files
    const [imagesArray, setImagesArray] = useState([]); //used for image previews to map out input fields for each image
    const [imageInfo, setImageInfo] = useState([]); //tracks image info for each image
    const currentUser = localStorage.getItem("username"); //retreives username from local storage
    const navigate = useNavigate();
    const [isErrorTitle, setIsErrorTitle] = useState(false);
    const [isErrorDesc, setIsErrorDesc] = useState(false);
    const [isErrorImages, setIsErrorImages] = useState(false);
    const [isErrorImagesInfo, setIsErrorImagesInfo] = useState(false);

    //get user details on load
    useEffect(() => {
        getUser();
    }, []);

    //Form Validation
    const isFormValid = () => {
        setIsErrorTitle(false);
        setIsErrorTitle(false);
        setIsErrorImages(false);
        setIsErrorImagesInfo(false);

        if (images === null) {
            setIsErrorImages(true);
            return false;
        }

        if (values.title === "") {
            setIsErrorTitle(true);
            return false;
        }

        if (values.description === "") {
            setIsErrorDesc(true);
            return false;
        }

        if (areImagesValid() === false) {
            setIsErrorImagesInfo(true);
            return false;
        }

        return true;
    };

    //Images Array Validation
    const areImagesValid = () => {
        let checkError = false;
        if (imageInfo.length === 0) {
            return false;
        }
        for (const info of imageInfo) {
            if (!info.imgLat) {
                setIsErrorImagesInfo(true);
                checkError = true;
            } else if (!info.imgLong) {
                setIsErrorImagesInfo(true);
                checkError = true;
            } else if (!info.imgTitle) {
                setIsErrorImagesInfo(true);
                checkError = true;
            }
        }

        if (checkError) {
            return false;
        } else {
            return true;
        }
    };

    //Handle submission of new collection details and images
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid()) {
            return console.error("Please fix form errors");
        }

        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        formData.append("imageInfo", JSON.stringify(imageInfo));

        createPost(formData).then(() => {
            navigate(`/profile/${currentUser}`);
        });
    };

    //Handle text input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    //Handle image uploads; create url to use for image previews
    const handleImageUploads = (event) => {
        setImages(event.target.files);
        setImagesArray(Object.entries(event.target.files).map((event) => URL.createObjectURL(event[1])));
    };

    //Handle image info for each image
    const handleImageInfo = (event, index) => {
        const { name, value } = event.target;
        const newImageInfo = [...imageInfo];
        newImageInfo[index] = { ...newImageInfo[index], [name]: value };
        setImageInfo(newImageInfo);
    };

    //Create new post
    async function createPost(newPost) {
        try {
            await axios.post(`${API_URL}/users/${userId}/posts`, newPost);
        } catch (error) {
            console.error(error);
        }
    }

    //Get User Details
    async function getUser() {
        try {
            const resp = await axios.get(`${API_URL}/users/${currentUser}`);
            setUserId(resp.data[0].id);
        } catch (error) {
            console.error(error);
        }
    }

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
                {isErrorImages && (
                    <p className="error-msg error-msg--add">
                        Missing images! Please select images to upload.
                    </p>
                )}
                <div className="new-collection__container-details">
                    <h3 className="new-collection__sub-hdr">Add Details</h3>
                    <label htmlFor="title" className="new-collection__label">
                        Title:
                    </label>
                    <input
                        className={`new-collection__input ${isErrorTitle ? "input-error" : ""}`}
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleInputChange}
                    />
                    {isErrorTitle && <p className="error-msg">Missing information!</p>}
                    <label htmlFor="description" className="new-collection__label">
                        Description:
                    </label>
                    <textarea
                        className={`new-collection__input new-collection__input--description ${
                            isErrorDesc ? "error-input" : ""
                        }`}
                        name="description"
                        id="description"
                        onChange={handleInputChange}
                    ></textarea>
                    {isErrorDesc && <p className="error-msg">Missing information!</p>}
                </div>
                <div className="new-collection__container-locations">
                    {imagesArray.length > 0 && <h3 className="new-collection__sub-hdr">Add Photo Details</h3>}
                    {isErrorImagesInfo && (
                        <p className="error-msg">
                            Missing information! Please fill out all fields for each image.
                        </p>
                    )}
                    {imagesArray.map((image, index) => (
                        <div key={index} className="new-collection__image-details">
                            <img
                                src={image}
                                alt="collection item"
                                className="new-collection__image-preview"
                            />
                            <label className="new-collection__label" htmlFor={`imgTitle`}>
                                Image Title:
                            </label>
                            <input
                                type="text"
                                name={`imgTitle`}
                                id={`imgTitle$`}
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
                <button className="new-collection__btn" type="submit">
                    Create Collection
                </button>
            </form>
        </section>
    );
}

export default AddCollectionPage;
