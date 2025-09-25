<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Orders Management Dashboard — README</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; line-height: 1.6; padding: 24px; color: #222; background: #f7f9fc; }
    .container { max-width: 900px; margin: 0 auto; background: #fff; padding: 28px; border-radius: 8px; box-shadow: 0 6px 18px rgba(15,23,42,0.06); }
    h1,h2,h3 { color: #111827; margin-top: 0; }
    pre { background:#0b1220; color:#d1fae5; padding:12px; border-radius:6px; overflow:auto; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace; }
    ul { margin-top: 0; }
    .tag { display:inline-block; background:#eef2ff; color:#0b3d91; padding:6px 10px; border-radius:999px; font-weight:600; margin-right:8px; margin-bottom:8px; }
    .strong { font-weight:700; }
  </style>
</head>
<body>
  <div class="container">
    <h1>&#128230; Orders Management Dashboard</h1>

    <p><strong class="strong">Orders Management Dashboard</strong> is a simple React-based web application that allows you to <strong>view, search, and filter orders</strong> efficiently. The UI uses Bootstrap for layout and custom CSS for styling.</p>

    <h2>🚀 Features</h2>
    <ul>
      <li><strong>Header Section:</strong> Displays the project title (<strong>Orders</strong>) and user info (avatar + name).</li>
      <li><strong>Tabs:</strong> Quick navigation for <strong>All Orders</strong>, <strong>New</strong>, <strong>Completed</strong>, <strong>Canceled</strong>, and <strong>Pending</strong> orders.</li>
      <li><strong>Search & Filters:</strong>
        <ul>
          <li>Search by <strong>Order ID</strong> or <strong>Customer Name</strong>.</li>
          <li>Filter by <strong>Status</strong> (New, Completed, Pending, Canceled).</li>
          <li>Filter by <strong>Date</strong> using the date picker (normalized to match dataset).</li>
          <li>Filter by <strong>Product</strong> name and <strong>Price</strong>.</li>
          <li><strong>Clear Filters</strong> button resets the table (and can be extended to reset inputs).</li>
        </ul>
      </li>
      <li><strong>Order Table:</strong> Responsive, striped Bootstrap table showing Order ID, Date, Customer, Product, Price, Payment status and Order status.</li>
    </ul>

    <h2>🛠️ Tech Stack</h2>
    <p>
      <span class="tag">React.js</span>
      <span class="tag">Bootstrap 5</span>
      <span class="tag">Custom CSS</span>
    </p>

    <h2>📂 Project Structure</h2>
    <pre><code>src/
│── components/
│   ├── Header.jsx
│   ├── Main_section.jsx
│── Data.js
│── App.js
│── index.js
│── styles/
│   ├── Header.css
│   ├── Main_section.css
</code></pre>

    <h2>⚙️ Installation &amp; Setup</h2>
    <p>To run locally:</p>
    <pre><code># Clone the repo
git clone https://github.com/your-username/orders-dashboard.git

 Navigate to project
### cd orders-dashboard

 Install dependencies
### npm install

 Start dev server
### npm start
</code></pre>
 <p>The app will be available at <strong>http://localhost:3000/</strong>.</p>
  
  <h2>🎥 video</h2>
  
  </div>
</body>
</html>
