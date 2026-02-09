export default function ChildPersonalInfoTwo({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    return (
        <div>
            <div className="form-wrapper">
                <h1 className="main-header">
                    Child Information
                    <br></br> お子様の内容
                </h1>
                <div className="form-group">
                    <div className="radio-group">
                        {' '}
                        <h4 className="sub-header">Sex 性別：</h4>
                        <div className="radio-options">
                            <label htmlFor="childSexMale">Male 男 </label>
                            <input
                                type="radio"
                                id="childSexMale"
                                name="childSex"
                                value="male"
                                onChange={handleChange}
                                checked={data.childSex === 'male'}
                            />
                            <label htmlFor="childSexFemale">Female 女 </label>
                            <input
                                type="radio"
                                id="childSexFemale"
                                name="childSex"
                                value="female"
                                onChange={handleChange}
                                checked={data.childSex === 'female'}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="childDateOfBirth">
                        Date of Birth 生年月日:{' '}
                    </label>
                    <input
                        type="date"
                        id="childDateOfBirth"
                        name="childDateOfBirth"
                        value={data.childDateOfBirth}
                        onChange={handleChange}
                        min="2010-01-01"
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="childNationality">Nationality 国籍: </label>
                    <input
                        type="text"
                        value={data.childNationality}
                        onChange={handleChange}
                        name="childNationality"
                        id="childNationality"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="childBloodType">Blood Type 血液型 </label>
                    <select
                        name="childBloodType"
                        id="childBloodType"
                        value={data.childBloodType}
                        onChange={handleChange}
                    >
                        <option value="">-- Select --</option>
                        <option value="A">A型</option>
                        <option value="B">B型</option>
                        <option value="O">O型</option>
                        <option value="AB">AB型</option>
                        <option value="Unknown">Unknown わからない</option>
                    </select>
                </div>
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button className="next-button button" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
