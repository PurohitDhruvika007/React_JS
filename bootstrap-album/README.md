<h1>📰 React News Album</h1>

<p>
  This project is a <strong>React-based News Application</strong> that fetches and displays live headlines from the 
  <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">NewsAPI</a>. 
  It demonstrates API integration in React, state management with hooks, and a responsive UI using <strong>Bootstrap 5</strong>.
</p>

<hr />

<h2>📖 About the Project</h2>
<p>
  News consumption has shifted to digital platforms. This project was built to 
  <strong>practice API integration, error handling, and responsive UI design</strong>.
</p>
<p>The app has four main parts:</p>
<ol>
  <li><strong>Navbar</strong> — Responsive Bootstrap navbar with About &amp; Contact sections.</li>
  <li><strong>Hero Section</strong> — Headline, short intro, and call-to-action buttons.</li>
  <li><strong>News Cards (Thumbnails)</strong> — Articles fetched dynamically and displayed in a grid.</li>
  <li><strong>Footer</strong> — Credits and a “Back to Top” link.</li>
</ol>
<p><em>Frontend-only</em> for now, but easy to extend with a backend later.</p>

<hr />

<h2>🎯 Key Highlights</h2>
<ul>
  <li>🌍 <strong>Live News Integration</strong> with NewsAPI (Axios).</li>
  <li>🖼️ <strong>Fallback Images &amp; Text</strong> when data is missing.</li>
  <li>📊 <strong>Dynamic Card Layout</strong> using Bootstrap grid.</li>
  <li>📱 <strong>Responsive Design</strong> across devices.</li>
  <li>🎨 <strong>Modern UI</strong> with Bootstrap 5 utilities &amp; components.</li>
</ul>

<hr />

<h2>🛠️ Tools &amp; Technologies</h2>
<ul>
  <li><strong>React.js</strong> — Functional components &amp; hooks.</li>
  <li><strong>Axios</strong> — API requests.</li>
  <li><strong>Bootstrap 5</strong> — Grid, navbar, and responsiveness.</li>
  <li><strong>JavaScript (ES6+)</strong>, <strong>HTML5</strong>, <strong>CSS3</strong>.</li>
</ul>

<hr />

<h2>📂 Components Overview</h2>
<ul>
  <li><strong>Navbar.jsx</strong> — Navigation bar with collapsible About/Contact panel.</li>
  <li><strong>Hero.jsx</strong> — Project headline, description, and CTA buttons.</li>
  <li><strong>Thumbnail.jsx</strong> — Fetches articles and renders them as cards (with fallbacks).</li>
  <li><strong>Footer.jsx</strong> — Credits + Back-to-Top link.</li>
</ul>

<hr />

<h2>🚀 How It Works</h2>
<ol>
  <li>On mount, the app calls the <strong>NewsAPI</strong> using Axios.</li>
  <li>Articles are stored in React <code>useState</code>.</li>
  <li>Data is mapped into <strong>Bootstrap cards</strong> dynamically.</li>
  <li>Missing <code>urlToImage</code> or <code>description</code>? The UI shows default placeholders.</li>
  <li>Clicking <strong>View</strong> opens the original article link.</li>
</ol>

<hr />

<h2>📂 Project Structure</h2>
<pre><code>📦 react-news-album
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┣ Hero.jsx
 ┃ ┃ ┣ Thumbnail.jsx
 ┃ ┃ ┣ Footer.jsx
 ┃ ┗ App.js
 ┗ README.md
</code></pre>

<hr />

<h2>⚙️ Installation &amp; Setup</h2>

<h3>1️⃣ Clone the repository</h3>
<pre><code>git clone https://github.com/your-username/react-news-album.git
cd react-news-album
</code></pre>

<h3>2️⃣ Install dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>3️⃣ Add your NewsAPI key</h3>
<p>Create a <code>.env</code> file in the project root:</p>
<pre><code>REACT_APP_NEWS_API_KEY=your_api_key_here
</code></pre>

<h3>4️⃣ Start the app</h3>
<pre><code>npm start
</code></pre>

<h3>5️⃣ Open in browser</h3>
<pre><code>http://localhost:3000
</code></pre>

<hr />

<h2>🎥 video</h2>

https://github.com/user-attachments/assets/5478dc2b-e78f-4fde-bb95-58c02ee602f3

