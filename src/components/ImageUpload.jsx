import { useState } from 'react';
import '../styles/buttons.css';
import '../styles/image-upload.css';
// ✅ 1. Import is already here, perfect.
import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onImageSelect, onNext, onPrevious }) {
    const [preview, setPreview] = useState(null);

    // ✅ 2. Make this function 'async' so we can wait for compression
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            // Show a "loading" state if you want, or just let it process (it's fast)
            console.log(`Original size: ${file.size / 1024 / 1024} MB`);

            try {
                // ✅ 3. Configure Compression (0.5MB limit, 1024px width)
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                // ✅ 4. Compress the file
                const compressedFile = await imageCompression(file, options);
                console.log(
                    `Compressed size: ${compressedFile.size / 1024 / 1024} MB`
                );

                // ✅ 5. Create Preview (using the small file saves memory!)
                const objectUrl = URL.createObjectURL(compressedFile);
                setPreview(objectUrl);

                // ✅ 6. Convert to Base64 String
                // We do this HERE so your 'formData' state gets the final text string,
                // ready to send to Vercel without crashing.
                const reader = new FileReader();
                reader.readAsDataURL(compressedFile);
                reader.onloadend = () => {
                    if (onImageSelect) {
                        // Pass the TEXT string, not the file object
                        onImageSelect(reader.result);
                    }
                };
            } catch (error) {
                console.error('Compression Error:', error);
            }
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();
        setPreview(null);
        if (onImageSelect) {
            onImageSelect(null);
        }
    };

    return (
        <>
            <div className="image-upload-wrapper">
                <h1>Image Uploader</h1>
                <div className="image-upload-container">
                    {/* The rest of your JSX is perfect, no changes needed below! */}
                    <label className="image-upload-box">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden-input"
                        />
                        {preview ? (
                            <img
                                src={preview}
                                alt="Child Preview"
                                className="image-preview"
                            />
                        ) : (
                            <div className="placeholder-content">
                                <span className="upload-icon">📸</span>
                                <p className="upload-text">
                                    {' '}
                                    Tap to upload a photo
                                </p>
                                <small className="upload-hint">
                                    Face clearly displayed
                                </small>
                            </div>
                        )}
                    </label>

                    {preview && (
                        <button className="remove-btn" onClick={handleRemove}>
                            Upload Again
                        </button>
                    )}
                </div>
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button className="next-button button" onClick={onNext}>
                    Next
                </button>
            </div>
        </>
    );
}
