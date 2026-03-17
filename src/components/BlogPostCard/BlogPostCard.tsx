import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types';
import { cardHoverVariants } from '../../utils/animations'
import { LazyImage } from '../LazyImage/LazyImage'
import './BlogPostCard.css';

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      className="blog-card"
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="blog-image">
        <LazyImage src={post.featuredImage} alt={post.title} />
      </div>
      <div className="blog-content">
        <div className="blog-meta">
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
        <h3 className="blog-title">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link to={`/blog/${post.id}`} className="blog-link">Read More →</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
