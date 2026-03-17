import { LazyImage } from '../components'

export const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">About Us</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>About Us</li>
          </ul>
        </div>
      </section>

      {/* About Section */}
      <section className="about-content-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <LazyImage src="/assets/img/about-img.png" alt="About Us" />
            </div>
            <div className="about-text">
              <span className="section-subtitle">About US</span>
              <h2 className="section-title">Helping Each Other can Make World Better</h2>
              <p className="section-description">
                Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur. Nonprofits around the world apply and join us to access more funding.
              </p>
              <div className="about-block">
                <div className="block-left">
                  <div className="block-heading">
                    <div className="icon"><i className="flaticon-love"></i></div>
                    <h3 className="block-title">Start Helping Team</h3>
                  </div>
                  <ul className="block-list">
                    <li>There are many variations of solve</li>
                  </ul>
                </div>
                <div className="block-right">
                  <LazyImage src="/assets/img/about-block-img.jpg" alt="About Block" />
                </div>
              </div>
              <div className="about-bottom">
                <a href="/about" className="btn btn-primary">Explore More</a>
                <div className="about-call">
                  <div className="icon"><i className="flaticon-telephone-call"></i></div>
                  <div className="txt">
                    <span className="call-title">Call Any Time</span>
                    <a href="tel:+612345678990">+61 2345 678 990</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <i className="flaticon-costumer"></i>
              <span className="stat-number">260+</span>
              <span className="stat-text">Total Happy Children</span>
            </div>
            <div className="stat-item">
              <i className="flaticon-team"></i>
              <span className="stat-number">110+</span>
              <span className="stat-text">Total Our Volunteer</span>
            </div>
            <div className="stat-item">
              <i className="flaticon-package"></i>
              <span className="stat-number">190+</span>
              <span className="stat-text">Our Products & Gifts</span>
            </div>
            <div className="stat-item">
              <i className="flaticon-relationship"></i>
              <span className="stat-number">560+</span>
              <span className="stat-text">Worldwide Donor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, History Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Organization History</span>
            <h2 className="section-title">Charitics Information</h2>
          </div>
          <div className="tabs-content">
            <div className="tab-item">
              <div className="tab-image">
                <LazyImage src="/assets/img/mission-img.jpg" alt="Mission" />
              </div>
              <div className="tab-text">
                <h3 className="tab-title">Our Mission</h3>
                <p className="tab-description">
                  We are dedicated to making a positive impact in the lives of those in need. Our mission is to provide essential services, support, and resources to underserved communities around the world.
                </p>
                <ul className="tab-list">
                  <li>Provide education and healthcare to children</li>
                  <li>Support sustainable community development</li>
                  <li>Empower individuals through skill training</li>
                  <li>Ensure access to clean water and sanitation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Team</span>
            <h2 className="section-title">Meet Our Dedicated Team</h2>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <LazyImage src="/assets/img/member-1.jpg" alt="Team Member" />
              </div>
              <div className="member-info">
                <h3 className="member-name">John Doe</h3>
                <p className="member-role">Executive Director</p>
                <div className="member-social">
                  <a href="#"><i className="flaticon-facebook"></i></a>
                  <a href="#"><i className="flaticon-twitter"></i></a>
                  <a href="#"><i className="flaticon-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <LazyImage src="/assets/img/member-2.jpg" alt="Team Member" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Jane Smith</h3>
                <p className="member-role">Program Director</p>
                <div className="member-social">
                  <a href="#"><i className="flaticon-facebook"></i></a>
                  <a href="#"><i className="flaticon-twitter"></i></a>
                  <a href="#"><i className="flaticon-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <LazyImage src="/assets/img/member-3.jpg" alt="Team Member" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Mike Johnson</h3>
                <p className="member-role">Community Manager</p>
                <div className="member-social">
                  <a href="#"><i className="flaticon-facebook"></i></a>
                  <a href="#"><i className="flaticon-twitter"></i></a>
                  <a href="#"><i className="flaticon-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <LazyImage src="/assets/img/member-4.jpg" alt="Team Member" />
              </div>
              <div className="member-info">
                <h3 className="member-name">Sarah Williams</h3>
                <p className="member-role">Volunteer Coordinator</p>
                <div className="member-social">
                  <a href="#"><i className="flaticon-facebook"></i></a>
                  <a href="#"><i className="flaticon-twitter"></i></a>
                  <a href="#"><i className="flaticon-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
