export default function ChildPersonalInfoTwo({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const isFormComplete =
        data.childSex?.length > 0 &&
        data.childDateOfBirth?.length > 0 &&
        data.childNationality?.length > 0 &&
        data.childBloodType?.length > 0 &&
        data.childSchool?.length > 0 &&
        data.childCourse?.length > 0;
    return (
        <div>
            <div className="form-wrapper">
                <h1 className="main-header">
                    Child Information
                    <br></br> お子様情報
                </h1>
                <div className="form-group">
                    <div className="radio-group">
                        {' '}
                        <h4 className="sub-header">Sex 性別：</h4>
                        <div className="radio-options child-gender-options">
                            <label htmlFor="childSexMale">Male 男 </label>
                            <input
                                type="radio"
                                id="childSexMale"
                                name="childSex"
                                value="男子"
                                onChange={handleChange}
                                checked={data.childSex === '男子'}
                            />
                            <label htmlFor="childSexFemale">Female 女 </label>
                            <input
                                type="radio"
                                id="childSexFemale"
                                name="childSex"
                                value="女子"
                                onChange={handleChange}
                                checked={data.childSex === '女子'}
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
                        <option value="Unknown　不明">Unknown 不明</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="childSchool">School Name 学校名 </label>
                    <input
                        type="text"
                        value={data.childSchool}
                        onChange={handleChange}
                        name="childSchool"
                        id="childSchool"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="childCourse">Course コース </label>
                    <select
                        name="childCourse"
                        id="childCourse"
                        value={data.childCourse}
                        onChange={handleChange}
                    >
                        <option value="">-- Select --</option>
                        <option value="40回">40回</option>
                        <option value="60回">60回</option>
                        <option value="80回">80回</option>
                    </select>
                </div>
            </div>
            <div className="button-wrapper">
                {' '}
                <button className="previous-button button" onClick={onPrevious}>
                    Previous
                </button>
                <button
                    className="next-button button"
                    onClick={onNext}
                    disabled={!isFormComplete}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
