import type { Event } from '../types';

export const events: Event[] = [
  {
    id: '1',
    title: 'Annual Charity Gala',
    description: 'Join us for our annual charity gala event featuring dinner, entertainment, and fundraising activities. All proceeds go directly to our community programs.',
    date: new Date('2025-12-25'),
    time: '10:00 AM - 4:00 PM',
    venue: 'Grand Ballroom',
    location: 'New York, USA',
    image: '/assets/img/event-img.jpg',
    registrationUrl: '/event-details'
  },
  {
    id: '2',
    title: 'Community Outreach Program',
    description: 'Help us reach out to local communities with essential services, food distribution, and health screenings. Volunteers are welcome to participate.',
    date: new Date('2026-01-15'),
    time: '9:00 AM - 5:00 PM',
    venue: 'Community Center',
    location: 'Los Angeles, USA',
    image: '/assets/img/event-img.jpg',
    registrationUrl: '/event-details'
  },
  {
    id: '3',
    title: 'Fundraising Marathon',
    description: 'Participate in our charity marathon to raise funds for children\'s education. All fitness levels are welcome, and every step counts toward making a difference.',
    date: new Date('2026-02-05'),
    time: '2:00 PM - 6:00 PM',
    venue: 'City Park',
    location: 'Chicago, USA',
    image: '/assets/img/event-img.jpg',
    registrationUrl: '/event-details'
  },
  {
    id: '4',
    title: 'Volunteer Training Workshop',
    description: 'Join our comprehensive volunteer training workshop to learn about our programs, best practices, and how you can make the most impact in your community service.',
    date: new Date('2026-02-20'),
    time: '11:00 AM - 3:00 PM',
    venue: 'Training Center',
    location: 'Boston, USA',
    image: '/assets/img/event-img.jpg',
    registrationUrl: '/event-details'
  },
  {
    id: '5',
    title: 'Benefit Concert for Education',
    description: 'Enjoy an evening of music and entertainment while supporting education initiatives. Local artists will perform to raise funds for school supplies and scholarships.',
    date: new Date('2026-03-10'),
    time: '6:00 PM - 9:00 PM',
    venue: 'Concert Hall',
    location: 'Seattle, USA',
    image: '/assets/img/event-img.jpg',
    registrationUrl: '/event-details'
  }
];
