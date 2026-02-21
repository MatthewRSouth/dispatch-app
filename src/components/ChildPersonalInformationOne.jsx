import { useState } from 'react';
export default function ChildPersonalInfoOne({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const [contactPhoneError, setContactPhoneError] = useState('');
    const handlePhoneBlur = (e) => {
        const { name, value } = e.target;

        if (!value) {
            if (name === 'childContactNumber') setContactPhoneError('');
            return;
        }

        const isValid = /^[0-9\-\s]+$/.test(value);
        const errorMessage = isValid
            ? ''
            : 'Please enter a valid phone number(0-9 and -)';
        if (name === 'childContactNumber') {
            setContactPhoneError(errorMessage);
        }
    };

    const childFormComplete =
        data.childNameEnglish?.length > 0 &&
        data.childNameFurigana?.length > 0 &&
        data.childNameKanji?.length > 0 &&
        data.childAddress?.length > 0 &&
        data.childContactNumber?.length > 8 &&
        !contactPhoneError;
    return (
        <div>
            <div className="header-wrapper">
                <h1>
                    Child Information<br></br> お子様情報
                </h1>
            </div>

            <div className="form-group">
                <h4 className="sub-header">Child’s Name お子様の氏名　</h4>
                <label htmlFor="childNameEnglish">英語表記 </label>
                <input
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
                    type="text"
                    id="childNameKanji"
                    name="childNameKanji"
                    value={data.childNameKanji}
                    onChange={handleChange}
                    placeholder="山田　太郎"
                />
            </div>
            <div className="form-group">
                <h4 className="sub-header">
                    Address and Contact Number <br></br> 　住所と緊急連絡番号
                </h4>
                <label htmlFor="childAddress">Address 住所 </label>
                <br />
                <textarea
                    autoComplete="street-address"
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
                    onBlur={handlePhoneBlur}
                    style={{ borderColor: contactPhoneError ? 'red' : '' }}
                    placeholder="例）090-1234-5678"
                />
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!childFormComplete}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
