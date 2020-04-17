import React from "react";

function Footer() {
  return (
    <div>
      <p className="lg:block lg:fixed lg:bottom-0 p-1 text-xl">
        Made with <img src="/heart.svg" className="inline w-5 h-5" /> by{" "}
        <a href="https://calebschoepp.com">Caleb</a>
      </p>
    </div>
  );
}

export default Footer;
