import '../styles/success.css';
import './Footer';

function Card({ image, title, description, alt }) {
    return (
        <div className="next-steps-content">
            <div className="card">
                <img src={image} alt={alt} />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function SuccessMessage({ onPrevious }) {
    return (
        <>
            <header className="header-container">
                <img src="" alt="" className="header-image" />
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
                <Card title="Payment"></Card>
                <Card title="Website"></Card>
            </div>
        </>
    );
}
