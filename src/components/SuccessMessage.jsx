import '../styles/success.css';
import './Footer';
import successMark from '../assets/check-circle-svgrepo-com (2).svg';
import yenMark from '../assets/yen-circle-svgrepo-com.svg';
import websiteQrCode from '../assets/hoshida-dispatch-qr-code.png';
import lineQrCode from '../assets/hoshida-dispatch-line-QR.JPG';
import LogInScreen from './LogInScreen';

function Card({ image, title, description, number, alt }) {
    return (
        <div className="next-steps-content">
            <div className="card">
                <div className="imageAndNumberContainer">
                    {' '}
                    <span className="card-number">{number}</span>
                    <img src={image} alt={alt} className="card-image" />
                </div>

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
                <h1 className="header-text">送信完了</h1>
                <p className="header-description header-text">
                    手続きに10分ほどお時間<br></br>
                    をいただきます。折り返し<br></br>メールをお送りします。
                    <br></br>
                    <br></br>
                    <strong>下にある情報もご一読ください.</strong>
                </p>
                <hr className="header-line" />
            </header>
            <div className="next-steps-container">
                <h2>今後の流れについて</h2>
                <Card
                    number={'1'}
                    image={lineQrCode}
                    alt="Line QR Code"
                    title="Line 登録"
                    description="LINE登録後は、お子様の氏名をフルネームで送ってください。今後のお問い合わせはLINEをご利用下さい"
                ></Card>
                <Card
                    number={'2'}
                    image={yenMark}
                    title="支払い"
                    description="お支払い方法は、ご登録いただいたメールアドレスにお送りしました。"
                ></Card>
                <Card
                    number={3}
                    image={websiteQrCode}
                    alt="website qr code"
                    title="ウェブサイト"
                    description="ウェブサイトをご覧ください。"
                ></Card>
            </div>
        </>
    );
}
