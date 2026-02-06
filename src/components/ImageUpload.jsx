export default function ImageUpload({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Image Uploader</h1>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
}
