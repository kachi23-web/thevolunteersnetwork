import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { SEO } from '../SEO/SEO'
import { SkipToContent } from '../SkipToContent/SkipToContent'
import { PageTransition } from '../PageTransition/PageTransition'
import { smoothPageTransitionVariants } from '../../utils/animations'

interface LayoutProps {
  children: ReactNode
  pageTitle?: string
  showBreadcrumb?: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  isLoading?: boolean
}

export const Layout = ({ 
  children, 
  pageTitle, 
  showBreadcrumb = false,
  seoTitle,
  seoDescription,
  seoKeywords,
  isLoading = false
}: LayoutProps) => {
  return (
    <div className="layout-wrapper">
      <SkipToContent />
      <SEO 
        title={seoTitle || pageTitle || 'Charitics - Making a Difference Together'}
        description={seoDescription}
        keywords={seoKeywords}
      />
      <Header currentPage={pageTitle} />
      <PageTransition isLoading={isLoading}>
        <motion.main
          id="main-content"
          className="main-content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={smoothPageTransitionVariants}
        >
          {showBreadcrumb && pageTitle && (
            <motion.div 
              className="breadcrumb-section"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="container">
                <motion.h1
                  className="breadcrumb-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {pageTitle}
                </motion.h1>
              </div>
            </motion.div>
          )}
          {children}
        </motion.main>
      </PageTransition>
      <Footer />
    </div>
  )
}
