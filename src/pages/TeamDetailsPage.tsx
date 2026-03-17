import { useParams } from 'react-router-dom';
import { LazyImage } from '../components';
import { teamMembers } from '../data';
import { getTeamMemberById } from '../utils/contentManagement';
import './TeamDetailsPage.css';

export const TeamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const member = id ? getTeamMemberById(teamMembers, id) : undefined;

  if (!member) {
    return (
      <div className="team-details-error">
        <h2>Team Member Not Found</h2>
        <p>The team member you're looking for doesn't exist.</p>
        <a href="/team" className="btn-primary">Back to Team</a>
      </div>
    );
  }

  return (
    <div className="team-details">
      <div className="container">
        <div className="team-details-content">
          <div className="team-details-image">
            <LazyImage src={member.image} alt={member.name} />
          </div>
          <div className="team-details-info">
            <h1 className="member-name">{member.name}</h1>
            <p className="member-position">{member.position}</p>
            <div className="member-bio">
              <h3>About</h3>
              <p>{member.bio}</p>
            </div>
            <div className="member-social-links">
              <h3>Connect</h3>
              <div className="social-links">
                {member.socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    className="social-link"
                    aria-label={`${member.name} on ${link.platform}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={link.icon}></i>
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
