import { useEffect } from 'react';
import './Add_to_cart.css';
import Navbar from '../Navbar/Navbar';

export default function Add_to_cart({ cart, setCarts }) {
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) ?? [];
        if (savedCart.length > 0) setCarts(savedCart);
    }, [setCarts]);

    const increaseQty = (id) => {
        setCarts(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCarts(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    // Re-calculate total dynamically
    const TotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


    const removeItem = (id) => {
        setCarts(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="cart-page">
            <Navbar />
            <h1 className='cart-heading'>Your Cart List</h1>
            {cart.length === 0 ? (
                <p className="empty-cart">No items in your cart 😔</p>
            ) : (
                <div className="cart-container">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-card">
                            <img src={item.image} alt={item.title} className="cart-image" />
                            <div className="cart-info">
                                <h2 className="cart-title">{item.title}</h2>
                                <p className="cart-price">Price: ${item.price}</p>
                                <div className="cart-quantity">
                                    <button onClick={() => decreaseQty(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQty(item.id)}>+</button>
                                </div>
                                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <h2>Total Amount: ${TotalAmount.toFixed(2)}</h2>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}
