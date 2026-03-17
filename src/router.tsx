import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Layout, LoadingSpinner } from './components'
import { HomePage } from './pages' // Import HomePage directly for faster initial load

// Lazy load page components for code splitting (except HomePage)
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })))
const DonationsPage = lazy(() => import('./pages/DonationsPage').then(m => ({ default: m.DonationsPage })))
const DonationDetailsPage = lazy(() => import('./pages/DonationDetailsPage').then(m => ({ default: m.DonationDetailsPage })))
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })))
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })))
const BlogDetailsPage = lazy(() => import('./pages/BlogDetailsPage').then(m => ({ default: m.BlogDetailsPage })))
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const TeamPage = lazy(() => import('./pages/TeamPage').then(m => ({ default: m.TeamPage })))
const TeamDetailsPage = lazy(() => import('./pages/TeamDetailsPage').then(m => ({ default: m.TeamDetailsPage })))
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })))
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })))

// Wrapper component for lazy-loaded pages with loading state
const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '60vh' 
    }}>
      <LoadingSpinner />
    </div>
  }>
    {children}
  </Suspense>
)

// Router configuration with all page routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><HomePage /></Layout>, // No lazy loading for HomePage
  },
  {
    path: '/about',
    element: <Layout pageTitle="About Us" showBreadcrumb><LazyPage><AboutPage /></LazyPage></Layout>,
  },
  {
    path: '/contact',
    element: <Layout pageTitle="Contact" showBreadcrumb><LazyPage><ContactPage /></LazyPage></Layout>,
  },
  {
    path: '/donations',
    element: <Layout pageTitle="Donations" showBreadcrumb><LazyPage><DonationsPage /></LazyPage></Layout>,
  },
  {
    path: '/donation-details',
    element: <Layout pageTitle="Donation Details" showBreadcrumb><LazyPage><DonationDetailsPage /></LazyPage></Layout>,
  },
  {
    path: '/events',
    element: <Layout pageTitle="Events" showBreadcrumb><LazyPage><EventsPage /></LazyPage></Layout>,
  },
  {
    path: '/blog',
    element: <Layout pageTitle="Blog" showBreadcrumb><LazyPage><BlogPage /></LazyPage></Layout>,
  },
  {
    path: '/blog/:id',
    element: <Layout pageTitle="Blog Details" showBreadcrumb><LazyPage><BlogDetailsPage /></LazyPage></Layout>,
  },
  {
    path: '/services',
    element: <Layout pageTitle="Services" showBreadcrumb><LazyPage><ServicesPage /></LazyPage></Layout>,
  },
  {
    path: '/projects',
    element: <Layout pageTitle="Projects" showBreadcrumb><LazyPage><ProjectsPage /></LazyPage></Layout>,
  },
  {
    path: '/team',
    element: <Layout pageTitle="Team" showBreadcrumb><LazyPage><TeamPage /></LazyPage></Layout>,
  },
  {
    path: '/team/:id',
    element: <Layout pageTitle="Team Member" showBreadcrumb><LazyPage><TeamDetailsPage /></LazyPage></Layout>,
  },
  {
    path: '/pricing',
    element: <Layout pageTitle="Pricing" showBreadcrumb><LazyPage><PricingPage /></LazyPage></Layout>,
  },
  {
    path: '/faq',
    element: <Layout pageTitle="FAQ" showBreadcrumb><LazyPage><FAQPage /></LazyPage></Layout>,
  },
])

