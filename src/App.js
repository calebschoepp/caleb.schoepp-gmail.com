import React from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import CategoryPicker from "./CategoryPicker.js";
import Gallery from "./Gallery.js";
import Footer from "./Footer.js";

function App() {
  return (
    <div class="app-root">
      <Header />
      <Sidebar />
      <CategoryPicker />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
