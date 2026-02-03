export default function Allergies({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Allergies</h1>
            <div className="form-group">
                <label htmlFor="">Does your child have any allergies?</label>
                <div className="allergies-radio-group">
                    <label htmlFor="">
                        <input type="radio" name="hasAllergies" value="yes" />
                        Yes　有り
                    </label>
                    <label htmlFor="">
                        <input type="radio" name="hasAllergies" value="no" />
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
                    cols="30"
                    rows="4"
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
