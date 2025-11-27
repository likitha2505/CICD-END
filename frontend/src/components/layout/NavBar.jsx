// src/components/layout/NavBar.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./NavBar.css";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const isAdmin = Array.isArray(user?.roles) && user.roles.includes("ROLE_ADMIN");
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563eb"/>
              <path d="M8 12h16v12H8z" fill="white" opacity="0.2"/>
              <path d="M10 8h4v4h-4zM18 8h4v4h-4zM10 14h4v4h-4zM18 14h4v4h-4z" fill="white"/>
            </svg>
            <span>Hotel<strong>Hub</strong></span>
          </Link>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <Link 
              to="/" 
              className={isActive('/') ? 'nav-link active' : 'nav-link'}
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Home
            </Link>

            {user && (
              <Link 
                to="/my-bookings" 
                className={isActive('/my-bookings') ? 'nav-link active' : 'nav-link'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
                My Bookings
              </Link>
            )}

            {isAdmin && (
              <>
                <Link 
                  to="/admin" 
                  className={isActive('/admin') ? 'nav-link active' : 'nav-link'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                  Dashboard
                </Link>
                <Link 
                  to="/admin/rooms" 
                  className={isActive('/admin/rooms') ? 'nav-link active' : 'nav-link'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Rooms
                </Link>
                <Link 
                  to="/admin/bookings" 
                  className={isActive('/admin/bookings') ? 'nav-link active' : 'nav-link'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bookings
                </Link>
              </>
            )}
          </div>

          <div className="nav-actions">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="btn-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="user-info">
                  <div className="user-avatar">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-email">{user.email}</span>
                </div>
                <button className="btn-logout" onClick={handleLogout}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}