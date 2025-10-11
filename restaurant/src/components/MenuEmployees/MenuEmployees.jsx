import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { addOrder } from '../../slices/OrderSlice';

export default function MenuEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [loadingMenu, setLoadingMenu] = useState(true);
    const [search, setSearch] = useState(""); // <-- Search state

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await axios.get('http://localhost:3000/menu');
                setMenu(res.data);
            } catch (err) {
                console.error('Error fetching menu:', err);
            } finally {
                setLoadingMenu(false);
            }
        };
        fetchMenu();
    }, []);

    const handleAdd = (item) => {
        setOrderItems(prevItems => {
            const existing = prevItems.find(i => i.itemId === item.itemId);
            if (existing) {
                return prevItems.map(i =>
                    i.itemId === item.itemId ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemove = (itemId) => {
        setOrderItems(prevItems => prevItems.filter(i => i.itemId !== itemId));
    };

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const gst = orderItems.reduce((sum, i) => sum + i.price * i.quantity * (i.taxRate || 0), 0);
    const discount = subtotal * 0.1;
    const total = subtotal + gst - discount;

    const handlePlaceOrder = async () => {
        if (orderItems.length === 0) return alert("Please add at least one item!");

        const order = {
            items: orderItems,
            subtotal,
            gst,
            discount,
            total,
            date: new Date().toLocaleString(),
            paymentMethod: "Cash",
            status: "Pending"
        };

        try {
            const res = await axios.post('http://localhost:3000/orders', order);
            dispatch(addOrder(res.data));
            setOrderItems([]);
            alert('Order placed successfully!');
            navigate('/employee-dashboard/order-employees');
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order.');
        }
    };

    if (loadingMenu) return <p>Loading menu...</p>;

    // Filtered menu based on search
    const filteredMenu = menu.filter(item =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {/* Menu */}
            <div style={{ flex: 7 }}>
                <h2>Menu</h2>

                {/* 🔍 Search Bar */}
                <input
                    type="text"
                    placeholder="Search item by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginBottom: '15px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {filteredMenu.length > 0 ? (
                        filteredMenu.map(item => (
                            <div
                                key={item.itemId}
                                style={{
                                    border: '1px solid #ccc',
                                    margin: '10px',
                                    padding: '10px',
                                    width: '220px'
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.itemName}
                                    style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <h4>{item.itemName}</h4>
                                <p><strong>Category:</strong> {item.category}</p>
                                <p><strong>Price:</strong> ₹{item.price}</p>
                                <button onClick={() => handleAdd(item)}>Add</button>
                            </div>
                        ))
                    ) : (
                        <p>No items found for “{search}”.</p>
                    )}
                </div>
            </div>

            {/* Order summary */}
            <div style={{ flex: 3, marginLeft: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Current Order</h3>
                <div>
                    {orderItems.map(i => (
                        <div
                            key={i.itemId}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '5px'
                            }}
                        >
                            <img
                                src={i.image}
                                alt={i.itemName}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    marginRight: '10px'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <strong>{i.itemName}</strong>
                                <p>Qty: {i.quantity}</p>
                                <p>₹{i.price} x {i.quantity} = ₹{(i.price * i.quantity).toFixed(2)}</p>
                            </div>
                            <button onClick={() => handleRemove(i.itemId)}>Remove</button>
                        </div>
                    ))}
                </div>
                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>GST: ₹{gst.toFixed(2)}</p>
                <p>Discount: ₹{discount.toFixed(2)}</p>
                <h4>Total: ₹{total.toFixed(2)}</h4>
                <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
}
