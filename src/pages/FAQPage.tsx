export const FAQPage = () => {
  return (
    <div className="faq-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Frequently Asked Questions</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>FAQ</li>
          </ul>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-content-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Help Center</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Find answers to common questions about our organization, donation process, and how you can get involved.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-category">
              <h3 className="category-title">General Questions</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4 className="faq-question">What is Charitics?</h4>
                  <p className="faq-answer">
                    Charitics is a non-profit organization dedicated to making a positive impact in communities worldwide through various charitable programs and initiatives.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">How long has Charitics been operating?</h4>
                  <p className="faq-answer">
                    We have been serving communities for over 15 years, bringing hope and positive change to thousands of lives across the globe.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">What areas do you focus on?</h4>
                  <p className="faq-answer">
                    Our focus areas include education, healthcare, clean water access, community development, and emergency relief efforts.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-category">
              <h3 className="category-title">Donations & Funding</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4 className="faq-question">How can I donate?</h4>
                  <p className="faq-answer">
                    You can donate through our website using various payment methods including credit cards, bank transfers, and digital wallets.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Are donations tax-deductible?</h4>
                  <p className="faq-answer">
                    Yes, all donations to Charitics are tax-deductible. You will receive a receipt for tax purposes after each donation.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">How is my donation used?</h4>
                  <p className="faq-answer">
                    We ensure transparency in all operations. 85% of donations go directly to programs, 10% to administration, and 5% to fundraising efforts.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Can I specify how my donation is used?</h4>
                  <p className="faq-answer">
                    Yes, you can designate your donation for specific programs or projects. We'll ensure your contribution goes exactly where you intended.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-category">
              <h3 className="category-title">Volunteering</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4 className="faq-question">How can I volunteer?</h4>
                  <p className="faq-answer">
                    Contact us through our volunteer form or visit our office. We have various opportunities both locally and internationally.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Do I need special skills to volunteer?</h4>
                  <p className="faq-answer">
                    Not necessarily. We have opportunities for people with all skill levels. We also provide training for specific roles when needed.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">What is the time commitment?</h4>
                  <p className="faq-answer">
                    Time commitments vary by role. Some opportunities require just a few hours, while others may need longer-term dedication.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-category">
              <h3 className="category-title">Transparency & Impact</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4 className="faq-question">How do you measure impact?</h4>
                  <p className="faq-answer">
                    We use various metrics including lives impacted, projects completed, and community feedback to measure our effectiveness.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">Can I visit project sites?</h4>
                  <p className="faq-answer">
                    Yes, we organize visits for major donors and volunteers. Contact us to learn about upcoming opportunities.
                  </p>
                </div>
                <div className="faq-item">
                  <h4 className="faq-question">How often do you publish reports?</h4>
                  <p className="faq-answer">
                    We publish annual impact reports and quarterly updates. All reports are available on our website for transparency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="contact-cta-content">
            <h2 className="contact-cta-title">Still Have Questions?</h2>
            <p className="contact-cta-description">
              Our team is here to help. Reach out to us for any additional questions or information.
            </p>
            <div className="contact-cta-buttons">
              <a href="/contact" className="btn btn-primary">Contact Us</a>
              <a href="mailto:info@charitics.org" className="btn btn-secondary">Email Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
