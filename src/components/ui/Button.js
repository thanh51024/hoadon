const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ padding: "10px", marginTop: "10px", cursor: "pointer" }}
    >
      {children}
    </button>
  );
};

export default Button;
