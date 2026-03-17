import { BlogPostCard } from '../components';
import { blogPosts } from '../data';

export const BlogPage = () => {
  return (
    <div className="blog-page">
      {/* Breadcrumb Section */}
      <section className="breadcrumb-section">
        <div className="container">
          <h2 className="breadcrumb-title">Blog</h2>
          <ul className="breadcrumb-nav">
            <li><a href="/">Home</a></li>
            <li><span className="separator">›</span></li>
            <li>Blog</li>
          </ul>
        </div>
      </section>

      {/* Blog Listing Section */}
      <section className="blog-listing-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-subtitle">Latest News</span>
            <h2 className="section-title">Our Blog & Articles</h2>
            <p className="section-description">
              Stay updated with our latest news, stories, and insights from our charitable work around the world.
            </p>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">Next →</button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-description">
              Stay updated with our latest news, stories, and events.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
