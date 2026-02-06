export default function ChildPersonalInfoOne({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <div>
            <h1>Child Information お子様の内容</h1>
            <h4>Child’s Name お子様のお名前　</h4>
            <div className="form-group">
                <label htmlFor="childNameEnglish">英語表記 </label>
                <input
                    type="text"
                    id="childNameEnglish"
                    name="childNameEnglish"
                    value={data.childNameEnglish}
                    onChange={handleChange}
                    placeholder="Yamada Taro"
                />
            </div>
            <div className="form-group">
                <label htmlFor="childNameFurigana">フリガナ </label>
                <input
                    type="text"
                    id="childNameFurigana"
                    name="childNameFurigana"
                    value={data.childNameFurigana}
                    onChange={handleChange}
                    placeholder="ヤマダ　タロウ"
                />
            </div>
            <div className="form-group">
                <label htmlFor="childNameKanji">漢字 </label>
                <input
                    type="text"
                    id="childNameKanji"
                    name="childNameKanji"
                    value={data.childNameKanji}
                    onChange={handleChange}
                    placeholder="山田　太郎"
                />
            </div>
            <div className="form-group">
                <h4>Address and Contact Number 　住所と緊急連絡番号</h4>
                <label htmlFor="childAddress">Address 住所 </label>
                <br />
                <textarea
                    type="text"
                    id="childAddress"
                    name="childAddress"
                    value={data.childAddress}
                    onChange={handleChange}
                    rows={4}
                    placeholder="00-0001 東京都千代田区千代田1-1-1 "
                ></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="childContactNumber">
                    Contact Number 緊急連絡番号
                </label>{' '}
                <br />
                <input
                    type="tel"
                    id="childContactNumber"
                    name="childContactNumber"
                    value={data.childContactNumber}
                    onChange={handleChange}
                    placeholder="例）090-1234-5678"
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
