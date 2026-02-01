export default function AdditionalInformation({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Image Uploader</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
