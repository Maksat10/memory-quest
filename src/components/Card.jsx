import '../styles/Card.css';

function Card({ image, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={image} alt="Dog" className="card-image" />
        </div>
    );
}

export default Card;
