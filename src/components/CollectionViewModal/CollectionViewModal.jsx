import { useState } from "react";
import "./CollectionViewModal.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";

//Component to show full screen images
function CollectionViewModal({ setIsOpen, selectedPost }) {
    const [current, setCurrent] = useState(0); //used to set current image to show; defaults to first image in array
    const length = selectedPost.imageUrls.length;

    //If there are no image urls, do not render
    if (!Array.isArray(selectedPost.imageUrls) || selectedPost.imageUrls.length <= 0) {
        return null;
    }

    //Go to next image on click
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    //Go to previous image on click
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <div className="modal">
            <div className="modal__bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal__body">
                <IoClose className="modal__close" onClick={() => setIsOpen(false)} />
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
            </div>
        </div>
    );
}

export default CollectionViewModal;
