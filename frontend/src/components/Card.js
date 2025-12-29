function Card({ children, onClick }) {
    return <div
        onClick={onClick}
        style={{
            border: "1px solid #ccc", padding: "10px"
        }}
    >
        {children}
    </div>;
}

export default Card;
