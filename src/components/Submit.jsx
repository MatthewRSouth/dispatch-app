import { useState } from 'react';

// 1. Point to your new API route (Internal Server)
const SUBMIT_URL = '/api/submit';
//Helper: ReviewRow Component
function ReviewRow({ label, value }) {
    return (
        <div className="review-row">
            <span className="review-label">{label}</span>
            <span className="review-value">
                {' '}
                {value ? (
                    value
                ) : (
                    <span style={{ color: '#aaa', fontStyle: 'italic' }}>
                        Not Provided
                    </span>
                )}
            </span>
        </div>
    );
}

// Helper: Converts a file to a Base64 string
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
    });
};

export default function Submit({ data, onNext, onPrevious, onEdit }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            // STEP A: Convert the image (if one was uploaded)
            let base64Image = null;
            // check if childImage exists and is actually a File object
            if (data.childImage && data.childImage instanceof File) {
                base64Image = await convertToBase64(data.childImage);
            }

            const { childImage, ...rest } = data;
            const payload = {
                ...rest,
                image: base64Image, // Send the string, not the file object
            };

            // STEP C: Send to your Server
            const response = await fetch(SUBMIT_URL, {
                method: 'POST',
                // We REMOVED 'no-cors' so we can actually see if it succeeds!
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Server upload failed');
            }

            // If we get here, it worked!
            onNext();
        } catch (err) {
            console.error('Submission Error', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="review-wrapper">
                <div className="header-wrapper">
                    <h1 className="main-header">確認</h1>
                    <p>提出する前に、情報を確認してください</p>
                </div>

                <div className="review-card">
                    <div className="review-card-header">
                        <h2 className="card-header">保護者情報</h2>
                        <button
                            className="edit-button"
                            onClick={() => onEdit(3)}
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="保護者氏名 (フリガナ）"
                        value={data.fatherNameFurigana}
                    />
                    <ReviewRow
                        label="保護者氏名　（漢字）"
                        value={data.fatherNameKanji}
                    />
                    <ReviewRow
                        label="保護者電話番号"
                        value={data.fatherPhoneNumber}
                    />
                    <div className="review-spacer"></div>
                    <ReviewRow
                        label="保護者氏名 (フリガナ）"
                        value={data.motherNameFurigana}
                    />
                    <ReviewRow
                        label="保護者氏名　（漢字）"
                        value={data.motherNameKanji}
                    />
                    <ReviewRow
                        label="保護者電話番号"
                        value={data.motherPhoneNumber}
                    />
                    <div className="review-spacer"></div>
                    <ReviewRow label="Eメール" value={data.emailAddress} />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>写真</h2>
                        <button
                            onClick={() => onEdit(2)}
                            className="edit-button"
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="お子様の写真"
                        value={
                            data.childImage
                                ? '✅アップロード済'
                                : '❌アップロード未'
                        }
                    />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>連絡先</h2>
                        <button
                            onClick={() => onEdit(4)}
                            className="edit-button"
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="お子様の氏名"
                        value={data.childNameEnglish}
                    />
                    <ReviewRow label="住所" value={data.childAddress} />
                    <ReviewRow
                        label="緊急連絡先"
                        value={data.childContactNumber}
                    />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>お子様情報</h2>
                        <button
                            className="edit-button"
                            onClick={() => onEdit(5)}
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow label="性別" value={data.childSex} />
                    <ReviewRow label="生年月日" value={data.childDateOfBirth} />
                    <ReviewRow label="国籍" value={data.childNationality} />
                    <ReviewRow label="血液型" value={data.childBloodType} />
                    <ReviewRow label="コース回数" value={data.childCourse} />
                    <ReviewRow label="学校名" value={data.childSchool} />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>アレルギー</h2>
                        <button
                            onClick={() => onEdit(6)}
                            className="edit-button"
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow label="アレルギー" value={data.hasAllergies} />
                    <ReviewRow
                        label="アレルギー詳細"
                        value={data.allergyDetails}
                    />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>その他</h2>
                        <button
                            onClick={() => onEdit(7)}
                            className="edit-button"
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="その他"
                        value={data.additionalInformation}
                    />
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>保護者の承諾</h2>
                        <button
                            onClick={() => onEdit(8)}
                            className="edit-button"
                        >
                            編集 ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="承諾"
                        value={
                            data.agreesToAcknowledgement ? '✅ Yes' : '❌ No'
                        }
                    />
                    <ReviewRow label="署名" value={data.signature} />
                    <ReviewRow label="日付" value={data.signDate} />
                </div>
            </div>

            <div>
                {error && (
                    <p
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
            <div className="button-wrapper">
                {' '}
                <button onClick={onPrevious} className="previous-button button">
                    Previous
                </button>
                <button
                    className="form button submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                        backgroundColor: isSubmitting ? '#ccc' : '#6fc276',
                        color: 'white',
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </div>
        </>
    );
}
