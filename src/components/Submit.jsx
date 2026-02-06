import { useState } from 'react';

// 1. Point to your new API route (Internal Server)
const SUBMIT_URL = '/api/submit';

// Helper: Converts a file to a Base64 string
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
    });
};

export default function Submit({ data, onNext, onPrevious }) {
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

    return (
        <div>
            <h1>Review and Submit</h1>
            <p>Please confirm all information is correct before submitting</p>
            <div className="summary-card">
                <div className="parent-summary">
                    <h2>Parent Information</h2>
                    <h3>Father Information</h3>
                    <p>{data.fatherNameFurigana}</p>
                    <p>{data.fatherNameKanji}</p>
                    <p>{data.fatherPhoneNumber}</p>

                    <h3>Mother Information</h3>
                    <p>{data.motherNameFurigana}</p>
                    <p>{data.motherNameKanji}</p>
                    <p>{data.motherPhoneNumber}</p>

                    <h3>Child Information</h3>
                    {/* Added logic to show "Image Uploaded" if a file exists */}
                    <p>
                        <strong>Photo:</strong>{' '}
                        {data.childImage ? '✅ Image Attached' : '❌ No Image'}
                    </p>
                    <p>{data.childNameEnglish}</p>
                    <p>{data.childNameFurigana}</p>
                    <p>{data.childNameKanji}</p>
                    <h4>Address</h4>
                    <p>{data.childAddress}</p>
                    <h4>Emergency Contact</h4>
                    <p>{data.childContactNumber}</p>
                    <p>Sex: {data.childSex}</p>
                    <p>Date of Birth: {data.childDateOfBirth}</p>
                    <p>Nationality: {data.childNationality}</p>
                    <p>Blood Type: {data.childBloodType}</p>

                    <h3>Allergy Information</h3>
                    <p>Allergies: {data.hasAllergies}</p>
                    <p>Details: {data.allergyDetails}</p>

                    <h3>Additional Information</h3>
                    <p>{data.additionalInformation}</p>

                    <h3>
                        Acknowledgement:{' '}
                        {data.agreesToAcknowledgement ? '✔️ Yes' : '❌ No'}
                    </h3>
                    <p>
                        I understand and accept that under no circumstances
                        shall refunds be given. <br />
                        私は入学の申し込みに関して発生する費用は、返還されないことを理解します。
                        <br />
                        <br />
                        I understand and accept that under no circumstances I
                        shall receive refunds when the government forces the
                        school to close down for a certain period. <br />
                        私は役所の指示で休園する場合に関して授業料等の費用は、返還されないことを理解します。
                        <br /> <br /> I declare that the information given in
                        this application form is true and accurate <br />
                        私はこの入学願書に記述した内容について事実と相違ないことを誓います。
                    </p>
                    <p className="achknowledgement-legal-text">
                        By typing my name below, I electronically sign this
                        application and attest that all information provided is
                        true and accurate.
                    </p>

                    <p>
                        <strong>Signature: {data.signature}</strong>
                    </p>
                    <p>
                        <strong>Date: {data.signDate}</strong>
                    </p>
                </div>

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
                <div className="button-wrapper">
                    {' '}
                    <button
                        onClick={onPrevious}
                        className="previous-button button"
                    >
                        Previous
                    </button>
                    <button
                        className="form button submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{
                            backgroundColor: isSubmitting ? '#ccc' : 'orange',
                            color: 'white',
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </div>
        </div>
    );
}
