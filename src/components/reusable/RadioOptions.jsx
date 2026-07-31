function RadioOptions({
    className,
    children,
    name,
    value,
    checked,
    handleChange,
}) {
    return (
        <label className={className}>
            <input
                type="radio"
                name={name}
                value={value}
                onChange={handleChange}
                checked={checked}
            />
            {children}
        </label>
    );
}

export default RadioOptions;
