export default function ParentAcknoledgement({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Parent Acknowledgement</h1>
            <button onClick={onNext}>Next</button>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
