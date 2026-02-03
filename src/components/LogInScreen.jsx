export default function LogInScreen({ onNext }) {
    return (
        <div className="login-container">
            <div className="login-image">
                <div className="image-overlay"></div>
            </div>
            <div className="login-form-section">
                <h2>sign-in</h2>
                <p className="login-instruction">
                    The username and password are provided on the sign-up forms.
                </p>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                />
            </div>
            <button className="login-button" onClick={onNext}>
                Log In
            </button>
        </div>
    );
}
