import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import AdditionalInformation from './components/AdditionalInformation';
import Allergies from './components/Allergies';
import ChildPersonalInfoOne from './components/ChildPersonalInformationOne';
import ChildPersonalInfoTwo from './components/ChildPersonalInformationTwo';
import ImageUpload from './components/ImageUpload';
import LogInScreen from './components/LogInScreen';
import ParentAcknowledgement from './components/ParentAcknowledgement';
import ParentInformation from './components/ParentInformation';
import Submit from './components/Submit';
import SuccessMessage from './components/SuccessMessage';
import UserContract from './components/UserContract';
import Footer from './components/Footer';

import './App.css';
import './styles/variables.css';
import './styles/forms.css';
import './styles/layouts.css';
import './styles/login.css';
import './styles/buttons.css';

function App() {
    //1. Current step/page state
    const [currentStep, setCurrentStep] = useState(() => {
        if (typeof window !== 'undefined') {
            const isRegistered = localStorage.getItem('hoshidaRegistered');
            // If they submitted, lock them to step 11 (SuccessMessage)
            return isRegistered ? 11 : 1;
        }
        return 1;
    });
    const [isEditMode, setIsEditMode] = useState(false);

    //2. Master Data save
    const [formData, setFormData] = useState({
        // Step 1: Login
        username: '',
        password: '',

        //Step 2: image upload
        childImage: null,

        // Step 3: Parent Information
        fatherNameFurigana: '',
        fatherNameKanji: '',
        fatherPhoneNumber: '',
        motherNameFurigana: '',
        motherNameKanji: '',
        motherPhoneNumber: '',

        emailAddress: '',

        // Step 4: Child Personal Info One
        childNameEnglish: '',
        childNameFurigana: '',
        childNameKanji: '',
        childAddress: '',
        childContactNumber: '',

        // Step 5: Child Personal Info Two
        childSex: '',
        childDateOfBirth: '',
        childNationality: '',
        childBloodType: '',
        childSchool: '',
        childCourse: '',
        joinMonth: '',
        joinYear: '',

        // Step 6: Allergies
        hasAllergies: '',
        allergyDetails: '',

        // Step 7: Additional Info
        additionalInformation: '',

        // Step 8: Acknowledgement
        agreesToAcknowledgement: false, // Checkbox defaults to boolean
        signature: '',
        signDate: '',
        //Step 9: Contract Acknowledgement
        agreesToContract: false,
    });

    const SUBMIT_STEP = 11;
    function nextStep() {
        if (isEditMode) {
            setCurrentStep(SUBMIT_STEP);
            setIsEditMode(false);
        } else {
            setCurrentStep((next) => next + 1);
        }
    }

    function previousStep() {
        if (isEditMode) setIsEditMode(false);
        setCurrentStep((prev) => prev - 1);
    }
    const edit = (step) => {
        setCurrentStep(step);
        setIsEditMode(true);
    };

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    return (
        <div className="app-container">
            <Header />
            <main>
                {currentStep === 1 && (
                    <LogInScreen
                        onNext={nextStep}
                        data={formData}
                        handleChange={handleInput}
                    />
                )}
                {currentStep === 2 && (
                    <ImageUpload
                        onImageSelect={(file) =>
                            setFormData((prev) => ({
                                ...prev,
                                childImage: file,
                            }))
                        }
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 3 && (
                    <ParentInformation
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 4 && (
                    <ChildPersonalInfoOne
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 5 && (
                    <ChildPersonalInfoTwo
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 6 && (
                    <Allergies
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 7 && (
                    <AdditionalInformation
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 8 && (
                    <ParentAcknowledgement
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 9 && (
                    <UserContract
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                        onEdit={edit}
                    />
                )}
                {currentStep === 10 && (
                    <Submit
                        data={formData}
                        handleChange={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                        onEdit={edit}
                    />
                )}
                {currentStep === 11 && (
                    <SuccessMessage onPrevious={previousStep} />
                )}
            </main>
            <Footer />
            <Analytics />
        </div>
    );
}

export default App;
