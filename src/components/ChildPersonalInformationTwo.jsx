export default function ChildPersonalInfoTwo({
    data,
    handleChange,
    onNext,
    onPrevious,
}) {
    const today = new Date().toISOString().split('T')[0];
    const isValidDOB = data.childDateOfBirth && data.childDateOfBirth <= today;

    const isFormComplete =
        data.childSex?.length > 0 &&
        isValidDOB &&
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
                        <h4 className="sub-header sex-label">Sex 性別</h4>
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
                        max={today}
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

                <div className="form-group join-time-wrapper">
                    <label htmlFor="joinMonth">
                        Join Month　<br></br>入会希望月
                    </label>
                    <select
                        name="joinMonth"
                        id="joinMonth"
                        value={data.joinMonth}
                        onChange={handleChange}
                    >
                        <option value="">--Select--</option>
                        <option value="１月">１月</option>
                        <option value="2月">2月</option>
                        <option value="3月">3月</option>
                        <option value="4月">4月</option>
                        <option value="5月">5月</option>
                        <option value="6月">6月</option>
                        <option value="7月">7月</option>
                        <option value="8月">8月</option>
                        <option value="9月">9月</option>
                        <option value="10月">10月</option>
                        <option value="11月">11月</option>
                        <option value="12月">12月</option>
                    </select>
                    <label htmlFor="joinYear">年</label>
                    <input
                        type="text"
                        name="joinYear"
                        value={data.joinYear}
                        onChange={handleChange}
                    />
                </div>
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
