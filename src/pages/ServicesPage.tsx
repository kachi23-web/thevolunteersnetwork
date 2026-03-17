import { LazyImage } from '../components'

export const ServicesPage = () => {
  return (
    <div className="services-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Our Services</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Our Services</li>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-listing-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title">Our Non-Profit Services You Must Love</h2>
            <p className="section-description">
              We provide a wide range of services to support communities in need. Our programs are designed to create lasting positive change and empower individuals to build better futures.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-1.jpg" alt="Fund Raised & Donation" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-donation"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Fund Raised & Donation</a>
                </h3>
                <p className="service-description">
                  Professional fundraising services ensuring transparent donation management and maximum impact for community programs and charitable initiatives.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-2.jpg" alt="Medical Treatment Help" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-healthcare"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Medical Treatment Help</a>
                </h3>
                <p className="service-description">
                  Comprehensive medical assistance programs providing healthcare access, treatment support, and wellness services to underserved communities.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-3.jpg" alt="Child Medical Research" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-education"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Child Medical Research</a>
                </h3>
                <p className="service-description">
                  Supporting pediatric medical research initiatives to advance children's healthcare and develop innovative treatments for young patients.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-4.jpg" alt="Clean Water Access" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-water"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Clean Water Access</a>
                </h3>
                <p className="service-description">
                  Implementing sustainable water solutions to provide clean, safe drinking water to communities lacking access to this essential resource.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-1.jpg" alt="Education Support" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-education"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Education Support</a>
                </h3>
                <p className="service-description">
                  Providing educational resources, scholarships, and learning opportunities to help children and adults achieve their academic goals.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <LazyImage src="/assets/img/service-2.jpg" alt="Community Development" />
              </div>
              <div className="service-content">
                <div className="service-icon">
                  <i className="flaticon-community"></i>
                </div>
                <h3 className="service-title">
                  <a href="/service-details">Community Development</a>
                </h3>
                <p className="service-description">
                  Building stronger communities through sustainable development programs, infrastructure projects, and local empowerment initiatives.
                </p>
                <a href="/service-details" className="service-link">
                  View Details <i className="flaticon-up-right-arrow"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-choose-content">
            <div className="why-choose-image">
              <LazyImage src="/assets/img/why-join.jpg" alt="Why Choose Us" />
            </div>
            <div className="why-choose-text">
              <span className="section-subtitle">Why Choose Us</span>
              <h2 className="section-title">Making a Real Difference in Communities</h2>
              <p className="section-description">
                Our organization has been serving communities for over 15 years, bringing hope and positive change to thousands of lives. We believe in sustainable solutions and community empowerment.
              </p>
              <ul className="why-choose-list">
                <li>
                  <i className="flaticon-check"></i>
                  <span>Transparent and accountable operations</span>
                </li>
                <li>
                  <i className="flaticon-check"></i>
                  <span>Experienced and dedicated team</span>
                </li>
                <li>
                  <i className="flaticon-check"></i>
                  <span>Sustainable and impactful programs</span>
                </li>
                <li>
                  <i className="flaticon-check"></i>
                  <span>Community-focused approach</span>
                </li>
              </ul>
              <a href="/about" className="btn btn-primary">Learn More About Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Need Our Services?</h2>
            <p className="cta-description">
              Contact us to learn more about how we can help your community or how you can support our programs.
            </p>
            <a href="/contact" className="btn btn-secondary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  )
}
