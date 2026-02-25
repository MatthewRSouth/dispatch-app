export default function ParentAcknowledgement({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const isFormComplete =
        data.agreesToAcknowledgement === true &&
        data.signature?.length > 0 &&
        data.signDate?.length > 0;

    const today = new Date().toISOString().split('T')[0];
    return (
        <>
            <div>
                <div className="header-wrapper">
                    {' '}
                    <h1 className="main-header">
                        Parent Acknowledgement <br></br>保護者の承諾
                    </h1>
                </div>

                <div className="form-group">
                    {/* 1. The Legal Text (Read Only) - NOT inside a label */}
                    <div className="legal-text-box">
                        <p>
                            I understand and accept that under no circumstances
                            shall refunds be given. <br />
                            私は入会の申し込みに関して発生する費用は、返還されないことを理解し、同意します。
                        </p>
                        <p>
                            I understand and accept that under no circumstances
                            I shall receive refunds when the government forces
                            the school to close down for a certain period.{' '}
                            <br />
                            私は行政の指導や園の判断によって臨時休業になった際、授業が行われない期間の返金はいたしかねる旨を理解し、同意します。
                        </p>
                        <p>
                            I declare that the information given in this
                            application form is true and accurate <br />
                            私はこの入会申込書に記述した内容について事実と相違ないことを誓います。
                        </p>
                    </div>
                    {/* 2. The Interaction (Checkbox + Label) */}
                    <label className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            name="agreesToAcknowledgement"
                            checked={data.agreesToAcknowledgement}
                            onChange={handleChange}
                        />
                        <span className="checkbox-text">
                            I acknowledge above terms regarding refunds and
                            accuracy.
                            <br />{' '}
                            上記の内容（返金不可・事実確認）を承諾します。
                        </span>
                    </label>
                </div>
                <div className="form-group">
                    <p className="acknowledgement-legal-text">
                        署名に代えて氏名を入力することで、上記内容が事実である事を誓約します。
                    </p>
                    <label htmlFor="signature">
                        Parents Signature 保護者署名{' '}
                    </label>
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
                        min={today}
                        max={today}
                        value={data.signDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="button-wrapper">
                    {' '}
                    <button
                        className="previous-button button"
                        onClick={onPrevious}
                    >
                        戻る
                    </button>
                    <button
                        className="next-button button"
                        onClick={onNext}
                        disabled={!isFormComplete}
                    >
                        次へ
                    </button>
                </div>
            </div>
        </>
    );
}
