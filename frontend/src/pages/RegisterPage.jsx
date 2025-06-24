import React from 'react';
import './RegisterPage.css'; // Kreiraćemo i ovu CSS datoteku

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <div className="register-form-container">
        <h2>REGISTER</h2>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="John" required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Doe" required />
          </div>
          <div className="form-group">
            <label>Enter Email</label>
            <input type="email" placeholder="user@domain.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="********" required />
          </div>
          <button type="submit" className="register-btn">REGISTER</button>
          
          <div className="social-signup">
            <button type="button" className="facebook-btn">Signup With Facebook</button>
            <button type="button" className="google-btn">Signup With Gmail</button>
          </div>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;