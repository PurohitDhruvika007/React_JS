import React, { useState } from 'react'
import './Main_section.css'
import Data from '../../../Data.js'

export default function Main() {
    const [filtering, setFiltering] = useState(Data);
    const searching = (e) => {
        e.preventDefault()
        if (order_id) {
            let ans = filtering.filter(product => product.order_id === order_id)
            setFiltering(ans)
        }
    }
    const [order_id, setOrder_id] = useState("");
    return (
        <div>
            <>
                <div className="search-section mb-4">
                    <form className="row g-3">
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="Order ID" onChange={(e) => setOrder_id((e.target.value ? Number(e.target.value) : ""))} />
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="Customer" />
                        </div>

                        <div className="col-md-2">
                            <select className="form-select">
                                <option>Status</option>
                                <option>New</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Canceled</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-12 text-end">
                            <div className="d-flex">
                                <div className="col-md-2 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <input type="text" className="form-control" placeholder="Product" />
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
                                        <td>{customer.price}</td>
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
