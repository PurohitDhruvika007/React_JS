import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InvoiceModal({ order, onClose }) {
    const invoiceRef = useRef();

    if (!order) return null;

    const { id, customerName, items, invoiceDate, subtotal, serviceCharge, gst, total } = order;

    const downloadPDF = async () => {
        const element = invoiceRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${id}.pdf`);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "10px",
                    width: "420px",
                    maxHeight: "90%",
                    overflowY: "auto",
                    position: "relative",
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12px",
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                    }}
                >
                    ❌
                </button>

                {/* Invoice content */}
                <div
                    ref={invoiceRef}
                    style={{
                        padding: "0 20px",
                        width: "100%",
                    }}
                >
                    <h2 style={{ textAlign: "center", marginBottom: "5px" }}>🍴 My Restaurant</h2>
                    <p style={{ textAlign: "center", margin: "0 0 10px 0", fontSize: "10px" }}>Receipt</p>
                    <hr />
                    <p><strong>Receipt ID:</strong> {id}</p>
                    <p><strong>Customer:</strong> {customerName}</p>
                    <p><strong>Date:</strong> {invoiceDate}</p>
                    <hr />

                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #000" }}>
                                <th style={{ textAlign: "left" }}>Item</th>
                                <th style={{ textAlign: "center" }}>Qty</th>
                                <th style={{ textAlign: "right" }}>Price</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx} style={{ borderBottom: "1px dotted #999" }}>
                                    <td>{item.itemName || item.name}</td>
                                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                                    <td style={{ textAlign: "right" }}>₹{item.price}</td>
                                    <td style={{ textAlign: "right" }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <hr style={{ margin: "10px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Service Charge (5%):</span> <span>₹{serviceCharge.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>GST (5%):</span> <span>₹{gst.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "14px" }}>
                        <span>Total:</span> <span>₹{total.toFixed(2)}</span>
                    </div>
                    <p style={{ textAlign: "center", marginTop: "15px", fontSize: "10px" }}>Thank you for dining with us!</p>
                </div>

                {/* Download PDF button */}
                <button
                    onClick={downloadPDF}
                    style={{
                        marginTop: "1rem",
                        width: "100%",
                        padding: "0.5rem",
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
}
