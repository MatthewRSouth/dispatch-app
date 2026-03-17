import { contractData } from '../data/contractData';
import '../styles/userContract.css';
import '../styles/forms.css';

export default function UserContract({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const isFormComplete = data.agreesToContract === true;
    return (
        <div>
            <div className="header-wrapper">
                <h1 className="main-header">利用規約(課外)</h1>
            </div>

            <div className="contract-container">
                {contractData.map((section) => (
                    <div key={section.id} className="contract-section">
                        <h3>{section.title}</h3>
                        <ol className="rules-list">
                            {section.rules.map((rule, index) => (
                                <li key={index} className="rule-item">
                                    <p style={{ whiteSpace: 'pre-line' }}>
                                        {rule.text}
                                    </p>
                                    {rule.subrules && (
                                        <ol className="subrules-list">
                                            {rule.subrules.map(
                                                (subrule, subIndex) => (
                                                    <li key={subIndex}>
                                                        {subrule}
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
            <div className="agreement-wrapper">
                {/* 2. The Interaction (Checkbox + Label) */}
                <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        name="agreesToContract"
                        checked={data.agreesToContract}
                        onChange={handleChange}
                    />
                    <span className="checkbox-text">
                        I acknowledge the above terms of agreement
                        <br /> 上記の利用規約を承諾します。
                    </span>
                </label>
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    戻る
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!isFormComplete}
                >
                    次へ
                </button>
            </div>
        </div>
    );
}
