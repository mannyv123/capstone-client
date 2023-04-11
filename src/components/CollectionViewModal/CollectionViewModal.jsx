import "./CollectionViewModal.scss";

function CollectionViewModal({ setIsOpen }) {
    return (
        <div className="modal">
            <div className="modal__bg" onClick={() => setIsOpen(false)}></div>
            <div className="modal__body"></div>
        </div>
    );
}

export default CollectionViewModal;
