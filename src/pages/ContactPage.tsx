import { motion } from 'framer-motion'
import { ContactForm, type ContactFormData, AnimatedSection, AnimatedIcon, LazyImage } from '../components';
import { 
  slideUpVariants, 
  staggerContainerVariants, 
  slideInLeftVariants, 
  slideInRightVariants
} from '../utils/animations'

export const ContactPage = () => {
  const handleContactSubmit = async (data: ContactFormData) => {
    // Simulate API call
    console.log('Contact form submitted:', data);
    
    // In a real application, this would send data to a backend API
    // For now, we'll simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success
    // throw new Error('Failed to send message'); // Uncomment to test error handling
  };

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Breadcrumb Section */}
      <motion.section 
        className="breadcrumb-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="container">
          <motion.h2 
            className="breadcrumb-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact Us
          </motion.h2>
          <motion.ul 
            className="breadcrumb-nav"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Contact Us</li>
          </motion.ul>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <AnimatedSection>
        <section className="contact-info-section">
          <div className="container">
            <motion.div 
              className="contact-info-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div 
                className="contact-info-item"
                variants={slideUpVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <AnimatedIcon variant="bounce" className="info-icon">
                  <i className="flaticon-pin"></i>
                </AnimatedIcon>
                <div className="info-content">
                  <h3 className="info-title">Our Address</h3>
                  <p className="info-text">Rd. Santa Ana, Illinois 85486, United States</p>
                </div>
              </motion.div>
              <motion.div 
                className="contact-info-item"
                variants={slideUpVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <AnimatedIcon variant="bounce" className="info-icon">
                  <i className="flaticon-telephone-call"></i>
                </AnimatedIcon>
                <div className="info-content">
                  <h3 className="info-title">Phone Number</h3>
                  <p className="info-text">+61 2345 678 990</p>
                  <p className="info-text">+61 2345 678 991</p>
                </div>
              </motion.div>
              <motion.div 
                className="contact-info-item"
                variants={slideUpVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <AnimatedIcon variant="bounce" className="info-icon">
                  <i className="flaticon-email"></i>
                </AnimatedIcon>
                <div className="info-content">
                  <h3 className="info-title">Email Address</h3>
                  <p className="info-text">info@charitics.org</p>
                  <p className="info-text">support@charitics.org</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Form Section */}
      <AnimatedSection>
        <section className="contact-form-section">
          <div className="container">
            <div className="contact-content">
              <motion.div 
                className="contact-form-wrapper"
                variants={slideInLeftVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div 
                  className="section-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="section-subtitle">Get In Touch</span>
                  <h2 className="section-title">Send Us A Message</h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <ContactForm onSubmit={handleContactSubmit} />
                </motion.div>
              </motion.div>
              <motion.div 
                className="contact-image"
                variants={slideInRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <LazyImage 
                  src="/assets/img/contact-img.jpg" 
                  alt="Contact Us"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Map Section */}
      <AnimatedSection>
        <section className="map-section">
          <div className="container">
            <motion.div 
              className="map-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.9875!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMTUuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Location Map"
              ></iframe>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </motion.div>
  )
}
