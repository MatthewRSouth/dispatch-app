export default function Allergies({ data, handleChange, onNext, onPrevious }) {
    const isFormComplete =
        data.hasAllergies === 'なし' ||
        (data.hasAllergies === 'あり' && data.allergyDetails?.length > 0);
    return (
        <>
            <div className="form-wrapper">
                <div className="header-wrapper">
                    <h1 className="main-header">
                        Allergies　<br></br>アレルギー
                    </h1>
                </div>

                <div className="form-group">
                    <label htmlFor="">
                        Does your child have any allergies?
                    </label>
                    <label htmlFor="">アレルギーはありますか?</label>
                    <div className="radio-group">
                        <div className="radio-options">
                            <label className="allergy-option" htmlFor="">
                                <input
                                    type="radio"
                                    name="hasAllergies"
                                    value="あり"
                                    onChange={handleChange}
                                    checked={data.hasAllergies === 'あり'}
                                />
                                Yes　有り
                            </label>
                            <label className="allergy-option" htmlFor="">
                                <input
                                    type="radio"
                                    name="hasAllergies"
                                    value="なし"
                                    onChange={handleChange}
                                    checked={data.hasAllergies === 'なし'}
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
                    <label htmlFor="allergyDetails">
                        有りの方は詳細をご記入ください
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
        </>
    );
}
