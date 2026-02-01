export default function Submit({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Review and Submit</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
