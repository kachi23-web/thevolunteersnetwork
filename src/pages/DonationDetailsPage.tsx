import { useState } from 'react';
import { DonationForm, LoadingSpinner, LazyImage } from '../components';
import type { DonationFormData } from '../components';
import { useApp } from '../contexts';

export const DonationDetailsPage = () => {
  const { donations, addDonationAmount, isLoading } = useApp();
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const campaign = donations[0];

  const handleDonationSubmit = async (data: DonationFormData) => {
    console.log('Donation submitted:', data);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      addDonationAmount(campaign.id, data.amount);
      
      setSubmissionStatus({
        type: 'success',
        message: `Thank you for your donation of $${data.amount.toFixed(2)}! We will send a confirmation email to ${data.email}.`,
      });

      setTimeout(() => {
        setSubmissionStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      setSubmissionStatus({
        type: 'error',
        message: 'There was an error processing your donation. Please try again.',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading donation details..." />;
  }

  if (!campaign) {
    return (
      <div className="error-message" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#dc3545', fontSize: '1.125rem' }}>Campaign not found</p>
      </div>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="donation-details-page">
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Donation Details</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li><a href="/donations">Donations</a></li>
            <li><span className="separator">›</span></li>
            <li>Donation Details</li>
          </ul>
        </div>
      </section>

      <section className="donation-details-section">
        <div className="container">
          <div className="donation-details-content">
            <div className="donation-details-main">
              <div className="donation-details-image">
                <LazyImage src={campaign.image} alt={campaign.title} />
              </div>

              <h2 className="donation-details-title">{campaign.title}</h2>

              <div className="donation-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
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

              <div className="donation-details-description">
                <p>{campaign.description}</p>
                <p>
                  Your donation will provide school supplies, textbooks, uniforms, and
                  tuition assistance to children who would otherwise be unable to attend
                  school. Every contribution makes a difference in a child's life.
                </p>
              </div>

              {submissionStatus.type && (
                <div
                  className={`submission-message ${submissionStatus.type}`}
                  style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '8px',
                    backgroundColor: submissionStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: submissionStatus.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submissionStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  }}
                >
                  {submissionStatus.message}
                </div>
              )}

              <DonationForm
                onSubmit={handleDonationSubmit}
                presetAmounts={[10, 20, 30, 40, 50]}
                defaultAmount={10}
              />
            </div>

            <div className="donation-details-sidebar">
              <div className="sidebar-widget">
                <h3 className="widget-title">Campaign Info</h3>
                <ul className="campaign-info-list">
                  <li>
                    <span className="label">Category:</span>
                    <span className="value">{campaign.category}</span>
                  </li>
                  <li>
                    <span className="label">Location:</span>
                    <span className="value">Global</span>
                  </li>
                  <li>
                    <span className="label">Start Date:</span>
                    <span className="value">January 1, 2024</span>
                  </li>
                  <li>
                    <span className="label">End Date:</span>
                    <span className="value">December 31, 2024</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3 className="widget-title">Recent Donors</h3>
                <ul className="recent-donors-list">
                  <li>
                    <span className="donor-name">Anonymous</span>
                    <span className="donor-amount">$50</span>
                  </li>
                  <li>
                    <span className="donor-name">John Smith</span>
                    <span className="donor-amount">$100</span>
                  </li>
                  <li>
                    <span className="donor-name">Sarah Johnson</span>
                    <span className="donor-amount">$25</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
