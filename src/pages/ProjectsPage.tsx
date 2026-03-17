import { LazyImage } from '../components'

export const ProjectsPage = () => {
  return (
    <div className="projects-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Our Projects</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Our Projects</li>
          </ul>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-listing-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Work</span>
            <h2 className="section-title">View Our Ongoing and Completed Projects</h2>
            <p className="section-description">
              Explore the various projects we've undertaken to make a positive impact in communities around the world. Each project represents our commitment to creating lasting change.
            </p>
          </div>

          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-1.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Education</div>
                <h3 className="project-title">
                  <a href="/project-details">School Building Initiative</a>
                </h3>
                <p className="project-description">
                  Building modern educational facilities in rural areas to provide quality learning environments for children.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Rural Communities
                  </span>
                  <span className="project-status status-ongoing">Ongoing</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-2.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Healthcare</div>
                <h3 className="project-title">
                  <a href="/project-details">Mobile Medical Clinics</a>
                </h3>
                <p className="project-description">
                  Providing healthcare services to remote communities through mobile medical units and trained professionals.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Multiple Regions
                  </span>
                  <span className="project-status status-ongoing">Ongoing</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-3.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Water</div>
                <h3 className="project-title">
                  <a href="/project-details">Clean Water Wells Project</a>
                </h3>
                <p className="project-description">
                  Installing water wells and purification systems to ensure access to clean drinking water for all.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Africa & Asia
                  </span>
                  <span className="project-status status-completed">Completed</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-4.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Community</div>
                <h3 className="project-title">
                  <a href="/project-details">Livelihood Training Program</a>
                </h3>
                <p className="project-description">
                  Empowering individuals with vocational skills and training to create sustainable income opportunities.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Urban Centers
                  </span>
                  <span className="project-status status-ongoing">Ongoing</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-1.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Food Security</div>
                <h3 className="project-title">
                  <a href="/project-details">Community Gardens Initiative</a>
                </h3>
                <p className="project-description">
                  Establishing community gardens to promote food security and sustainable agriculture practices.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Local Communities
                  </span>
                  <span className="project-status status-completed">Completed</span>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <LazyImage src="/assets/img/project-2.jpg" alt="Project" />
                <div className="project-overlay">
                  <a href="/project-details" className="project-link">
                    <i className="flaticon-up-right-arrow"></i>
                  </a>
                </div>
              </div>
              <div className="project-content">
                <div className="project-category">Emergency Relief</div>
                <h3 className="project-title">
                  <a href="/project-details">Disaster Response Program</a>
                </h3>
                <p className="project-description">
                  Providing immediate relief and long-term recovery support to communities affected by natural disasters.
                </p>
                <div className="project-meta">
                  <span className="project-location">
                    <i className="flaticon-pin"></i> Global
                  </span>
                  <span className="project-status status-ongoing">Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats Section */}
      <section className="project-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-text">Completed Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-text">Ongoing Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100K+</span>
              <span className="stat-text">Lives Impacted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-text">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Support Our Projects</h2>
            <p className="cta-description">
              Your contribution can help us expand our reach and create more positive impact in communities worldwide.
            </p>
            <div className="cta-buttons">
              <a href="/donations" className="btn btn-primary">Donate Now</a>
              <a href="/contact" className="btn btn-secondary">Partner With Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
