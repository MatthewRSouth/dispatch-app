export default function ChildPersonalInfoOne({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Child Personal Info 1</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
