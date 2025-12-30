function Button({ children, onClick, disabled = false }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: "6px 12px",
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {children}
        </button>
    );
}

export default Button;
