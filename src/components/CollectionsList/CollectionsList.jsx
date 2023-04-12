import "./CollectionsList.scss";
import MapBox from "../MapBox/MapBox";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import { useState } from "react";
import CollectionViewModal from "../CollectionViewModal/CollectionViewModal";

//Component used to render the list of posts (based on postsData passed to it via props)
function CollectionsList({ postsData, handleCollectionDelete, showDelete }) {
    const [isOpen, setIsOpen] = useState(false); //Tracks if modal is open or not
    const [selectedPost, setSelectedPost] = useState({}); //Used to pass selected post when clicked to modal

    console.log("posts data", postsData);

    if (postsData === "no posts") {
        return <div>No posts</div>;
    }

    return (
        <ul className="collections">
            {/* Shows Collection View Modal component only when isOpen set to true */}
            {isOpen && <CollectionViewModal setIsOpen={setIsOpen} selectedPost={selectedPost} />}
            {/* Map function to render individual posts */}
            {postsData.map((post) => {
                return (
                    <li className="collections__post" key={post.id}>
                        <div
                            className="collections__details"
                            onClick={() => {
                                setSelectedPost(post);
                            }}
                        >
                            <h3 className="collections__post-title">{post.title}</h3>
                            <p className="collections__post-description">{post.description}</p>
                            {showDelete === "yes" ? (
                                <div
                                    className="collections__delete"
                                    onClick={() => handleCollectionDelete(post.user_id, post.id)}
                                >
                                    <img src={deleteIcon} alt="delete" className="collections__delete-btn" />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div
                            className="collections__post-images"
                            onClick={() => {
                                setIsOpen(true);
                                setSelectedPost(post);
                            }}
                        >
                            {/* Map function to render all images for an individual post */}
                            {post.imageUrls.map((image, index) => {
                                return (
                                    <img
                                        key={index}
                                        className="collections__post-image"
                                        src={`${image}`}
                                        alt="collection"
                                    />
                                );
                            })}
                        </div>
                        {/* Component that renders the map with markers if location data present within postdata */}
                        <MapBox className="collections__mapbox" postData={post} />
                    </li>
                );
            })}
        </ul>
    );
}

export default CollectionsList;
