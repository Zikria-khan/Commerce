import React from 'react';
import './AboutUs.css'; // Import the custom CSS file
import Navbar from '../Navbar/Navbar';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Navbar/>

      <main className="main-content">
        <h1 className="title">About Us</h1>
        <div className="about-section">
          <div className="story">
            <h2 className="section-title">Our Story</h2>
            <p className="section-text">
              Welcome to E-commerce, your number one source for all things [product, ie: shoes, electronics, etc.]. We're dedicated to giving you the very best of [product], with a focus on dependability, customer service, and uniqueness.
            </p>
            <p className="section-text">
              Founded in [2024] by [Zakriya khan], E-commerce has come a long way from its beginnings in a [starting location, ie: home office, garage, etc.]. When [founder name] first started out, [his/her/their] passion for [brand message] drove them to [action], so that E-commerce can offer you [competitive differentiator].
            </p>
            <p className="section-text">
              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p className="section-text">
              Sincerely, <br />
              [Zakriya khan], Founder
            </p>
          </div>

          <div className="team">
            <h2 className="section-title">Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <img alt="Portrait of John Doe, CEO" className="team-member-img" src="https://storage.googleapis.com/a1aa/image/ZOt1ZQQDFXaxI5rCWnRLZjU6mN4NtDYG5wacnrRkCp15G17E.jpg" />
                <h3 className="team-member-name">Zakriya khan</h3>
                <p className="team-member-role">CEO</p>
              </div>
              {/* Add more team members similarly */}
            </div>
          </div>

          <div className="mission">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-text">
              Our mission is to provide the best products and services to our customers at the lowest prices possible. We take great pride in our company, our commitment to customer service, and in the products we sell. Our online store is designed to provide you with a safe and secure environment to browse our product catalog.
            </p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          © 2023 E-commerce. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
