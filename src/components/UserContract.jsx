import { contractData } from '../data/contractData';
import '../styles/userContract.css';
import '../styles/forms.css';
import PrevAndNextButtons from './reusable/PrevAndNextButtons';

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
                <p className="top-paragraph">
                    本規約は、Hoshida International
                    Dispatch（以下「当園」といいます。）の利用規約です。登録会員のお子様（以下「お子様」）には、その保護者が事前に本規約に定める内容を承諾の上、入会のお申し込みを頂いております。入会申込書を提出された時点で、お子様およびその保護者は本規約に同意されたものと見なされます。
                </p>
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
                                                ),
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
            <PrevAndNextButtons
                onNext={onNext}
                onPrevious={onPrevious}
                isFormComplete={isFormComplete}
            ></PrevAndNextButtons>
        </div>
    );
}
