import { useState } from "react";
import ReceiptForm from "./ReceiptForm";
import ReceiptGenerator from "./ReceiptGenerator";

function App() {
  const [receiptData, setReceiptData] = useState(null);

  const handleGenerate = (data) => {
    setReceiptData(data); // Cập nhật dữ liệu biên lai
  };

  const handleReset = () => {
    setReceiptData(null); // Reset dữ liệu biên lai, form vẫn hiển thị
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      {/* Form luôn hiển thị */}
      <ReceiptForm onGenerate={handleGenerate} />

      {/* Hiển thị biên lai nếu có dữ liệu */}
      {receiptData && (
        <ReceiptGenerator data={receiptData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
