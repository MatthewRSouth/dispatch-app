export default function Allergies({ data, handleChange, onNext, onPrevious }) {
    const isFormComplete =
        data.hasAllergies === 'no' ||
        (data.hasAllergies === 'yes' && data.allergyDetails?.length > 0);
    return (
        <>
            <div className="form-wrapper">
                <div className="header-wrapper">
                    <h1 className="main-header">Allergies</h1>
                </div>

                <div className="form-group">
                    <label htmlFor="">
                        Does your child have any allergies?
                    </label>
                    <div className="radio-group">
                        <div className="radio-options">
                            <label className="allergy-option" htmlFor="">
                                <input
                                    type="radio"
                                    name="hasAllergies"
                                    value="yes"
                                    onChange={handleChange}
                                    checked={data.hasAllergies === 'yes'}
                                />
                                Yes　有り
                            </label>
                            <label className="allergy-option" htmlFor="">
                                <input
                                    type="radio"
                                    name="hasAllergies"
                                    value="no"
                                    onChange={handleChange}
                                    checked={data.hasAllergies === 'no'}
                                />
                                No　無い
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="allergyDetails">
                        If yes, please provide details:
                    </label>
                    <br />
                    <textarea
                        name="allergyDetails"
                        id="allergyDetails"
                        onChange={handleChange}
                        value={data.allergyDetails}
                        cols="30"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <div className="button-wrapper allergy-button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!isFormComplete}
                >
                    Next
                </button>
            </div>
        </>
    );
}
