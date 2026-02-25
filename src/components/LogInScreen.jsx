import { useState } from 'react';

const SUBMIT_URL = '/api/verify';

export default function LogInScreen({ data, handleChange, onNext, skipToEnd }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLoginVerification = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const payload = {
                ...data,
                username: data.username,
                password: data.password,
            };

            const response = await fetch(SUBMIT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || 'Unauthorized Username and Password'
                );
            }

            setIsSuccess(true);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            onNext();
        } catch (error) {
            console.error('Login Error', error);
            setError(
                'ユーザーネームまたはパスワード間違いています。恐れ入りますがやり直してください'
            );
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="login-container">
            <div className="login-image">
                <div className="image-overlay"></div>
            </div>
            <form className="login-form-section">
                <p className="login-title">
                    入会申込書<br></br>ログイン
                </p>
                <p className="login-instruction">
                    <strong>
                        ユーザーネームとパスワードは、星田 インターナショナル
                        の担当者がお伝えします。
                    </strong>
                </p>
                <div className="form-group">
                    <label className="label" htmlFor="username">
                        ユーザーネーム{' '}
                    </label>
                    <input
                        autoCapitalize="none"
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                    />
                </div>
                <div className="form-group">
                    <label className="label" htmlFor="password">
                        パスワード{' '}
                    </label>
                    <input
                        autoCapitalize="none"
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </div>{' '}
                <div className="login-error">
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
            </form>

            <div className="login-button-container">
                {' '}
                <button
                    className="login-button button"
                    onClick={handleLoginVerification}
                    disabled={isLoading || isSuccess}
                    style={{
                        backgroundColor: isSuccess
                            ? '#4caf50'
                            : isLoading
                            ? '#ccc'
                            : 'orange',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    {isSuccess ? '成功!' : isLoading ? '確認' : 'ログイン'}
                </button>
            </div>
        </div>
    );
}
