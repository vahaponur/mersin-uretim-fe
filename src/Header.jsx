import React from "react";
import logo from "./ayblogo.png"; // Import the image
const Header = () => {
  return (
    <header>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div className="logo justify-content-center">
            <a class="navbar-brand" href="#">
                <img src={logo} alt="" width="176" height="64"/>
              </a>
            </div>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/daily">Günlük Rapor</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/Custom">Tarihli Rapor</a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
