export const PricingPage = () => {
  return (
    <div className="pricing-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Pricing Plans</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Pricing Plans</li>
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Our Plans</span>
            <h2 className="section-title">Choose Your Support Level</h2>
            <p className="section-description">
              Select a donation plan that fits your budget and helps us make a greater impact in communities worldwide.
            </p>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="plan-name">Supporter</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">25</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="flaticon-check"></i> Monthly newsletter updates</li>
                  <li><i className="flaticon-check"></i> Impact reports</li>
                  <li><i className="flaticon-check"></i> Community access</li>
                  <li><i className="flaticon-check"></i> Tax deduction receipt</li>
                </ul>
              </div>
              <div className="pricing-footer">
                <a href="/donations" className="btn btn-outline">Choose Plan</a>
              </div>
            </div>

            <div className="pricing-card featured">
              <div className="pricing-header">
                <div className="featured-badge">Most Popular</div>
                <h3 className="plan-name">Advocate</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">50</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="flaticon-check"></i> All Supporter benefits</li>
                  <li><i className="flaticon-check"></i> Quarterly video calls</li>
                  <li><i className="flaticon-check"></i> Project visit opportunities</li>
                  <li><i className="flaticon-check"></i> Exclusive event invitations</li>
                  <li><i className="flaticon-check"></i> Direct project updates</li>
                </ul>
              </div>
              <div className="pricing-footer">
                <a href="/donations" className="btn btn-primary">Choose Plan</a>
              </div>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="plan-name">Champion</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">100</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <div className="pricing-features">
                <ul>
                  <li><i className="flaticon-check"></i> All Advocate benefits</li>
                  <li><i className="flaticon-check"></i> Annual recognition dinner</li>
                  <li><i className="flaticon-check"></i> Project naming opportunities</li>
                  <li><i className="flaticon-check"></i> Board meeting invitations</li>
                  <li><i className="flaticon-check"></i> Custom impact dashboard</li>
                </ul>
              </div>
              <div className="pricing-footer">
                <a href="/donations" className="btn btn-outline">Choose Plan</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-content">
            <div className="faq-item">
              <h3 className="faq-question">Can I change my plan anytime?</h3>
              <p className="faq-answer">
                Yes, you can upgrade or downgrade your plan at any time. Changes will take effect in your next billing cycle.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Are donations tax-deductible?</h3>
              <p className="faq-answer">
                Yes, all donations are tax-deductible. You will receive a receipt for tax purposes after each donation.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How is my donation used?</h3>
              <p className="faq-answer">
                We ensure transparency in all our operations. You'll receive regular reports showing exactly how your donation is making an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of supporters who are helping us create positive change in communities worldwide.
            </p>
            <a href="/donations" className="btn btn-secondary">Start Supporting Today</a>
          </div>
        </div>
      </section>
    </div>
  )
}
