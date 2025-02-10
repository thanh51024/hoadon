import { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { Card, Button } from "./components/ui";

const ReceiptGenerator = ({ data, onReset }) => {
  const receiptRef = useRef(null);
  const [sortedDates, setSortedDates] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Hàm nhận dữ liệu từ ReceiptForm
  useEffect(() => {
    if (data && data.attendanceDates.length > 0) {
      // Chuyển chuỗi ngày sang đối tượng Date, kèm giữ lại chuỗi gốc
      const datesWithObj = data.attendanceDates.map((dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return {
          original: dateStr,
          dateObj: new Date(year, month - 1, day),
        };
      });

      // Sắp xếp theo thời gian
      const sortedDatesArray = datesWithObj
        .sort((a, b) => a.dateObj - b.dateObj)
        .map((item) => item.original);

      setSortedDates(sortedDatesArray);
      setTotalSessions(sortedDatesArray.length);
      setStartDate(sortedDatesArray[0]);
      setEndDate(sortedDatesArray[sortedDatesArray.length - 1]);
    }
  }, [data]);

  const downloadReceipt = () => {
    if (!receiptRef.current || !data) {
      alert("⚠ Vui lòng nhập thông tin biên lai trước khi tải xuống!");
      return;
    }

    const firstDate = new Date(startDate.split("/").reverse().join("-"));
    const monthYear = `${firstDate.getMonth() + 1}-${firstDate.getFullYear()}`;
    const fileName = `${data.studentName}_Thu_học_phí_tháng_${monthYear}.png`;

    setTimeout(() => {
      htmlToImage
        .toPng(receiptRef.current)
        .then((dataUrl) => {
          download(dataUrl, fileName);
        })
        .catch((error) => {
          console.error("❌ Lỗi khi tạo ảnh:", error);
          alert("Không thể tạo ảnh hóa đơn. Vui lòng thử lại!");
        });
    }, 500);
  };

  return (
    <div>
      <Card>
        <div
          ref={receiptRef}
          style={{
            textAlign: "left",
            padding: "20px",
            paddingRight: "20px",
            backgroundColor: "white",
            width: "525px",
            border: "1px solid #ccc",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: "1.5rem",
            }}
          >
            BIÊN LAI THU TIỀN
          </h2>
          <p>
            <strong>Học sinh:</strong> {data.studentName}
          </p>
          <p>
            <strong>Lớp:</strong> {data.className}
          </p>
          <p>
            <strong>Số tiền:</strong> {data.amount} đ
          </p>
          <p>
            <strong>Nội dung:</strong> Thu học phí {totalSessions} buổi từ{" "}
            {startDate} đến {endDate}
          </p>

          <h3 style={{ marginTop: "10px" }}>Bảng điểm danh</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Ngày
                </th>
                <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDates.map((date, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px" }}>{date}</td>
                  <td style={{ padding: "8px" }}>Có học</td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <div
            style={{ textAlign: "center", marginTop: "20px", margin: "0 auto" }}
          >
            <h4>Quét mã để thanh toán</h4>
            <img
              src="/img/qr.png"
              alt="QR Code"
              style={{ width: "100px", height: "100px" }}
            />
            <p>Vietcombank</p>
            <p>Số tài khoản: 1020102766</p>
            <p>Chủ tài khoản: Nguyen Hue Thien</p>
          </div>
        </div>

        <Button onClick={downloadReceipt}>Tải Biên Lai</Button>
        <Button onClick={onReset}>Tạo Biên Lai Mới</Button>
      </Card>
    </div>
  );
};

export default ReceiptGenerator;
