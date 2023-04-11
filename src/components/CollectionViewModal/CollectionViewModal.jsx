import { useState } from "react";
import "./CollectionViewModal.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CollectionViewModal({ setIsOpen, selectedPost }) {
    const [current, setCurrent] = useState(0);
    const length = selectedPost.imageUrls.length;
    console.log("selected post: ", selectedPost);

    if (!Array.isArray(selectedPost.imageUrls) || selectedPost.imageUrls.length <= 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <div className="modal">
            <div className="modal__bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal__body">
                {/* <div className="modal__slider"> */}
                <IoIosArrowBack className="modal__left-arrow" onClick={prevSlide} />
                <IoIosArrowForward className="modal__right-arrow" onClick={nextSlide} />
                {selectedPost.imageUrls.map((image, index) => {
                    return (
                        <div
                            className={
                                index === current ? "modal__slide modal__slide--active" : "modal__slide"
                            }
                            key={index}
                        >
                            {index === current && (
                                <img
                                    className="modal__full-image"
                                    src={`${image}`}
                                    alt="fullscreen collection"
                                />
                            )}
                        </div>
                    );
                })}
                {/* </div> */}
            </div>
        </div>
    );
}

export default CollectionViewModal;
