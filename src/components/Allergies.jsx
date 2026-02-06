export default function Allergies({ data, handleChange, onNext, onPrevious }) {
    return (
        <div>
            <h1>Allergies</h1>
            <div className="form-group">
                <label htmlFor="">Does your child have any allergies?</label>
                <div className="allergies-radio-group">
                    <label htmlFor="">
                        <input
                            type="radio"
                            name="hasAllergies"
                            value="yes"
                            onChange={handleChange}
                            checked={data.hasAllergies === 'yes'}
                        />
                        Yes　有り
                    </label>
                    <label htmlFor="">
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
            <div className="button-group">
                {' '}
                <button onClick={onPrevious}>Previous</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    );
}
