import { motion } from 'framer-motion'
import type { DonationCampaign } from '../../types';
import { cardHoverVariants } from '../../utils/animations'
import { LazyImage } from '../LazyImage/LazyImage'
import './DonationCard.css';

interface DonationCardProps {
  campaign: DonationCampaign;
}

export const DonationCard = ({ campaign }: DonationCardProps) => {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <motion.div
      className="donation-card"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="donation-image">
        <LazyImage src={campaign.image} alt={campaign.title} />
        <div className="donation-category">{campaign.category}</div>
      </div>
      <div className="donation-content">
        <h3 className="donation-title">{campaign.title}</h3>
        <p className="donation-description">{campaign.description}</p>
        <div className="donation-progress">
          <div className="progress-bar">
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            ></motion.div>
          </div>
          <div className="progress-stats">
            <div className="stat">
              <span className="label">Raised:</span>
              <span className="value">${campaign.raised.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span className="label">Goal:</span>
              <span className="value">${campaign.goal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <motion.a
          href="/donation-details"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Donate Now
        </motion.a>
      </div>
    </motion.div>
  );
};
