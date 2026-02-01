export default function Success({ onPrevious }) {
    return (
        <div>
            <h1>Success!</h1>
            <button onClick={onPrevious}>Previous</button>
        </div>
    );
}
