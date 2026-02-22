import { use } from 'react';
import { useState } from 'react';

export default function ParentInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    //Phone Number
    const [fatherPhoneError, setFatherPhoneError] = useState('');
    const [motherPhoneError, setMotherPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailBlur = (e) => {
        const value = e.target.value;

        if (!value) {
            setEmailError('');
            return;
        }

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (!isValid) {
            setEmailError('有効なEメールを入力してください');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneBlur = (e) => {
        const { name, value } = e.target;

        if (!value) {
            if (name === 'fatherPhoneNumber') setFatherPhoneError('');
            if (name === 'motherPhoneNumber') setMotherPhoneError('');
            return;
        }

        const isValid = /^[0-9\-\s]+$/.test(value);
        const errorMessage = isValid
            ? ''
            : '有効な電話番号を入力してください（0-9と-）';
        if (name === 'fatherPhoneNumber') {
            setFatherPhoneError(errorMessage);
        } else if (name === 'motherPhoneNumber') {
            setMotherPhoneError(errorMessage);
        }
    };

    const isFatherComplete =
        data.fatherNameFurigana?.length > 0 &&
        data.fatherNameKanji?.length > 0 &&
        data.fatherPhoneNumber?.length > 5 &&
        !fatherPhoneError;
    const isMotherComplete =
        data.motherNameFurigana?.length > 0 &&
        data.motherNameKanji?.length > 0 &&
        data.motherPhoneNumber?.length > 5 &&
        !motherPhoneError;
    const isEmailComplete = data.emailAddress?.includes('@') && !emailError;
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
                        maxLength="15"
                        onBlur={handlePhoneBlur}
                        style={{
                            borderColor: fatherPhoneError ? '#ff0f0f' : '',
                            backgroundColor: fatherPhoneError ? '#fee2e2' : '',
                        }}
                        placeholder="例）090-1234-5678"
                    />
                    {fatherPhoneError && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '90%',
                            }}
                        >
                            {' '}
                            <span
                                style={{
                                    color: 'red',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {fatherPhoneError}
                            </span>{' '}
                        </div>
                    )}
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
                        maxLength="15"
                        id="motherPhoneNumber"
                        name="motherPhoneNumber"
                        value={data.motherPhoneNumber}
                        onBlur={handlePhoneBlur}
                        style={{
                            borderColor: motherPhoneError ? '#ff0f0f' : '',
                            backgroundColor: motherPhoneError ? '#fee2e2' : '',
                        }}
                        onChange={handleChange}
                        placeholder="例）090-1234-5678"
                    />
                    {motherPhoneError && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '90%',
                            }}
                        >
                            {' '}
                            <span
                                style={{
                                    color: 'red',
                                    fontSize: '0.8rem',
                                }}
                            >
                                {motherPhoneError}
                            </span>{' '}
                        </div>
                    )}
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
                        onBlur={handleEmailBlur}
                        value={data.emailAddress}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        style={{
                            borderColor: emailError ? '#ff0f0f' : '',
                            backgroundColor: emailError ? '#fee2e2' : '',
                        }}
                    />
                </div>
                {emailError && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '90%',
                        }}
                    >
                        {' '}
                        <span
                            style={{
                                color: 'red',
                                fontSize: '0.8rem',
                            }}
                        >
                            {emailError}
                        </span>{' '}
                    </div>
                )}
            </div>

            <div className="button-wrapper">
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
