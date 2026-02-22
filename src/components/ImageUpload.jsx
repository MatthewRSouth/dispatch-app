import { useState } from 'react';
import '../styles/buttons.css';
import '../styles/image-upload.css';
import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onImageSelect, onNext, onPrevious }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                // 1. Configure Compression
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1024,
                    useWebWorker: true,
                };

                // 2. Compress (Returns a Blob)
                const compressedBlob = await imageCompression(file, options);

                // ✅ 3. THE FIX: Convert Blob back to a proper File
                // We reuse the original file's name and type so the App doesn't get confused.
                const compressedFile = new File([compressedBlob], file.name, {
                    type: file.type,
                });

                // 4. Preview
                setPreview((prevUrl) => {
                    if (prevUrl) URL.revokeObjectURL(prevUrl);
                    return URL.createObjectURL(compressedFile);
                });

                // 5. Send the proper File object up
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
                <h1>写真のアップロード</h1>
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
                                    タップして<br></br>写真を選択下さい
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
            <div className="button-wrapper">
                <button className="previous-button button" onClick={onPrevious}>
                    戻る
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!preview}
                >
                    次へ
                </button>
            </div>
        </>
    );
}
