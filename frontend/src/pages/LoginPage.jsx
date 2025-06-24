import React from 'react';
import './LoginPage.css'; // Kreiraćemo ovu CSS datoteku za stilizovanje

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>LOGIN</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="user@domain.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="********" required />
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
          
          <div className="social-login">
            <button type="button" className="facebook-btn">Login With Facebook</button>
            <button type="button" className="google-btn">Login With Gmail</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;