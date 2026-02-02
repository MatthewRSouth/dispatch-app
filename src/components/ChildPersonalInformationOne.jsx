export default function ChildPersonalInfoOne({ onNext, onPrevious }) {
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
                    placeholder="Yamda Taro"
                />
            </div>
            <div className="form-group">
                <label htmlFor="childNameFurigana">フリガナ </label>
                <input
                    type="text"
                    id="childNameFurigana"
                    name="childNameFurigana"
                    placeholder="ヤマダ　タロウ"
                />
            </div>
            <div className="form-group">
                <label htmlFor="childNameKanji">漢字 </label>
                <input
                    type="text"
                    id="childNameKanji"
                    name="childNameKanji"
                    placeholder="山田　太郎"
                />
            </div>
            <div className="form-group">
                <label htmlFor="childAddress">Home Address 住所 </label>
                <br />
                <textarea
                    type="text"
                    id="childAddress"
                    name="childAddress"
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
                    placeholder="例）090-1234-5678"
                />
            </div>
            <div className="button-group">
                {' '}
                <button onClick={onNext}>Next</button>
                <button onClick={onPrevious}>Previous</button>
            </div>
        </div>
    );
}
