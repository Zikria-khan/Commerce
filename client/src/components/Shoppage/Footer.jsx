import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-text">&copy; 2023 E-Shop. All rights reserved.</div>
                <div className="footer-socials">
                    <a href="#" className="social-icon facebook">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="social-icon twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

const SmallFooter = () => {
    return (
        <div className="small-footer">
            <div className="small-footer-container">
                <p className="small-footer-text">&copy; 2023 E-Shop. All rights reserved.</p>
            </div>
        </div>
    );
};

export { Footer, SmallFooter };
