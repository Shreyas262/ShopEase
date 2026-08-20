import RegisterForm from "../../components/auth/RegisterForm";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import SEO from "../../components/seo/SEO";

import "./auth.scss";

function Register() {
  return (
    <main className="register-section">

      <SEO
        title="Create Account"
        description="Create a ShopEase account to start shopping, save products, and track your orders."
      />

      <div className="register-container">

        <AuthHeader
          title="Register"
          subtitle="Create an account and continue shopping."
        />

        <RegisterForm />

        <AuthFooter
          text="Already have an account?"
          linkText="Login"
          to="/login"
        />

      </div>

    </main>
  );
}

export default Register;