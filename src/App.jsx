import { useState } from 'react';
import Header from './components/Header';
import AdditionalInformation from './components/AdditionalInformation';
import Allergies from './components/Allergies';
import ChildPersonalInfoOne from './components/ChildPersonalInformationOne';
import ChildPersonalInfoTwo from './components/ChildPersonalInformationTwo';
import ImageUpload from './components/ImageUpload';
import LogInScreen from './components/LogInScreen';
import ParentAcknoledgement from './components/ParentAcknowledgement';
import ParentInformation from './components/ParentInformation';
import Submit from './components/Submit';
import SuccessMessage from './components/SuccessMessage';
import Footer from './components/Footer';

import './App.css';

function App() {
    //1. Current step/page state
    const [currentStep, setCurrentStep] = useState(1);

    //2. Master Data save
    const [formData, setFormData] = useState({
        parentName: '',
        childName: '',
    });

    //Helper function to advance
    const nextStep = () => setCurrentStep(currentStep + 1);
    const previousStep = () => setCurrentStep(currentStep - 1);

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    return (
        <div className="app-container">
            <Header />
            <main>
                {currentStep === 1 && <LogInScreen onNext={nextStep} />}
                {currentStep === 2 && (
                    <ImageUpload onNext={nextStep} onPrevious={previousStep} />
                )}
                {currentStep === 3 && (
                    <ParentInformation
                        data={formData}
                        handleChannge={handleInput}
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 4 && (
                    <ChildPersonalInfoOne
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 5 && (
                    <ChildPersonalInfoTwo
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 6 && (
                    <Allergies onNext={nextStep} onPrevious={previousStep} />
                )}
                {currentStep === 7 && (
                    <AdditionalInformation
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 8 && (
                    <ParentAcknoledgement
                        onNext={nextStep}
                        onPrevious={previousStep}
                    />
                )}
                {currentStep === 9 && (
                    <Submit onNext={nextStep} onPrevious={previousStep} />
                )}
                {currentStep === 10 && (
                    <SuccessMessage onPrevious={previousStep} />
                )}
            </main>
            <Footer />
        </div>
    );
}

export default App;
