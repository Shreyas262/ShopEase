interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <header className="auth-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default AuthHeader;