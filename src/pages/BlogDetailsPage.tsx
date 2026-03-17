import { useParams } from 'react-router-dom';
import { LazyImage } from '../components';
import { blogPosts } from '../data';
import { getBlogPostById, formatDate } from '../utils/contentManagement';
import './BlogDetailsPage.css';

export const BlogDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(blogPosts, id) : undefined;

  if (!post) {
    return (
      <div className="blog-details-error">
        <h2>Blog Post Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
        <a href="/blog" className="btn-primary">Back to Blog</a>
      </div>
    );
  }

  return (
    <div className="blog-details">
      <div className="container">
        <article className="blog-details-content">
          <div className="blog-details-header">
            <div className="blog-details-meta">
              <span className="blog-date">
                <i className="flaticon-calendar"></i> {formatDate(post.publishDate)}
              </span>
              <span className="blog-author">
                <i className="flaticon-user"></i> {post.author}
              </span>
              <span className="blog-category">
                <i className="flaticon-tag"></i> {post.category}
              </span>
            </div>
            <h1 className="blog-details-title">{post.title}</h1>
          </div>

          <div className="blog-details-image">
            <LazyImage src={post.featuredImage} alt={post.title} />
          </div>

          <div className="blog-details-body">
            <div className="blog-excerpt">
              <p>{post.excerpt}</p>
            </div>
            
            <div className="blog-content">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="blog-tags">
              <h4>Tags:</h4>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
