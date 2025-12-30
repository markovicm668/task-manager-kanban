function Input({ value, onChange, placeholder, type = "text" }) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ padding: "6px", marginRight: "6px" }}
        />
    );
}

export default Input;
