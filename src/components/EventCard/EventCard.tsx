import { motion } from 'framer-motion'
import type { Event } from '../../types';
import { cardHoverVariants } from '../../utils/animations'
import { LazyImage } from '../LazyImage/LazyImage'
import './EventCard.css';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const getDay = (date: Date) => date.getDate().toString().padStart(2, '0');
  const getMonth = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });
  const getYear = (date: Date) => date.getFullYear().toString();

  return (
    <motion.div
      className="event-item"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="event-date">
        <span className="date-day">{getDay(event.date)}</span>
        <span className="date-month">{getMonth(event.date)}</span>
        <span className="date-year">{getYear(event.date)}</span>
      </div>
      <div className="event-image">
        <LazyImage src={event.image} alt={event.title} />
      </div>
      <div className="event-content">
        <div className="event-meta">
          <span className="event-time">
            <i className="flaticon-clock"></i> {event.time}
          </span>
          <span className="event-location">
            <i className="flaticon-pin"></i> {event.location}
          </span>
        </div>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        <motion.a
          href={event.registrationUrl || '/event-details'}
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.a>
      </div>
    </motion.div>
  );
};
