export default function ParentInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const isFatherComplete =
        data.fatherNameFurigana?.length > 0 &&
        data.fatherNameKanji?.length > 0 &&
        data.fatherPhoneNumber?.length > 5;
    const isMotherComplete =
        data.motherNameFurigana?.length > 0 &&
        data.motherNameKanji?.length > 0 &&
        data.motherPhoneNumber?.length > 5;
    const isEmailComplete = data.emailAddress?.includes('@');
    const canProceed =
        (isFatherComplete || isMotherComplete) && isEmailComplete;
    return (
        <>
            <div className="form-wrapper">
                <div className="header-wrapper">
                    {' '}
                    <h1 className="main-header">
                        Guardian Information <br />
                        保護者情報
                    </h1>
                </div>
                <h4 className="sub-header">Guardian Information 保護者情報</h4>
                <div className="form-group">
                    <label htmlFor="fatherNameFurigana">フリガナ</label>
                    <input
                        autoComplete="off"
                        type="text"
                        id="fatherNameFurigana"
                        name="fatherNameFurigana"
                        value={data.fatherNameFurigana}
                        onChange={handleChange}
                        placeholder="例)　ヤマダ　タロウ"
                    />
                    <label htmlFor="fatherNameKanji">漢字</label>
                    <input
                        autoComplete="name"
                        type="text"
                        id="fatherNameKanji"
                        name="fatherNameKanji"
                        value={data.fatherNameKanji}
                        onChange={handleChange}
                        placeholder="例)　山田　太郎"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fatherPhoneNumber">
                        Cell Phone携帯電話
                    </label>
                    <input
                        autoComplete="tel"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]"
                        id="fatherPhoneNumber"
                        name="fatherPhoneNumber"
                        value={data.fatherPhoneNumber}
                        onChange={handleChange}
                        placeholder="例）090-1234-5678"
                    />
                </div>
                <h4 className="sub-header">Guardian Information 保護者情報</h4>
                <div className="form-group">
                    <label htmlFor="motherNameFurigana">フリガナ</label>
                    <input
                        autoComplete="off"
                        type="text"
                        id="motherNameFurigana"
                        name="motherNameFurigana"
                        value={data.motherNameFurigana}
                        onChange={handleChange}
                        placeholder="例)　ヤマダ　ハナコ"
                    />
                    <label htmlFor="motherNameKanji">漢字</label>
                    <input
                        autoComplete="name"
                        type="text"
                        id="motherNameKanji"
                        name="motherNameKanji"
                        value={data.motherNameKanji}
                        onChange={handleChange}
                        placeholder="例)　山田　花子"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="motherPhoneNumber">
                        Cell Phone携帯電話
                    </label>
                    <input
                        autoComplete="tel"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]"
                        id="motherPhoneNumber"
                        name="motherPhoneNumber"
                        value={data.motherPhoneNumber}
                        onChange={handleChange}
                        placeholder="例）090-1234-5678"
                    />
                </div>{' '}
                <div className="form-group">
                    <h4 htmlFor="" className="sub-header">
                        Email Address　Eメール{' '}
                        <span className="required"></span>
                    </h4>
                    <input
                        type="email"
                        autoCapitalize="none"
                        name="emailAddress"
                        value={data.emailAddress}
                        onChange={handleChange}
                        placeholder="example@email.com"
                    />
                </div>
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    戻る
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!canProceed}
                >
                    次へ
                </button>
            </div>
        </>
    );
}
