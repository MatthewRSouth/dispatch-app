export default function ParentInformation({ onNext, onPrevious }) {
    return (
        <div>
            <h1>Parent/Guardian Information ご両親の内容</h1>
            <h4>Father’s Information 父親の情報</h4>
            <div className="form-group">
                <label htmlFor="fatherNameFurigana">フリガナ</label>
                <input
                    type="text"
                    id="fatherNameFurigana"
                    name="fatherNameFurigana"
                    placeholder="例)　ヤマダ　タロウ"
                />
                <label htmlFor="fatherNameKanji">漢字</label>
                <input
                    type="text"
                    id="fatherNameKanji"
                    name="fatherNameKanji"
                    placeholder="例)　山田　太郎"
                />
            </div>
            <div className="form-group">
                <label htmlFor="fatherPhoneNumber">Cell Phone携帯電話</label>
                <input
                    type="tel"
                    id="fatherPhoneNumber"
                    name="fatherPhoneNumber"
                    placeholder="例）090-1234-5678"
                />
            </div>
            <h4>Mother’s Information 母親の情報</h4>
            <div className="form-group">
                <label htmlFor="motherNameFurigana">フリガナ</label>
                <input
                    type="text"
                    id="motherNameFurigana"
                    name="motherNameFurigana"
                    placeholder="例)　ヤマダ　ハナコ"
                />
                <label htmlFor="motherNameKanji">漢字</label>
                <input
                    type="text"
                    id="motherNameKanji"
                    name="motherNameKanji"
                    placeholder="例)　山田　花子"
                />
            </div>
            <div className="form-group">
                <label htmlFor="motherPhoneNumber">Cell Phone携帯電話</label>
                <input
                    type="tel"
                    id="motherPhoneNumber"
                    name="motherPhoneNumber"
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
