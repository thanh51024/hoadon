const Card = ({ children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
