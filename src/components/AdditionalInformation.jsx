export default function AdditionalInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
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
                    value={data.additionalInformation}
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                ></textarea>
            </div>

            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button className="next-button button" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
