import PageTitle from './reusable/PageTitle';
import PrevAndNextButtons from './reusable/PrevAndNextButtons';
export default function AdditionalInformation({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <div>
            <PageTitle>
                Additional Information<br></br>その他
            </PageTitle>
            <div className="form-group">
                <label htmlFor="AdditionalInformation">
                    連絡事項があれば記載ください
                </label>{' '}
                <br />
                <textarea
                    name="additionalInformation"
                    id="additionalInformation"
                    value={data.additionalInformation}
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                ></textarea>
            </div>

            <PrevAndNextButtons
                onNext={onNext}
                onPrevious={onPrevious}
                isFormComplete={true}
            ></PrevAndNextButtons>
        </div>
    );
}
