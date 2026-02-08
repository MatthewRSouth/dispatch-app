import { useState } from 'react';
import '../styles/buttons.css';
import '../styles/image-upload.css';

export default function ImageUpload({ onImageSelect, onNext, onPrevious }) {
    const [preview, setPreview] = useState(null);
    //create handle function
    const handleFileChange = (e) => {
        //make file variable
        const file = e.target.files[0];
        //if file is uploaded, display from memory usinng fake local url
        if (file) {
            //create url
            const objectUrl = URL.createObjectURL(file);
            //set state to url to preview it
            setPreview(objectUrl);
            //send actual file to backend
            if (onImageSelect) {
                onImageSelect(file);
            }
        }
    };

    const handleRemove = (e) => {
        //this function hanldes the case where they want to remove and add a new photo.
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
                        {/* visual preview */}
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

                    {/* remove button */}
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
