// InvoiceModal.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './InvoiceModal.css';

// Base64 encoded restaurant logo (simple text-based logo)
const DEFAULT_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTUwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9Ijc1IiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TaWduYXR1cmU8L3RleHQ+Cjx0ZXh0IHg9Ijc1IiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjRkZENzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SZXN0YXVyYW50PC90ZXh0Pgo8L3N2Zz4K';

const InvoiceModal = ({ order, onClose }) => {
    if (!order) return null;

    const downloadPDF = async () => {
        const invoiceElement = document.getElementById('invoice-content');
        if (!invoiceElement) return;

        try {
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.disabled = true;
                downloadBtn.textContent = "⏳ Generating PDF...";
            }

            // Use a simple approach without CORS
            const canvas = await html2canvas(invoiceElement, {
                scale: 2,
                useCORS: false, // Set to false for base64 images
                backgroundColor: '#ffffff',
                allowTaint: false,
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const margin = 15;
            const contentWidth = pdfWidth - 2 * margin;

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = imgWidth / imgHeight;

            let imgPDFWidth = contentWidth;
            let imgPDFHeight = contentWidth / ratio;

            if (imgPDFHeight > pdfHeight - 2 * margin) {
                imgPDFHeight = pdfHeight - 2 * margin;
                imgPDFWidth = imgPDFHeight * ratio;
            }

            const xPos = (pdfWidth - imgPDFWidth) / 2;
            const yPos = margin;

            pdf.addImage(imgData, 'PNG', xPos, yPos, imgPDFWidth, imgPDFHeight);
            pdf.save(`Invoice-${order.invoiceNumber}-${order.customerName}.pdf`);

            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.textContent = "📄 Download PDF";
            }

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('❌ Failed to generate PDF. Please try again.');
            const downloadBtn = document.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.textContent = "📄 Download PDF";
            }
        }
    };

    return (
        <div className="invoice-modal-overlay">
            <div className="invoice-modal-content" style={{
                backgroundColor: '#ffffff',
                color: '#000000'
            }}>
                <div id="invoice-content" className="invoice-pdf-content">
                    {/* Header */}
                    <div className="invoice-header">
                        <div className="brand-section">
                            <img
                                src={DEFAULT_LOGO}
                                alt="Signature Restaurant"
                                className="restaurant-logo"
                            />
                            <div className="brand-info">
                                <h1 className="restaurant-name">Signature</h1>
                                <p className="tagline">Where Taste Becomes Art</p>
                                <p className="website">www.signature.com</p>
                            </div>
                        </div>
                        <div className="invoice-meta">
                            <h2>INVOICE</h2>
                            <p><strong>Invoice No:</strong> {order.invoiceNumber}</p>
                            <p><strong>Date:</strong> {order.invoiceDate}</p>
                        </div>
                    </div>

                    {/* Restaurant Info */}
                    <div className="restaurant-info">
                        <p>123 Food Street, Gourmet City - 123456</p>
                        <p>Phone: +91 9876543210</p>
                        <p>GSTIN: 29ABCDE1234F1Z5</p>
                    </div>

                    {/* Rest of your content remains the same */}
                    <div className="details-grid">
                        <div className="customer-details">
                            <h3>Bill To:</h3>
                            <p><strong>{order.customerName}</strong></p>
                            <p>Contact: {order.customerContact}</p>
                            {order.customerAddress && <p>Address: {order.customerAddress}</p>}
                            {order.tableNo && <p>Table No: {order.tableNo}</p>}
                        </div>
                        <div className="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Server:</strong> {order.employeeName}</p>
                            <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                            <p><strong>Status:</strong> {order.paymentStatus}</p>
                        </div>
                    </div>

                    <div className="items-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.itemName || item.name}</td>
                                        <td>₹{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="invoice-totals">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>₹{(order.subtotal || 0).toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>Service Charge (5%):</span>
                            <span>₹{(order.serviceCharge || 0).toFixed(2)}</span>
                        </div>
                        <div className="total-row">
                            <span>GST (5%):</span>
                            <span>₹{(order.gst || 0).toFixed(2)}</span>
                        </div>
                        <div className="total-row grand-total">
                            <span><strong>Grand Total:</strong></span>
                            <span><strong>₹{(order.total || 0).toFixed(2)}</strong></span>
                        </div>
                    </div>

                    <div className="invoice-footer">
                        <div className="signature-section">
                            <div className="signature-line"></div>
                            <p>Authorized Signature</p>
                        </div>
                        <div className="thank-you">
                            <h3>Thank You for Dining With Us!</h3>
                            <p>Visit Again - www.signature.com</p>
                            <p className="tagline-footer">Where Taste Becomes Art</p>
                        </div>
                    </div>
                </div>

                <div className="invoice-actions">
                    <button onClick={downloadPDF} className="download-btn">
                        📄 Download PDF
                    </button>
                    <button onClick={onClose} className="close-btn">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;