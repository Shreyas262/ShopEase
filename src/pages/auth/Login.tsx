import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import LoginForm from "../../components/auth/LoginForm";
import SEO from "../../components/seo/SEO";

import "./auth.scss";

function Login() {
  return (
    <main className="login-section">

      <SEO
        title="Login"
        description="Sign in to your ShopEase account to access your cart, wishlist, and orders."
      />

      <div className="login-container">

        <AuthHeader
          title="Login"
          subtitle="Sign in to continue shopping."
        />

        <LoginForm />

        <AuthFooter
          text="Don't have an account?"
          linkText="Register"
          to="/register"
        />

      </div>

    </main>
  );
}

export default Login;