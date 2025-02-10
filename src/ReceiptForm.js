import { useState } from "react";
import { Input, Button, Card } from "./components/ui";
import "./formStyle.css";

const ReceiptForm = ({ onGenerate }) => {
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [amount, setAmount] = useState(500000);
  const [dates, setDates] = useState("");

  const handleSubmit = () => {
    if (!studentName || !className || !amount || !dates) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
    const attendanceDates = dates
      .split(" ") // Tách ngày theo dấu cách
      .map((date) => {
        let parts = date.trim().split("/");
        if (parts.length !== 2) {
          alert(
            `❌ Sai định dạng ngày: ${date}. Vui lòng nhập theo định dạng d/m`
          );
          return null;
        }

        let [day, month] = parts.map(Number);
        if (month > 12 || month < 1 || day < 1 || day > 31) {
          alert(`❌ Ngày không hợp lệ: ${date}`);
          return null;
        }

        return `${day}/${month}/${currentYear}`;
      })
      .filter(Boolean);

    const receipt = {
      studentName,
      className,
      amount,
      attendanceDates,
    };

    console.log("✅ Dữ liệu biên lai gửi đi:", receipt);
    onGenerate(receipt); // Gửi dữ liệu biên lai lên parent component
  };

  return (
    <Card>
      <h2>Nhập thông tin học phí</h2>
      <Input
        label="Họ tên học sinh:"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <Input
        label="Lớp:"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input
          label="Số tiền (VNĐ):"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button
          className="small-button"
          onClick={() => setAmount(amount + 100000)}
        >
          +100K
        </Button>
        <Button
          className="small-button"
          onClick={() => setAmount(Math.max(100000, amount - 100000))}
        >
          -100K
        </Button>
      </div>
      <Input
        className="wide-input" // Thêm class cho ô nhập ngày
        label="Ngày học (VD: 2/1 3/1 10/1 12/1):"
        value={dates}
        onChange={(e) => setDates(e.target.value)}
      />
      <Button onClick={handleSubmit}>Tạo Biên Lai</Button>
    </Card>
  );
};

export default ReceiptForm;
