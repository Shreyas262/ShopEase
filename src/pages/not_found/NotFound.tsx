import { Link } from "react-router-dom"
import SEO from "../../components/seo/SEO"

function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10%"}}>
      <SEO
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
      />
      <h1>Page not found</h1><br />
      <p>The page you are looking for doesn't exist or has been moved.</p><br />
      <div>
        <p><Link to={"/"} className="button">Click here</Link>
        <span> to return to the home page</span></p>
      </div>
    </div>
  )
}

export default NotFound
