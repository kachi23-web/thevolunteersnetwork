import { TeamMemberCard } from '../components';
import { teamMembers } from '../data';

export const TeamPage = () => {
  return (
    <div className="team-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Our Team</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Our Team</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-listing-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Team</span>
            <h2 className="section-title">Meet Our Dedicated Team Members</h2>
            <p className="section-description">
              Our team is composed of passionate individuals committed to making a positive impact in the world. Together, we work tirelessly to support communities in need.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <section className="join-team-section">
        <div className="container">
          <div className="join-team-content">
            <h2 className="join-team-title">Want to Join Our Team?</h2>
            <p className="join-team-description">
              We're always looking for passionate individuals who want to make a difference. Check out our volunteer opportunities and career openings.
            </p>
            <div className="join-team-buttons">
              <a href="/contact" className="btn btn-primary">Become a Volunteer</a>
              <a href="/contact" className="btn btn-secondary">Career Opportunities</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
