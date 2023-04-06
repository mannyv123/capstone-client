import { useState } from "react";
import "./CollectionsList.scss";
// import axios from "axios";

function CollectionsList({ postsData, handleCollectionDelete }) {
    const [showDelete, setShowDelete] = useState(true);
    if (!handleCollectionDelete) setShowDelete(false);

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
                        {showDelete ? (
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
