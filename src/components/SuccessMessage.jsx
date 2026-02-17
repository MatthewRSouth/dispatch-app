import '../styles/success.css';
import './Footer';
import successMark from '../assets/check-circle-svgrepo-com (2).svg';
import yenMark from '../assets/yen-circle-svgrepo-com.svg';
import websiteQrCode from '../assets/hoshida-dispatch-qr-code.png';

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
                    src={successMark}
                    alt="success check mark"
                    className="header-image"
                />
                <h1 className="header-text">Submission Successful</h1>
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
                    image={yenMark}
                    title="Payment"
                    description="Bank transfer details have been sent to your email."
                ></Card>
                <Card
                    image={websiteQrCode}
                    alt="website qr code"
                    title="Website"
                    description="Please see our website for any other information you need."
                ></Card>
            </div>
        </>
    );
}
