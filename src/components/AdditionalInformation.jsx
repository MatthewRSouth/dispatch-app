export default function AdditionalInformation({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Additional Information</h1>
            <div className="form-group">
                <label htmlFor="AdditionalInformation">
                    Any Other Additional Information その他
                </label>{' '}
                <br />
                <textarea
                    name="additionalInformation"
                    id="additionalInformation"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>

            <div className="button-group">
                {' '}
                <button onClick={onNext}>Next</button>
                <button onClick={onPrevious}>Previous</button>
            </div>
        </div>
    );
}
