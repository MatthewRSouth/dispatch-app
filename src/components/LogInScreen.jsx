export default function LogInScreen({ data, handleChange, onNext }) {
    return (
        <div className="login-container">
            <div className="login-image">
                <div className="image-overlay"></div>
            </div>
            <div className="login-form-section">
                <p className="login-instruction">
                    The username and password are provided on the sign-up forms.
                </p>
            </div>
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
            <div className="login-button-container">
                {' '}
                <button className="login-button button" onClick={onNext}>
                    Login
                </button>
            </div>
        </div>
    );
}
