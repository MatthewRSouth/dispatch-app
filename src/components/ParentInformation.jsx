export default function ParentInformation({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Parent info</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
