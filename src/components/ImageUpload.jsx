import '../styles/buttons.css';
export default function ImageUpload({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Image Uploader</h1>
            <button className="previous-button" onClick={onPrevious}>
                Previous
            </button>
            <button className="next-button" onClick={onNext}>
                Next
            </button>
        </div>
    );
}
