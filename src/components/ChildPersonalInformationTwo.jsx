export default function ChildPersonalInfoTwo({ onNext, onPrevious }) {
    return (
        <div>
            <div>
                <h1>Child Information お子様の内容</h1>
                <div className="form-group">
                    <h4></h4>
                    <label htmlFor="childSexMale">Sex 性別: Male 男 </label>
                    <input type="radio" id="childSex" name="childSex" />
                    <label htmlFor="childSexFemale">Female　女 </label>
                    <input type="radio" id="childSex" name="childSex" />
                </div>
                <div className="form-group">
                    <label htmlFor="childDateOfBirth">
                        Date of Birth 生年月日:{' '}
                    </label>
                    <input
                        type="date"
                        id="childDateOfBirth"
                        name="childDateOfBirth"
                        min="2010-01-01"
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="childNationality">Nationality 国籍: </label>
                    <input
                        type="text"
                        name="childNationality"
                        id="childNationality"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="childBloodType">Blood Type 血液型 </label>
                    <select name="childBloodType" id="childBloodType">
                        <option value="">-- Select --</option>
                        <option value="A">A型</option>
                        <option value="B">B型</option>
                        <option value="O">O型</option>
                        <option value="AB">AB型</option>
                        <option value="Unknown">Unknown わからない</option>
                    </select>
                </div>
            </div>
            <div className="button-group">
                {' '}
                <button onClick={onNext}>Next</button>
                <button onClick={onPrevious}>Previous</button>
            </div>
        </div>
    );
}
