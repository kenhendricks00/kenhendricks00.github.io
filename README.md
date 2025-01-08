<h1>Minimal Portfolio</h1>
<p>This is an attempt to create a personal webpage and inspire others to create their own. My inspiration for this project was the <a href="https://www.youtube.com/watch?v=b0pkpcD8Ms4">tutorial</a> by ForrestKnight on YouTube. His repository on GitHub can be found <a href="https://github.com/ForrestKnight/minimal-portfolio">here</a>.</p>

<p>The project is implemented with <b>React</b> and <b>TailwindCSS</b> and <b>Vite</b> is used as the bundler. Also, GitHub Pages is used to deploy the app and assign to it a custom domain name, purchased from <b>porkbun</b>.</p>

<h2>Styling</h2>
<p>For the styling of the webpage <b>TailwindCSS framework</b> is used.</p>

<p>The app is made responsive through the handy TailwindCSS classes. Some theme colors and the font are defined in the <code>tailwind.config.js</code> file.</p>

<h2>Storage</h2>
<p>The data for the portfolio and the timeline sections are stored in <code>src/data</code> folder. Therefore, in every section the Component maps to the data array a ComponentItem each time, so as to construct the whole section.</p>

<h2>Contact Form</h2>
<p>The data from the form submission is sent to the <a href="https://getform.io">getform.io</a> service.</p>
