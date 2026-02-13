import { useState } from 'react';

const SUBMIT_URL = '/api/verify';

export default function LogInScreen({ data, handleChange, onNext }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLoginVerfication = async (e) => {
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
            setError('Something went wrong. Please try again.');
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
                <p className="login-instruction">
                    The username and password are provided on the sign-up forms.
                </p>

                <div className="form-group">
                    <label className="label" htmlFor="username">
                        Username{' '}
                    </label>
                    <input
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
                        Password{' '}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-input"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </div>
            </form>
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
            <div className="login-button-container">
                {' '}
                <button
                    className="login-button button"
                    onClick={handleLoginVerfication}
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
                    {isSuccess
                        ? 'Success! Redirecting...'
                        : isLoading
                        ? 'Verifying'
                        : 'Login'}
                </button>
            </div>
        </div>
    );
}
