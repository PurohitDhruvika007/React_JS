import React, { useState } from 'react'
import './Main_section.css'
import Data from '../../../Data.js'

export default function Main() {
    const [filtering, setFiltering] = useState(Data);
    const searching = (e) => {
        e.preventDefault()
        let ans = Data;
        if (order_id) {
            ans = ans.filter(product => product.order_id === order_id)

        }
        if (customer) {
            ans = ans.filter(product => product.customer.toLowerCase().includes(customer.toLowerCase()))
        }
        if (status) {
            ans = ans.filter(product => product.status.toLowerCase() === status.toLowerCase())
        }
        if (date) {
            const formattedDate = new Date(date).toLocaleDateString("en-US");
            ans = ans.filter(product => new Date(product.date).toLocaleDateString("en-US") === formattedDate);
        }

        if (product) {
            ans = ans.filter(pro => pro.product.toLowerCase().includes(product.toLowerCase()))
        }
        if (price) {
            ans = ans.filter(product => product.price == price)
        }
        setFiltering(ans)
    }
    const [order_id, setOrder_id] = useState("");
    const [price, setPrice] = useState("");
    const [customer, setCustomer] = useState("");
    const [product, setProduct] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    return (
        <div>
            <>
                <div className="search-section mb-4 ms-3">
                    <form className="row g-3">
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="Order ID" onChange={(e) => setOrder_id((e.target.value ? Number(e.target.value) : ""))} />
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="Customer" onChange={(e) => setCustomer((e.target.value))} />
                        </div>

                        <div className="col-md-2">
                            <select className="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                                <option value="">select</option>
                                <option value="new">New</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="col-12 text-end">
                            <div className="d-flex">
                                <div className="col-md-2 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input type="text" className="form-control" placeholder="Product" onChange={(e) => setProduct((e.target.value))} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary me-2" onClick={searching}>
                                Search
                            </button>
                            <button type="reset" className="btn btn-outline-secondary me-4" onClick={() => setFiltering(Data)}>
                                Clear Filters
                            </button>
                        </div>
                    </form>
                </div>
                {/* Table */}
                <div className="table-responsive">
                    <table className="table align-middle table-striped bg-white">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Payment</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtering.map((customer) => (
                                    <tr key={customer.order_id}>
                                        <td>{customer.order_id}</td>
                                        <td>{customer.date}</td>
                                        <td>{customer.customer}</td>
                                        <td>{customer.product}</td>
                                        <td>{customer.price}$</td>
                                        <td>{customer.payment}</td>
                                        <td>{customer.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>


        </div>
    )
}
