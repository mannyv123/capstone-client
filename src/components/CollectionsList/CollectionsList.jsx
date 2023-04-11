import "./CollectionsList.scss";
import MapBox from "../MapBox/MapBox";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import { useState } from "react";
import CollectionViewModal from "../CollectionViewModal/CollectionViewModal";

function CollectionsList({ postsData, handleCollectionDelete, showDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    console.log(postsData);
    return (
        <ul className="collections">
            {isOpen && <CollectionViewModal setIsOpen={setIsOpen} selectedPost={selectedPost} />}
            {postsData.map((post) => {
                return (
                    <li className="collections__post" key={post.id}>
                        <div
                            className="collections__details"
                            onClick={() => {
                                setIsOpen(true);
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
                        <MapBox className="collections__mapbox" postData={post} />
                    </li>
                );
            })}
        </ul>
    );
}

export default CollectionsList;
