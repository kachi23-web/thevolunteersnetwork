import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import type { TeamMember } from '../../types';
import { cardHoverVariants } from '../../utils/animations'
import { LazyImage } from '../LazyImage/LazyImage'
import './TeamMemberCard.css';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <motion.div
      className="team-member"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="member-image">
        <LazyImage src={member.image} alt={member.name} />
        <div className="member-overlay">
          <div className="member-social">
            {member.socialLinks.map((link, index) => (
              <motion.a 
                key={index} 
                href={link.url} 
                aria-label={link.platform}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="member-info">
        <h3 className="member-name">
          <Link to={`/team/${member.id}`}>{member.name}</Link>
        </h3>
        <p className="member-role">{member.position}</p>
      </div>
    </motion.div>
  );
};
