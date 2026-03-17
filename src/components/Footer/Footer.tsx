import { Link } from 'react-router-dom'
import './Footer.css'

interface ContactInfo {
  address: string
  email: string
  phone: string
}

interface SocialLink {
  platform: string
  url: string
  icon: string
}

interface NavLink {
  label: string
  path: string
}

interface FooterProps {
  contactInfo?: ContactInfo
  socialLinks?: SocialLink[]
  quickLinks?: NavLink[]
}

const defaultContactInfo: ContactInfo = {
  address: 'Lagos & Abuja Offices, Nigeria',
  email: 'hello@thevolunteernations.org',
  phone: '+234 123 456 789',
}

const defaultSocialLinks: SocialLink[] = [
  { platform: 'Facebook', url: '#', icon: 'flaticon-facebook' },
  { platform: 'Twitter', url: '#', icon: 'flaticon-twitter' },
  { platform: 'Instagram', url: '#', icon: 'flaticon-instagram' },
  { platform: 'YouTube', url: '#', icon: 'flaticon-youtube' },
]

const defaultQuickLinks: NavLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Donations', path: '/donations' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
]

export const Footer = ({
  contactInfo = defaultContactInfo,
  socialLinks = defaultSocialLinks,
  quickLinks = defaultQuickLinks,
}: FooterProps) => {
  return (
    <footer className="ul-footer">
      {/* Footer Top - Contact Info */}
      <div className="ul-footer-top">
        <div className="ul-footer-container">
          <div className="ul-footer-top-contact-infos">
            {/* Address */}
            <div className="ul-footer-top-contact-info">
              <div className="ul-footer-top-contact-info-icon">
                <div className="ul-footer-top-contact-info-icon-inner">
                  <i className="flaticon-pin"></i>
                </div>
              </div>
              <div className="ul-footer-top-contact-info-txt">
                <span className="ul-footer-top-contact-info-label">Address</span>
                <h5 className="ul-footer-top-contact-info-address">{contactInfo.address}</h5>
              </div>
            </div>

            {/* Email */}
            <div className="ul-footer-top-contact-info">
              <div className="ul-footer-top-contact-info-icon">
                <div className="ul-footer-top-contact-info-icon-inner">
                  <i className="flaticon-email"></i>
                </div>
              </div>
              <div className="ul-footer-top-contact-info-txt">
                <span className="ul-footer-top-contact-info-label">Send Email</span>
                <h5 className="ul-footer-top-contact-info-address">
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </h5>
              </div>
            </div>

            {/* Phone */}
            <div className="ul-footer-top-contact-info">
              <div className="ul-footer-top-contact-info-icon">
                <div className="ul-footer-top-contact-info-icon-inner">
                  <i className="flaticon-telephone-call-1"></i>
                </div>
              </div>
              <div className="ul-footer-top-contact-info-txt">
                <span className="ul-footer-top-contact-info-label">Call Emergency</span>
                <h5 className="ul-footer-top-contact-info-address">
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Middle - Main Content */}
      <div className="ul-footer-middle">
        <div className="ul-footer-container">
          <div className="ul-footer-middle-wrapper">
            {/* About Section */}
            <div className="ul-footer-about">
              <Link to="/">
                <img src="/assets/img/logo-white.svg" alt="The Volunteer Nations Logo" className="logo" />
              </Link>
              <p className="ul-footer-about-txt">
                Building a global network of changemakers to drive sustainable impact worldwide. 
                We connect passionate volunteers with organizations making a real difference.
              </p>
              <div className="ul-footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    aria-label={social.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="ul-footer-widget">
              <h3 className="ul-footer-widget-title">Quick Links</h3>
              <div className="ul-footer-widget-links">
                {quickLinks.map((link) => (
                  <Link key={link.path} to={link.path}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Widget */}
            <div className="ul-footer-widget ul-nwsltr-widget">
              <h3 className="ul-footer-widget-title">Contact Us</h3>
              <div className="ul-footer-widget-links ul-footer-contact-links">
                <a href={`mailto:${contactInfo.email}`}>
                  <i className="flaticon-mail"></i> {contactInfo.email}
                </a>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                  <i className="flaticon-telephone-call"></i> {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="ul-footer-bottom">
        <div className="ul-footer-container">
          <div className="ul-footer-bottom-wrapper">
            <p className="ul-footer-copyright">
              © {new Date().getFullYear()} The Volunteer Nations. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
