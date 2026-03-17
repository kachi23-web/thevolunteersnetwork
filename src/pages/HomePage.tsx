import { motion } from 'framer-motion'
import { useState } from 'react'
import { AnimatedSection, LazyImage } from '../components'
import { useScrollAnimation, useParallax, useCountUp } from '../hooks'
import { 
  pageTransitionVariants, 
  fadeInVariants, 
  slideUpVariants, 
  staggerContainerVariants
} from '../utils/animations'
import './HomePage.css'

export const HomePage = () => {
  const { ref: statsRef } = useScrollAnimation({ threshold: 0.3 })
  const bannerParallaxY = useParallax({ speed: 0.3 })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Counter animations for stats
  const volunteersCount = useCountUp({ end: 70, duration: 2000 })
  const projectsCount = useCountUp({ end: 12, duration: 2000 })
  const livesCount = useCountUp({ end: 15, duration: 2000 })
  const partnersCount = useCountUp({ end: 10, duration: 2000 })

  // Keyboard navigation for lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && selectedImage) {
      setSelectedImage(null)
    }
  }

  const donations = [
    {
      id: 1,
      title: 'Clean Water Initiative',
      description: 'Providing clean water access to rural communities in need.',
      image: '/assets/img/donation-1.jpg',
      raised: 45000,
      goal: 60000,
      category: 'Water'
    },
    {
      id: 2,
      title: 'Education for All',
      description: 'Building schools and providing educational resources.',
      image: '/assets/img/donation-2.jpg',
      raised: 32000,
      goal: 50000,
      category: 'Education'
    },
    {
      id: 3,
      title: 'Healthcare Access',
      description: 'Mobile clinics bringing healthcare to remote areas.',
      image: '/assets/img/donation-3.jpg',
      raised: 28000,
      goal: 40000,
      category: 'Health'
    }
  ]

  const events = [
    {
      id: 1,
      day: '15',
      month: 'Apr',
      title: 'Community Cleanup Drive',
      location: 'Central Park',
      description: 'Join us for a city-wide cleanup initiative.'
    },
    {
      id: 2,
      day: '22',
      month: 'Apr',
      title: 'Volunteer Training Workshop',
      location: 'Community Center',
      description: 'Learn essential skills for effective volunteering.'
    },
    {
      id: 3,
      day: '30',
      month: 'Apr',
      title: 'Fundraising Gala',
      location: 'Grand Hotel',
      description: 'Annual charity gala supporting our programs.'
    }
  ]

  const team = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Executive Director',
      image: '/assets/img/team-1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Program Coordinator',
      image: '/assets/img/team-2.jpg'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Community Outreach',
      image: '/assets/img/team-3.jpg'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Volunteer Manager',
      image: '/assets/img/team-4.jpg'
    }
  ]

  const testimonials = [
    {
      id: 1,
      text: 'Volunteering with this organization has been life-changing. The impact we make together is incredible.',
      author: 'Jessica Martinez',
      role: 'Volunteer',
      image: '/assets/img/testimonial-1.jpg'
    },
    {
      id: 2,
      text: 'The support and training provided made me feel confident in making a real difference in my community.',
      author: 'Robert Kim',
      role: 'Community Leader',
      image: '/assets/img/testimonial-2.jpg'
    },
    {
      id: 3,
      text: 'I have seen firsthand how this organization transforms lives and builds stronger communities.',
      author: 'Amanda Foster',
      role: 'Partner Organization',
      image: '/assets/img/testimonial-3.jpg'
    }
  ]

  const blogs = [
    {
      id: 1,
      title: '10 Ways to Make a Difference in Your Community',
      excerpt: 'Discover simple yet powerful ways to create positive change right where you live.',
      image: '/assets/img/blog-1.jpg',
      date: 'March 15, 2026',
      category: 'Community'
    },
    {
      id: 2,
      title: 'The Power of Collective Action',
      excerpt: 'How volunteers working together can achieve extraordinary results.',
      image: '/assets/img/blog-2.jpg',
      date: 'March 10, 2026',
      category: 'Impact'
    },
    {
      id: 3,
      title: 'Volunteer Spotlight: Stories of Change',
      excerpt: 'Meet the volunteers who are making waves in their communities.',
      image: '/assets/img/blog-3.jpg',
      date: 'March 5, 2026',
      category: 'Stories'
    }
  ]

  const gallery = [
    '/assets/img/gallery-1.jpg',
    '/assets/img/gallery-2.jpg',
    '/assets/img/gallery-3.jpg',
    '/assets/img/gallery-4.jpg',
    '/assets/img/gallery-5.jpg',
    '/assets/img/gallery-6.jpg',
    '/assets/img/gallery-7.jpg',
    '/assets/img/gallery-8.jpg'
  ]

  return (
    <motion.div 
      className="home-page"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Banner Section */}
      <motion.section 
        className="banner-section"
        style={{ y: bannerParallaxY }}
      >
        <div className="banner-content">
          <motion.span 
            className="banner-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            Building a Global Network of Changemakers
          </motion.span>
          <motion.h1 
            className="banner-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering Communities Through{' '}
            <motion.span
              style={{ display: 'inline-block' }}
              animate={{ 
                color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF6B6B'],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              Volunteer Action
            </motion.span>
          </motion.h1>
          <motion.p 
            className="banner-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Join our network of passionate volunteers making a real difference in communities worldwide. Together, we create lasting positive change.
          </motion.p>
          <motion.div 
            className="banner-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a 
              href="/donations" 
              className="ul-btn ul-btn-primary"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.i 
                className="flaticon-love"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.i>
              Donate Now
            </motion.a>
            <motion.a 
              href="/about" 
              className="ul-btn ul-btn-secondary"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px rgba(69, 183, 209, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <AnimatedSection>
        <section className="features-section">
          <div className="ul-container">
            <motion.div 
              className="features-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {[
                { icon: 'flaticon-account', title: 'Volunteer Mobilization', description: 'Connect with opportunities that match your passion and skills.', color: '#FF6B6B' },
                { icon: 'flaticon-love', title: 'Community Impact', description: 'Create lasting change in communities that need it most.', color: '#4ECDC4' },
                { icon: 'flaticon-relationship', title: 'Strategic Partnerships', description: 'Collaborate with organizations driving sustainable impact.', color: '#45B7D1' }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="feature-item"
                  variants={slideUpVariants}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: `0 15px 40px ${feature.color}33`,
                    transition: { duration: 0.3 } 
                  }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 } 
                    }}
                  >
                    <i className={feature.icon}></i>
                  </motion.div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="section-description">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection>
        <section className="about-section">
          <div className="ul-container">
            <div className="about-content">
              <motion.div 
                className="about-image"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <LazyImage 
                  src="/assets/img/about-2-img.jpg" 
                  alt="About The Volunteer Nations" 
                  priority={true}
                  width={600}
                  height={400}
                />
                <motion.div 
                  className="about-stat"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <span className="stat-number">5+</span>
                  <span className="stat-text">Years Building Communities</span>
                </motion.div>
              </motion.div>
              <motion.div 
                className="about-text"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              >
                <span className="section-subtitle">About The Volunteer Nations</span>
                <h2 className="section-title">Building a Global Community of Changemakers</h2>
                <p className="section-description">
                  We connect passionate volunteers with organizations driving sustainable impact worldwide. Through strategic partnerships and comprehensive support, we create meaningful change in communities everywhere.
                </p>
                <div className="about-blocks">
                  <motion.div 
                    className="about-block"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="block-icon">
                      <img src="/assets/img/icon-mission.svg" alt="Mission" />
                    </div>
                    <div>
                      <h4 className="block-title">Our Mission</h4>
                      <p className="block-description">Empowering volunteers to create sustainable community impact.</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="about-block"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="block-icon">
                      <img src="/assets/img/icon-vision.svg" alt="Vision" />
                    </div>
                    <div>
                      <h4 className="block-title">Our Vision</h4>
                      <p className="block-description">A world where every community thrives through collective action.</p>
                    </div>
                  </motion.div>
                </div>
                <motion.a 
                  href="/about" 
                  className="ul-btn ul-btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="flaticon-right-arrow"></i>
                  Explore More
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Donations Section */}
      <AnimatedSection>
        <section className="donations-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Make a Difference
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Featured Campaigns
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Support our active campaigns and help us reach our goals
              </motion.p>
            </div>
            <motion.div 
              className="donations-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {donations.map((donation) => {
                const progress = (donation.raised / donation.goal) * 100
                return (
                  <motion.div 
                    key={donation.id}
                    className="donation-card"
                    variants={slideUpVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="donation-image">
                      <LazyImage 
                        src={donation.image} 
                        alt={donation.title}
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="donation-content">
                      <h3 className="donation-title">{donation.title}</h3>
                      <p className="donation-description">{donation.description}</p>
                      <div className="donation-progress">
                        <div className="progress-bar">
                          <motion.div 
                            className="progress-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                        <div className="progress-stats">
                          <span>Raised: ${donation.raised.toLocaleString()}</span>
                          <span>Goal: ${donation.goal.toLocaleString()}</span>
                        </div>
                      </div>
                      <motion.a 
                        href={`/donation-details/${donation.id}`}
                        className="ul-btn ul-btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Donate Now
                      </motion.a>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection>
        <section className="stats-section">
          <div className="ul-container">
            <motion.div 
              className="stats-grid"
              ref={statsRef}
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div className="stat-item" variants={fadeInVariants}>
                <motion.i 
                  className="flaticon-team"
                  whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                ></motion.i>
                <div className="stat-number" ref={volunteersCount.ref}>
                  {volunteersCount.count}+
                </div>
                <div className="stat-text">Volunteers Mobilized</div>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInVariants}>
                <motion.i 
                  className="flaticon-relationship"
                  whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                ></motion.i>
                <div className="stat-number" ref={projectsCount.ref}>
                  {projectsCount.count}
                </div>
                <div className="stat-text">Projects Completed</div>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInVariants}>
                <motion.i 
                  className="flaticon-love"
                  whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                ></motion.i>
                <div className="stat-number" ref={livesCount.ref}>
                  {livesCount.count}K+
                </div>
                <div className="stat-text">Lives Touched</div>
              </motion.div>
              <motion.div className="stat-item" variants={fadeInVariants}>
                <motion.i 
                  className="flaticon-star"
                  whileHover={{ scale: 1.2, rotate: 360, transition: { duration: 0.5 } }}
                ></motion.i>
                <div className="stat-number" ref={partnersCount.ref}>
                  {partnersCount.count}+
                </div>
                <div className="stat-text">Partner Organizations</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Events Section */}
      <AnimatedSection>
        <section className="events-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Join Us
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Upcoming Events
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Participate in our community events and make a difference
              </motion.p>
            </div>
            <motion.div 
              className="events-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {events.map((event) => (
                <motion.div 
                  key={event.id}
                  className="event-card"
                  variants={slideUpVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className="event-date"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  >
                    <span className="date-day">{event.day}</span>
                    <span className="date-month">{event.month}</span>
                  </motion.div>
                  <div className="event-info">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-location">
                      <i className="flaticon-location"></i> {event.location}
                    </p>
                    <p className="event-description">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="/events" 
                className="ul-btn ul-btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Events
              </motion.a>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection>
        <section className="team-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Meet Our Team
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Dedicated Leaders
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Our passionate team working to create positive change
              </motion.p>
            </div>
            <motion.div 
              className="team-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {team.map((member) => (
                <motion.div 
                  key={member.id}
                  className="team-member"
                  variants={slideUpVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="member-image">
                    <LazyImage 
                      src={member.image} 
                      alt={member.name}
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="/team" 
                className="ul-btn ul-btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet Full Team
              </motion.a>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section className="testimonials-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                What People Say
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Volunteer Stories
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Hear from our community members about their experiences
              </motion.p>
            </div>
            <motion.div 
              className="testimonials-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="testimonial-card"
                  variants={slideUpVariants}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <LazyImage 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      width={60}
                      height={60}
                    />
                    <div>
                      <h4 className="author-name">{testimonial.author}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection>
        <section className="blog-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Latest News
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                From Our Blog
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Stay updated with our latest stories and insights
              </motion.p>
            </div>
            <motion.div 
              className="blog-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {blogs.map((blog) => (
                <motion.div 
                  key={blog.id}
                  className="blog-card"
                  variants={slideUpVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <div className="blog-image">
                    <LazyImage 
                      src={blog.image} 
                      alt={blog.title}
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-date">{blog.date}</span>
                      <span className="blog-category">{blog.category}</span>
                    </div>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-excerpt">{blog.excerpt}</p>
                    <motion.a 
                      href={`/blog-details/${blog.id}`}
                      className="blog-link"
                      whileHover={{ x: 5 }}
                    >
                      Read More <i className="flaticon-right-arrow"></i>
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              style={{ textAlign: 'center', marginTop: 'clamp(2rem, 4vw, 3rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="/blog" 
                className="ul-btn ul-btn-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Posts
              </motion.a>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Gallery Section */}
      <AnimatedSection>
        <section className="gallery-section">
          <div className="ul-container">
            <div className="section-heading">
              <motion.span 
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Our Impact
              </motion.span>
              <motion.h2 
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Gallery
              </motion.h2>
              <motion.p 
                className="section-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                See our volunteers in action making a difference
              </motion.p>
            </div>
            <motion.div 
              className="gallery-grid"
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {gallery.map((image, idx) => (
                <motion.div 
                  key={idx}
                  className="gallery-item"
                  variants={fadeInVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedImage(image)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedImage(image)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View gallery image ${idx + 1}`}
                >
                  <LazyImage 
                    src={image} 
                    alt={`Gallery image ${idx + 1}`}
                    width={300}
                    height={300}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Lightbox for Gallery */}
      {selectedImage && (
        <motion.div 
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
        >
          <motion.div 
            className="lightbox-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
              autoFocus
            >
              <i className="flaticon-close"></i>
            </button>
            <img src={selectedImage} alt="Gallery enlarged view" />
          </motion.div>
        </motion.div>
      )}

    </motion.div>
  )
}
