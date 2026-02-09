export default function ParentInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <>
            <div className="form-wrapper">
                <div className="header-wrapper">
                    {' '}
                    <h1 className="main-header">
                        Parent/Guardian Information <br />
                        ご両親の内容
                    </h1>
                </div>

                <h4 className="sub-header">Father’s Information 父親の情報</h4>
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
                        id="fatherPhoneNumber"
                        name="fatherPhoneNumber"
                        value={data.fatherPhoneNumber}
                        onChange={handleChange}
                        placeholder="例）090-1234-5678"
                    />
                </div>
                <h4 className="sub-header">Mother’s Information 母親の情報</h4>
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
                        id="motherPhoneNumber"
                        name="motherPhoneNumber"
                        value={data.motherPhoneNumber}
                        onChange={handleChange}
                        placeholder="例）090-1234-5678"
                    />
                </div>
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
        </>
    );
}
