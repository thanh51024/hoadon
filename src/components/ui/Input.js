const Input = ({ label, type = "text", value, onChange }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ marginLeft: "5px" }}
      />
    </div>
  );
};

export default Input;
