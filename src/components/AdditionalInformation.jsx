export default function AdditionalInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <div>
            <div className="header-wrapper">
                <h1 className="main-header">
                    Additional Information<br></br>　その他
                </h1>
            </div>

            <div className="form-group">
                <label htmlFor="AdditionalInformation">
                    連絡事項があれば記載ください
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
                    戻る
                </button>
                <button className="next-button button" onClick={onNext}>
                    次へ
                </button>
            </div>
        </div>
    );
}
