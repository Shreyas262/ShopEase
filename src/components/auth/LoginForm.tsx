import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppDispatch } from "../../app-store/storeHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../app-store/slice/authSlice";
import { loadCart, loadUsers, loadWishlist } from "../../utils/localStorage";
import { setCart } from "../../app-store/slice/cartSlice";
import { setWishlist } from "../../app-store/slice/wishlistSlice";
import { showSuccess, showError } from "../../utils/toast";

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginState: LoginFormState = {
  email: "",
  password: "",
}

function LoginForm() {
  
  const [loginState, setLoginState] = useState<LoginFormState>(initialLoginState);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute passes the page the user was trying to reach.
  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? "/";
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    if(error) setError("")

    const { name, value } = e.target;
    setLoginState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const allUsers = loadUsers();
    const email = loginState.email.trim().toLowerCase();
    const user = allUsers.find(u => u.email.toLowerCase() === email)

    if (!user || user.password !== loginState.password) {
      setError("Invalid e-mail or password")
      showError("Invalid e-mail or password")
      return;
    }

    dispatch(login(user));
    dispatch(setCart(loadCart(user.id)));
    dispatch(setWishlist(loadWishlist(user.id)))

    setLoginState(initialLoginState)
    showSuccess(`Welcome back, ${user.firstName}!`);
    navigate(redirectTo, { replace: true });
  }

  return (
    <form className="login-form" onSubmit={handleFormSubmit}>
      {error && <p className="error">{error}</p>}

      <label htmlFor="login-email">Email: </label>
      <input
        type="email"
        name="email"
        id="login-email"
        placeholder="e.g. abc@email.com "
        value={loginState.email}
        onChange={handleChange}
        required
      />  

      <label htmlFor="login-password">Password: </label>
      <input
        type="password"
        name="password"
        id="login-password"
        placeholder="Enter your password"
        value={loginState.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="button">Login</button>

    </form>
  );
}

export default LoginForm
