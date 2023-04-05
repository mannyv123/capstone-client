import "./CollectionsList.scss";
// import axios from "axios";

function CollectionsList({ postsData }) {
    return (
        <ul className="collections">
            {postsData.map((post) => {
                return (
                    <li className="collections__post">
                        {post.imageUrls.map((image) => {
                            return <img className="collections__post-image" src={`${image}`} alt="post" />;
                        })}
                    </li>
                );
            })}
        </ul>
    );
}

export default CollectionsList;
