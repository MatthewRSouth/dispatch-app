export default function Allergies({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Allergies</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
