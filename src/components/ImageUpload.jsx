import { useState } from 'react';
import '../styles/buttons.css';
import '../styles/image-upload.css';
import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onImageSelect, onNext, onPrevious }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log(`Original size: ${file.size / 1024 / 1024} MB`);

            try {
                // 1. Configure Compression Settings
                const options = {
                    maxSizeMB: 0.5, // Max size ~500KB
                    maxWidthOrHeight: 1024, // Max width 1024px
                    useWebWorker: true, // Run in background
                };

                // 2. Compress the file
                const compressedFile = await imageCompression(file, options);
                console.log(
                    `Compressed size: ${compressedFile.size / 1024 / 1024} MB`
                );

                // 3. Create a preview URL (visual only)
                const objectUrl = URL.createObjectURL(compressedFile);
                setPreview(objectUrl);

                // 4. ✅ SEND THE FILE ITSELF (Not text!)
                if (onImageSelect) {
                    onImageSelect(compressedFile);
                }
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
                    <label className="image-upload-box">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden-input"
                        />

                        {/* Preview Logic */}
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
                                    Tap to upload a photo
                                </p>
                                <small className="upload-hint">
                                    Face clearly displayed
                                </small>
                            </div>
                        )}
                    </label>

                    {/* Remove Button */}
                    {preview && (
                        <button className="remove-btn" onClick={handleRemove}>
                            Upload Again
                        </button>
                    )}
                </div>
            </div>
            <div className="button-wrapper">
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
