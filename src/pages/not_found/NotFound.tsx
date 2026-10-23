import { Link } from "react-router-dom"
import SEO from "../../components/seo/SEO"
import "./notFound.scss"

function NotFound() {
  return (
    <main className="not-found">
      <SEO
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
      />

      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for doesn't exist or has been moved.</p>

      <div className="not-found-actions">
        <Link to="/" className="button">Back to home</Link>
        <Link to="/products" className="not-found-secondary">Browse products</Link>
      </div>
    </main>
  )
}

export default NotFound
