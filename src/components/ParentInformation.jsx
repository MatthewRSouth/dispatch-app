import { useState } from 'react';
import PageTitle from './reusable/PageTitle';
import PrevAndNextButtons from './reusable/PrevAndNextButtons';
import InputError from '../ui/InputError';

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
    const [fatherFuriganaError, setFatherFuriganaError] = useState('');
    const [motherFuriganaError, setMotherFuriganaError] = useState('');

    function handleLocalBlur(e) {
        //This function tells the user they are using the incorrect character type and returns the error.
        const { name, value } = e.target;

        const validateInput = (errorMessage, regex, setErrorFn) => {
            if (value === '') {
                setErrorFn('');
                return;
            }
            if (!regex.test(value)) {
                setErrorFn(errorMessage);
            } else {
                setErrorFn('');
            }
        };

        //Routes
        if (name === 'fatherPhoneNumber') {
            validateInput(
                '有効な電話番号を入力してください（0-9と-）',
                /^[0-9\-\s]+$/,
                setFatherPhoneError,
            );
        }
        if (name === 'motherPhoneNumber') {
            validateInput(
                '有効な電話番号を入力してください（0-9と-）',
                /^[0-9\-\s]+$/,
                setMotherPhoneError,
            );
        }
        if (name === 'fatherNameFurigana') {
            validateInput(
                'カタカナのみを入力ください',
                /^[ァ-ンヴー\s]+$/,
                setFatherFuriganaError,
            );
        }
        if (name === 'motherNameFurigana') {
            validateInput(
                'カタカナのみを入力ください',
                /^[ァ-ンヴー\s]+$/,
                setMotherFuriganaError,
            );
        }
        if (name === 'emailAddress') {
            validateInput(
                '有効なEメールを入力してください',
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                setEmailError,
            );
        }
    }

    function handleLocalChange(e) {
        // 1. Send data to global state
        handleChange(e);

        const { name, value } = e.target;

        //If the error is fixed, the error is cleared.
        const clearIfFixed = (activeError, regex, setErrorFn) => {
            if (activeError) {
                if (value === '' || regex.test(value)) {
                    setErrorFn('');
                }
            }
        };

        if (name === 'emailAddress') {
            clearIfFixed(
                emailError,
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                setEmailError,
            );
        }

        if (name === 'fatherPhoneNumber') {
            clearIfFixed(fatherPhoneError, /^[0-9\-\s]+$/, setFatherPhoneError);
        }

        if (name === 'motherPhoneNumber') {
            clearIfFixed(motherPhoneError, /^[0-9\-\s]+$/, setMotherPhoneError);
        }

        if (name === 'fatherNameFurigana') {
            clearIfFixed(
                fatherFuriganaError,
                /^[ァ-ンヴー\s]+$/,
                setFatherFuriganaError,
            );
        }

        if (name === 'motherNameFurigana') {
            clearIfFixed(
                motherFuriganaError,
                /^[ァ-ンヴー\s]+$/,
                setMotherFuriganaError,
            );
        }
    }

    const isFatherComplete =
        data.fatherNameFurigana?.length > 0 &&
        data.fatherNameKanji?.length > 0 &&
        data.fatherPhoneNumber?.length > 5 &&
        !fatherPhoneError &&
        !fatherFuriganaError;
    const isMotherComplete =
        data.motherNameFurigana?.length > 0 &&
        data.motherNameKanji?.length > 0 &&
        data.motherPhoneNumber?.length > 5 &&
        !motherPhoneError &&
        !motherFuriganaError;

    const isEmailComplete = data.emailAddress?.includes('@') && !emailError;
    const canProceed =
        (isFatherComplete || isMotherComplete) && isEmailComplete;

    return (
        <>
            <div className="form-wrapper">
                <PageTitle
                    description={`保護者情報は1名様分のみ必須となりますが
                    2名様分ご入力いただくことも可能です。`}
                >
                    Guardian Information <br />
                    保護者情報
                </PageTitle>
                <h4 className="sub-header">Guardian Information 保護者情報</h4>
                <div className="form-group">
                    <label htmlFor="fatherNameFurigana">フリガナ</label>
                    <input
                        autoComplete="off"
                        type="text"
                        id="fatherNameFurigana"
                        name="fatherNameFurigana"
                        value={data.fatherNameFurigana}
                        onChange={handleLocalChange}
                        onBlur={handleLocalBlur}
                        style={{
                            borderColor: fatherFuriganaError ? '#ff0f0f' : '',
                            backgroundColor: fatherFuriganaError
                                ? '#fee2e2'
                                : '',
                        }}
                        placeholder="例)　ヤマダ　タロウ"
                    />
                    {fatherFuriganaError && (
                        <InputError error={fatherFuriganaError}></InputError>
                    )}
                    <label htmlFor="fatherNameKanji">
                        漢字（漢字がない場合は英語）
                    </label>
                    <input
                        autoComplete="name"
                        type="text"
                        id="fatherNameKanji"
                        name="fatherNameKanji"
                        value={data.fatherNameKanji}
                        onChange={handleLocalChange}
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
                        onChange={handleLocalChange}
                        maxLength="14"
                        onBlur={handleLocalBlur}
                        style={{
                            borderColor: fatherPhoneError ? '#ff0f0f' : '',
                            backgroundColor: fatherPhoneError ? '#fee2e2' : '',
                        }}
                        placeholder="例）090-1234-5678"
                    />
                    {fatherPhoneError && (
                        <InputError error={fatherPhoneError}></InputError>
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
                        onChange={handleLocalChange}
                        onBlur={handleLocalBlur}
                        style={{
                            borderColor: motherFuriganaError ? '#ff0f0f' : '',
                            backgroundColor: motherFuriganaError
                                ? '#fee2e2'
                                : '',
                        }}
                        placeholder="例)　ヤマダ　ハナコ"
                    />
                    {motherFuriganaError && (
                        <InputError error={motherFuriganaError}></InputError>
                    )}
                    <label htmlFor="motherNameKanji">
                        漢字（漢字がない場合は英語）
                    </label>
                    <input
                        autoComplete="name"
                        type="text"
                        id="motherNameKanji"
                        name="motherNameKanji"
                        value={data.motherNameKanji}
                        onChange={handleLocalChange}
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
                        maxLength="14"
                        id="motherPhoneNumber"
                        name="motherPhoneNumber"
                        value={data.motherPhoneNumber}
                        onBlur={handleLocalBlur}
                        style={{
                            borderColor: motherPhoneError ? '#ff0f0f' : '',
                            backgroundColor: motherPhoneError ? '#fee2e2' : '',
                        }}
                        onChange={handleLocalChange}
                        placeholder="例）090-1234-5678"
                    />
                    {motherPhoneError && (
                        <InputError error={motherPhoneError}></InputError>
                    )}
                </div>{' '}
                <div className="form-group">
                    <h4 htmlFor="" className="sub-header">
                        Email Address Eメール <span className="required"></span>
                    </h4>
                    <input
                        type="email"
                        autoCapitalize="none"
                        name="emailAddress"
                        onBlur={handleLocalBlur}
                        value={data.emailAddress}
                        onChange={handleLocalChange}
                        placeholder="example@email.com"
                        style={{
                            borderColor: emailError ? '#ff0f0f' : '',
                            backgroundColor: emailError ? '#fee2e2' : '',
                        }}
                    />
                </div>
                {emailError && <InputError error={emailError}></InputError>}
            </div>

            <PrevAndNextButtons
                onNext={onNext}
                onPrevious={onPrevious}
                isFormComplete={canProceed}
            ></PrevAndNextButtons>
        </>
    );
}
