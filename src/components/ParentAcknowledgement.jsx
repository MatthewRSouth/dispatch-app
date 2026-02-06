export default function ParentAcknoledgement({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <div>
            <h1>Parent Acknowledgement 保護者の承諾</h1>
            <div className="acknowledgement-checkbox-group">
                <label htmlFor="">
                    <p>
                        I understand and accept that under no circumstances
                        shall refunds be given. <br />
                        私は入学の申し込みに関して発生する費用は、返還されないことを理解します。
                        <br />
                        <br />
                        I understand and accept that under no circumstances I
                        shall receive refunds when the government forces the
                        school to close down for a certain period. <br />
                        私は役所の指示で休園する場合に関して授業料等の費用は、返還されないことを理解します。
                        <br /> <br /> I declare that the information given in
                        this application form is true and accurate <br />
                        私はこの入学願書に記述した内容について事実と相違ないことを誓います。
                    </p>
                    <input
                        type="checkbox"
                        name="agreesToAcknowledgement"
                        checked={data.agreesToAcknowledgement}
                        onChange={handleChange}
                    />{' '}
                    I acknowledge
                </label>
            </div>
            <div className="form-group">
                <p className="achknowledgement-legal-text">
                    By typing my name below, I electronically sign this
                    application and attest that all information provided is true
                    and accurate.
                </p>
                <label htmlFor="signature">Parents Signature 保護者署名 </label>
                <input
                    type="text"
                    id="signature"
                    name="signature"
                    value={data.signature}
                    onChange={handleChange}
                    placeholder="Type your full name here"
                />
            </div>
            <div className="form-group">
                <label htmlFor="signDate">
                    Date of Application 願書記入日{' '}
                </label>
                <input
                    type="date"
                    id="signDate"
                    name="signDate"
                    value={data.signDate}
                    onChange={handleChange}
                />
            </div>

            <div className="button-group">
                {' '}
                <button onClick={onPrevious}>Previous</button>
                <button onClick={onNext}>Next</button>
            </div>
        </div>
    );
}
