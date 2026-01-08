function Input({ value, onChange, placeholder, type = "text", className = "" }) {
    return (
        <input
            className={`input ${className}`}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
        />
    );
}

export default Input;
