import { EventCard } from '../components';
import { events } from '../data';

export const EventsPage = () => {
  return (
    <div className="events-page">
      {/* Breadcrumb Section */}
      <section className="ul-breadcrumb">
        <div className="ul-container">
          <h2 className="ul-breadcrumb-title">Events</h2>
          <ul className="ul-breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Events</li>
          </ul>
        </div>
      </section>

      {/* Events Listing Section */}
      <section className="ul-section-spacing">
        <div className="ul-container">
          <div className="ul-section-heading">
            <div>
              <span className="ul-section-sub-title">Upcoming Events</span>
              <h2 className="ul-section-title">Join Our Latest Events & Activities</h2>
              <p className="ul-section-descr">
                Participate in our community events and make a difference. From fundraising galas to volunteer activities, there's something for everyone.
              </p>
            </div>
          </div>

          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="ul-section-spacing bg-light">
        <div className="ul-container">
          <div className="cta-content text-center">
            <h2 className="ul-section-title">Want to Organize an Event?</h2>
            <p className="ul-section-descr">
              Contact us to learn how you can host a fundraising event in your community.
            </p>
            <a href="/contact" className="btn-cta">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  )
}
