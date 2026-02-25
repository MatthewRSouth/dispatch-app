import { useState } from 'react';
export default function ChildPersonalInfoOne({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const [contactPhoneError, setContactPhoneError] = useState('');
    const [englishNameError, setEnglishNameError] = useState('');
    const [furiganaNameError, setFuriganaNameError] = useState('');

    const handleEnglishNameBlur = (e) => {
        const value = e.target.value;

        if (!value) {
            setEnglishNameError('');
            return;
        }

        const isValid = /^[a-zA-Z\s]+$/.test(value);

        if (!isValid) {
            setEnglishNameError('英語文字のみを入力してください');
        } else {
            setEnglishNameError('');
        }
    };

    const handleFuriganaBlur = (e) => {
        const value = e.target.value;
        if (!value) {
            setFuriganaNameError('');
            return;
        }

        const isValid = /^[ァ-ンヴー\s]+$/.test(value);
        if (!isValid) {
            setFuriganaNameError('カタカナのみを入力してください');
        } else {
            setFuriganaNameError('');
        }
    };

    const handlePhoneBlur = (e) => {
        const { name, value } = e.target;

        if (!value) {
            if (name === 'childContactNumber') setContactPhoneError('');
            return;
        }

        const isValid = /^[0-9\-\s]+$/.test(value);
        const errorMessage = isValid
            ? ''
            : '有効な電話番号を入力してください（0-9と-）';
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
        !contactPhoneError &&
        !englishNameError &&
        !furiganaNameError;

    function handleLocalChange(e) {
        handleChange(e);

        const { name, value } = e.target;

        //English Name Check
        if (name === 'childNameEnglish' && englishNameError) {
            if (value === '') {
                setEnglishNameError('');
            } else {
                const isValid = /^[a-zA-Z\s]+$/.test(value);
                if (isValid) setEnglishNameError('');
            }
        }
        //Furigana Check
        if (name === 'childNameFurigana' && furiganaNameError) {
            if (value === '') {
                setFuriganaNameError('');
            } else {
                const isValid = /^[ァ-ンヴー\s]+$/;
                if (isValid) setFuriganaNameError('');
            }
        }

        //Contact Check
        if (name === 'childContactNumber' && contactPhoneError) {
            if (value === '') {
                setEnglishNameError('');
            } else {
                const isValid = /^[0-9\-\s]+$/.test(value);
                if (isValid) setContactPhoneError('');
            }
        }
    }

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
                    onBlur={handleEnglishNameBlur}
                    style={{
                        borderColor: englishNameError ? '#ff0f0f' : '',
                        backgroundColor: englishNameError ? '#fee2e2' : '',
                    }}
                    onChange={handleLocalChange}
                    placeholder="Yamada Taro"
                />
            </div>
            {englishNameError && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        marginTop: '0',
                    }}
                >
                    {' '}
                    <span
                        style={{
                            color: 'red',
                            fontSize: '0.8rem',
                        }}
                    >
                        {englishNameError}
                    </span>{' '}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="childNameFurigana">フリガナ </label>
                <input
                    autoComplete="off"
                    type="text"
                    id="childNameFurigana"
                    name="childNameFurigana"
                    value={data.childNameFurigana}
                    onBlur={handleFuriganaBlur}
                    onChange={handleLocalChange}
                    placeholder="ヤマダ　タロウ"
                />
            </div>
            {furiganaNameError && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        width: '100%',
                        marginTop: '0',
                    }}
                >
                    {' '}
                    <span
                        style={{
                            color: 'red',
                            fontSize: '0.8rem',
                        }}
                    >
                        {furiganaNameError}
                    </span>{' '}
                </div>
            )}
            <div className="form-group">
                <label htmlFor="childNameKanji">
                    漢字（漢字がない場合は英語）
                </label>
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
                <h4 className="sub-header address-contact">
                    Address and<br></br> Contact Number <br></br>{' '}
                    　住所と緊急連絡番号
                </h4>
                <label className="no-margin-label" htmlFor="childAddress">
                    Address 住所{' '}
                </label>
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
                <label className="no-margin-label" htmlFor="childContactNumber">
                    Contact Number 緊急連絡番号
                </label>{' '}
                <br />
                <input
                    type="tel"
                    id="childContactNumber"
                    name="childContactNumber"
                    value={data.childContactNumber}
                    onChange={handleLocalChange}
                    onBlur={handlePhoneBlur}
                    maxLength="14"
                    style={{
                        borderColor: contactPhoneError ? '#ff0f0f' : '',
                        backgroundColor: contactPhoneError ? '#fee2e2' : '',
                    }}
                    placeholder="例）090-1234-5678"
                />
                {contactPhoneError && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            marginTop: '0',
                        }}
                    >
                        {' '}
                        <span
                            style={{
                                color: 'red',
                                fontSize: '0.8rem',
                            }}
                        >
                            {contactPhoneError}
                        </span>{' '}
                    </div>
                )}
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    戻る
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!childFormComplete}
                >
                    次へ
                </button>
            </div>
        </div>
    );
}
