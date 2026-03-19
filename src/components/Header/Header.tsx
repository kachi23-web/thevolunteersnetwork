import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  currentPage?: string
  onMenuToggle?: () => void
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || isSearchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen, isSearchOpen])

  const toggleMobileMenu = () => { setIsMobileMenuOpen(v => !v); onMenuToggle?.() }
  const toggleSearch = () => setIsSearchOpen(v => !v)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const toggleDropdown = () => setIsDropdownOpen(v => !v)

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`ul-sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="ul-sidebar-header">
          <div className="ul-sidebar-header-logo">
            <Link to="/" onClick={closeMobileMenu}>
              <img src="src/assets/tvn-logo.png" alt="The Volunteer Nations Logo" className="logo" />
            </Link>
          </div>
          <button className="ul-sidebar-closer" onClick={closeMobileMenu} aria-label="Close menu">
            <i className="flaticon-close"></i>
          </button>
        </div>

        <div className="ul-sidebar-header-nav-wrapper">
          <nav className="ul-sidebar-nav">
            <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobileMenu}>About</NavLink>
            <NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink>
            <NavLink to="/donations" onClick={closeMobileMenu}>Donations</NavLink>
            <NavLink to="/events" onClick={closeMobileMenu}>Events</NavLink>
            <NavLink to="/blog" onClick={closeMobileMenu}>Blog</NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink>
          </nav>
        </div>

        <div className="ul-sidebar-footer">
          <span className="ul-sidebar-footer-title">Follow us</span>
          <div className="ul-sidebar-footer-social">
            <a href="#" aria-label="Facebook"><i className="flaticon-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="flaticon-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="flaticon-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="flaticon-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div className={`ul-search-form-wrapper ${isSearchOpen ? 'active' : ''}`}>
        <button className="ul-search-closer" onClick={toggleSearch} aria-label="Close search">
          <i className="flaticon-close"></i>
        </button>
        <form className="ul-search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="ul-search-form-right">
            <input type="search" name="search" id="ul-search" placeholder="Search Here" />
            <button type="submit">
              <span className="icon"><i className="flaticon-search"></i></span>
            </button>
          </div>
        </form>
      </div>

      {/* Header */}
      <header className="ul-header">
        <div className={`ul-header-bottom ${isSticky ? 'to-be-sticky' : ''}`}>
          <div className="ul-header-bottom-wrapper ul-header-container">
            <div className="logo-container">
              <Link to="/">
                <img src="src/assets/tvn-logo.png" alt="The Volunteer Nations Logo" className="logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="ul-header-nav-wrapper">
              <nav className="ul-header-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                <div className={`has-sub-menu ${isDropdownOpen ? 'active' : ''}`}>
                  <a role="button" onClick={toggleDropdown}>Pages</a>
                  <div className="ul-header-submenu">
                    <ul>
                      <li><NavLink to="/services" onClick={() => setIsDropdownOpen(false)}>Services</NavLink></li>
                      <li><NavLink to="/projects" onClick={() => setIsDropdownOpen(false)}>Projects</NavLink></li>
                      <li><NavLink to="/team" onClick={() => setIsDropdownOpen(false)}>Team</NavLink></li>
                      <li><NavLink to="/pricing" onClick={() => setIsDropdownOpen(false)}>Pricing</NavLink></li>
                      <li><NavLink to="/faq" onClick={() => setIsDropdownOpen(false)}>FAQs</NavLink></li>
                    </ul>
                  </div>
                </div>
                <NavLink to="/donations" className={({ isActive }) => isActive ? 'active' : ''}>Donations</NavLink>
                <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>Events</NavLink>
                <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
              </nav>
            </div>

            {/* Header Actions */}
            <div className="ul-header-actions">
              <button className="ul-search-btn" onClick={toggleSearch} aria-label="Search">
                <i className="flaticon-search"></i>
              </button>
              <button className="ul-mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Menu">
                <i className="flaticon-menu"></i>
              </button>
              <Link to="/donations" className="ul-btn ul-btn-primary">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="ul-sidebar-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  )
}
