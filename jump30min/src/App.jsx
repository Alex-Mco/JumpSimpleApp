import React, { useState } from "react";
import { marked } from "marked";
import html2pdf from "html2pdf.js";
import "./App.css";

const defaultMarkdown = `# Welcome to the Markdown Editor!

This **live preview** updates _as you type_.

## Features

- Type Markdown on the left
- See formatted text on the right
- **Copy** the output
- **Export** as PDF

> Try editing this text to see how it works!

\`\`\`js
// Code block example
function greet() {
  console.log("Hello, world!");
}
\`\`\`
`;


function App() {
  //provides an example paragraph showing the power of markdown.
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleCopy = () => {
    const html = marked.parse(markdown);
    navigator.clipboard.writeText(html).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handleExport = () => {
    const preview = document.querySelector(".preview");
  
    const exportWrapper = document.createElement("div");
    const style = document.createElement("style");
    style.textContent = `
      body {
        font-family: 'Inter', sans-serif;
        color: #3B1F00;
        line-height: 1.6;
      }
  
      h1 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
  
      h2 {
        font-size: 1.5rem;
        color: #8b4000;
        margin-top: 1.5rem;
      }
  
      p, li {
        font-size: 1rem;
      }
  
      pre {
        background-color: #f4d9c6;
        padding: 1rem;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        overflow-x: auto;
        margin: 1rem 0;
      }
  
      code {
        background-color: #f9e2d0;
        padding: 0.2rem 0.4rem;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
      }
  
      pre code {
        background: none;
        padding: 0;
        border-radius: 0;
      }
  
      blockquote {
        border-left: 4px solid #f2c299;
        padding-left: 1rem;
        margin: 1rem 0;
        font-style: italic;
        background-color: #fff3e5;
      }
    `;
  
    exportWrapper.appendChild(style);
    exportWrapper.innerHTML += preview.innerHTML;
  
    html2pdf().set({
      margin: 0.5,
      filename: "markdown-output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }).from(exportWrapper).save();
  };
  
  

  return (
    <div className="container">
      <textarea
        className="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Type Markdown here..."
      />
      <div className="preview-pane">
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
        />
        <div className="buttons">
          <button onClick={() => setMarkdown(defaultMarkdown)}>Reset</button>
          <button onClick={handleCopy}>Copy</button>
          <button onClick={handleExport}>Export</button>
        </div>
      </div>
    </div>
  );
}

export default App;
