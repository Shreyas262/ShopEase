import { Link } from "react-router-dom";

interface AuthFooterProps {
  to: string;
  linkText: string;
  text: string;
}

function AuthFooter({
  to,
  linkText,
  text,
}: AuthFooterProps) {
  return (
    <footer className="auth-footer">
      <p>
        {text}

        <Link to={to}>
          {linkText}
        </Link>
      </p>
    </footer>
  );
}

export default AuthFooter;