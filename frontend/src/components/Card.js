function Card({ children, onClick, className = "" }) {
    return (
        <div
            onClick={onClick}
            className={`card ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;
