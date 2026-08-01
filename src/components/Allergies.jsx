import RadioOptions from './reusable/RadioOptions';
import PageTitle from './reusable/PageTitle';
import PrevAndNextButtons from './reusable/PrevAndNextButtons';

export default function Allergies({ data, handleChange, onNext, onPrevious }) {
    const isFormComplete =
        data.hasAllergies === 'なし' ||
        (data.hasAllergies === 'あり' && data.allergyDetails?.length > 0);
    return (
        <>
            <div className="form-wrapper">
                <PageTitle description="">
                    Allergies<br></br>アレルギー
                </PageTitle>

                <div className="form-group allergy-container">
                    <label>Does your child have any allergies?</label>
                    <label>アレルギーはありますか?</label>

                    <div className="radio-group">
                        <div className="radio-options">
                            <RadioOptions
                                className="allergy-option"
                                name="hasAllergies"
                                value="あり"
                                handleChange={handleChange}
                                checked={data.hasAllergies === 'あり'}
                            >
                                Yes 有り
                            </RadioOptions>
                            <RadioOptions
                                className="allergy-option"
                                name="hasAllergies"
                                value="なし"
                                handleChange={handleChange}
                                checked={data.hasAllergies === 'なし'}
                            >
                                No 無し
                            </RadioOptions>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="allergyDetails">
                        If yes, please provide details:
                    </label>
                    <label htmlFor="allergyDetails">
                        有りの方は詳細をご記入ください
                    </label>
                    <br />
                    <textarea
                        name="allergyDetails"
                        id="allergyDetails"
                        onChange={handleChange}
                        value={data.allergyDetails}
                        cols="30"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <PrevAndNextButtons
                onNext={onNext}
                onPrevious={onPrevious}
                isFormComplete={isFormComplete}
            ></PrevAndNextButtons>
        </>
    );
}
