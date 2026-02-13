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
                    <span style={{ color: '#aaa', fontStyle: 'Italic' }}>
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

    // Note: You had 'isLoading' and 'isSubmitting'. I combined them to keep it simple.

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

            // STEP B: Prepare the data
            // We separate the heavy 'file' object from the text data
            const payload = {
                ...data,
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
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    //Helper component:

    return (
        <>
            <div className="review-wrapper">
                <div className="header-wrapper">
                    <h1 className="main-header">Review and Submit</h1>
                    <p>
                        Please confirm all information is correct before
                        submitting
                    </p>
                </div>

                <div className="review-card">
                    <div className="review-card-header">
                        <h2 className="card-header">Parent Information</h2>
                        <button
                            className="edit-button"
                            onClick={() => onEdit(3)}
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Father (Furigana)"
                        value={data.fatherNameFurigana}
                    ></ReviewRow>
                    <ReviewRow
                        label="Father Kanji"
                        value={data.fatherNameKanji}
                    ></ReviewRow>
                    <ReviewRow
                        label="Father Phone Number"
                        value={data.fatherPhoneNumber}
                    ></ReviewRow>
                    <div className="review-spacer"></div>
                    <ReviewRow
                        label="Mother (Furigana)"
                        value={data.motherNameFurigana}
                    ></ReviewRow>
                    <ReviewRow
                        label="Mother Kanji"
                        value={data.motherNameKanji}
                    ></ReviewRow>
                    <ReviewRow
                        label="Mother Phone Number"
                        value={data.motherPhoneNumber}
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Picture</h2>
                        <button
                            onClick={() => onEdit(2)}
                            className="edit-button"
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Child Photo"
                        value={
                            data.childImage ? '✅Uploaded' : '❌Not Uploaded'
                        }
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Child Information one</h2>
                        <button
                            onClick={() => onEdit(4)}
                            className="edit-button"
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Child Name"
                        value={data.childNameEnglish}
                    ></ReviewRow>
                    <ReviewRow
                        label="Address"
                        value={data.childAddress}
                    ></ReviewRow>
                    <ReviewRow
                        label="Contact Number"
                        value={data.childContactNumber}
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Child Information Two</h2>
                        <button
                            className="edit-button"
                            onClick={() => onEdit(5)}
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Child Sex"
                        value={data.childSex}
                    ></ReviewRow>
                    <ReviewRow
                        label="Date of Birth"
                        value={data.childDateOfBirth}
                    ></ReviewRow>
                    <ReviewRow
                        label="Nationality"
                        value={data.childNationality}
                    ></ReviewRow>
                    <ReviewRow
                        label="Blood Type"
                        value={data.childBloodType}
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Allergy Information</h2>
                        <button
                            onClick={() => onEdit(6)}
                            className="edit-button"
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Allergies"
                        value={data.hasAllergies}
                    ></ReviewRow>
                    <ReviewRow
                        label="Allergie Details"
                        value={data.allergyDetails}
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Additional Information</h2>
                        <button
                            onClick={() => onEdit(7)}
                            className="edit-button"
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Additional information"
                        value={data.additionalInformation}
                    ></ReviewRow>
                </div>
                <div className="review-card">
                    <div className="review-card-header">
                        <h2>Acknowledgement</h2>
                        <button
                            onClick={() => onEdit(8)}
                            className="edit-button"
                        >
                            Edit ✏️
                        </button>
                    </div>
                    <ReviewRow
                        label="Acknowledged"
                        value={
                            data.agreesToAcknowledgement ? '✅ Yes' : '❌ No'
                        }
                    ></ReviewRow>
                    <ReviewRow
                        label="Siganture"
                        value={data.signature}
                    ></ReviewRow>
                    <ReviewRow label="Date" value={data.signDate}></ReviewRow>
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
