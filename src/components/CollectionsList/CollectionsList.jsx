import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";
import "./CollectionsList.scss";
// import axios from "axios";

function CollectionsList({ postsData, handleCollectionDelete, showDelete }) {
    console.log(postsData);
    return (
        <ul className="collections">
            {postsData.map((post) => {
                return (
                    <li className="collections__post" key={post.id}>
                        <h3 className="collections__post-title">{post.title}</h3>
                        <div className="collections__post-images">
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
                        {showDelete === "yes" ? (
                            <div
                                className="collections__delete"
                                onClick={() => handleCollectionDelete(post.user_id, post.id)}
                            >
                                DELETE
                            </div>
                        ) : (
                            ""
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default CollectionsList;
