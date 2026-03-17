import { motion } from 'framer-motion'
import { DonationCard, LoadingSpinner, AnimatedSection } from '../components';
import { useApp } from '../contexts';
import { staggerContainerVariants, slideUpVariants } from '../utils/animations'

export const DonationsPage = () => {
  const { donations, isLoading, error } = useApp();

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading donation campaigns..." />;
  }

  if (error) {
    return (
      <div className="error-message" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#dc3545', fontSize: '1.125rem' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="donations-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Donations</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Donations</li>
          </ul>
        </div>
      </section>

      {/* Donations Listing Section */}
      <section className="donations-listing-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-heading">
              <span className="section-subtitle">Popular Causes</span>
              <h2 className="section-title">Support Our Donation Campaigns</h2>
              <p className="section-description">
                Your generous donations help us make a real difference in communities around the world. Every contribution counts towards creating positive change.
              </p>
            </div>
          </AnimatedSection>
          
          <motion.div
            className="donations-grid"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {donations.map((campaign) => (
              <motion.div key={campaign.id} variants={slideUpVariants}>
                <DonationCard campaign={campaign} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <AnimatedSection>
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Make a Difference Today</h2>
              <p className="cta-description">
                Your donation can change lives. Join us in making the world a better place.
              </p>
              <motion.a
                href="/contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Volunteer
              </motion.a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
