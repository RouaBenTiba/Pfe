import React from "react";
import logo from "../images/logo.png";
import Link from "next/link";

export default function Home() {
  const mainStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const logoStyle = {
    width: "200px",
    height: "auto",
    cursor: "pointer",
  };

  return (
    <main style={mainStyle}>
      <div>
        <Link href="/Log/login">
          <img src={logo.src} alt="Logo" style={logoStyle} />
        </Link>
      </div>
    </main>
  );
}
