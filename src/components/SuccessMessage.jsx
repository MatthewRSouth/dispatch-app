import '../styles/success.css';
import '..//styles/variables.css';
import './Footer';

function Card({ image, title, description, alt }) {
    return (
        <div className="next-steps-content">
            <div className="card">
                <img src={image} alt={alt} className="card-image" />
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
}

export default function SuccessMessage({ onPrevious }) {
    return (
        <>
            <header className="header-container">
                <img
                    src="src/assets/check-circle-svgrepo-com (2).svg"
                    alt=""
                    className="header-image"
                />
                <h1 className="header-text">Submission Succesful</h1>
                <hr className="header-line" />
            </header>
            <div className="next-steps-container">
                <h2>Please follow these next steps</h2>
                <Card
                    alt="Line QR Code"
                    title="Line"
                    description="Please follow us on Line so we can give you the most up-to-date information"
                ></Card>
                <Card
                    image="src/assets/yen-circle-svgrepo-com.svg"
                    title="Payment"
                    description="Please make your payment at this bank"
                ></Card>
                <Card
                    image="src/assets/hoshida-dispatch-qr-code.png"
                    alt="website qr code"
                    title="Website"
                    description="Please see our website for any other information you need."
                ></Card>
            </div>
        </>
    );
}
