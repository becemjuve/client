import React from 'react';

function Contact() {
  return (
    <div className="contact-us-container">
      <div className="contact-us-info">
        <h2>Contact Us</h2>
        <address>
          <p>123 Main Street</p>
          <p>City, State 12345</p>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </address>
      </div>
      <div className="follow-us">
        <h4>Follow Us</h4>
        <div>
          <a
            href="https://www.facebook.com/becemJuventus"
            target="_blank"
            rel="noreferrer"
            className="me-4 link-secondary"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/mobile-legende-pro-live-34229b288/"
            target="_blank"
            rel="noreferrer"
            className="me-4 link-secondary"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/becemjuve"
            target="_blank"
            rel="noreferrer"
            className="me-4 link-secondary"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
