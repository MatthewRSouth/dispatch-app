export default function ChildPersonalInfoTwo({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Child Personal Info 2</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
