// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;

// src/components/Navbar.tsx
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#000000] text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">CMS</h1>
      <ul className="flex gap-4">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

// src/components/Hero.tsx
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="h-screen bg-[#0B60B0] flex flex-col items-center justify-center text-white text-center p-8">
      <h1 className="text-4xl font-bold">Welcome to Our CMS</h1>
      <p className="text-lg mt-4">Manage your content seamlessly with our powerful tools.</p>
      <button className="mt-6 px-6 py-2 bg-[#40A2D8] text-white rounded-lg">Get Started</button>
    </section>
  );
};

export default Hero;

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
