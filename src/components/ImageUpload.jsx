import { useState } from 'react';
import '../styles/buttons.css';
import '../styles/image-upload.css';
import imageCompression from 'browser-image-compression';
import PageTitle from './reusable/PageTitle';
import PrevAndNextButtons from './reusable/PrevAndNextButtons';

export default function ImageUpload({ onImageSelect, onNext, onPrevious }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                const compressedBlob = await imageCompression(file, options);

                const compressedFile = new File([compressedBlob], file.name, {
                    type: file.type,
                });

                setPreview((prevUrl) => {
                    if (prevUrl) URL.revokeObjectURL(prevUrl);
                    return URL.createObjectURL(compressedFile);
                });

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
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
    };

    return (
        <>
            <div className="image-upload-wrapper">
                <PageTitle description="お子様の写真をアップロードしてください">
                    写真のアップロード
                </PageTitle>
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
                                    こちらにタップして<br></br>
                                    写真を選択下さい
                                </p>
                                <small className="upload-hint">
                                    顔がはっきり見える写真
                                </small>
                            </div>
                        )}
                    </label>

                    {/* Remove Button */}
                    {preview && (
                        <button className="remove-btn" onClick={handleRemove}>
                            再アップロード
                        </button>
                    )}
                </div>
            </div>
            <PrevAndNextButtons
                onNext={onNext}
                onPrevious={onPrevious}
                isFormComplete={preview}
            ></PrevAndNextButtons>
        </>
    );
}
