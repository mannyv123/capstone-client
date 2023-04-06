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
                    <li className="collections__post">
                        {post.imageUrls.map((image) => {
                            return (
                                <img className="collections__post-image" src={`${image}`} alt="collection" />
                            );
                        })}
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
