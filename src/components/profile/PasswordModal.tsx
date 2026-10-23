import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import { updateUser } from "../../app-store/slice/authSlice";
import { showSuccess } from "../../utils/toast";

import type { User } from "../../types/user";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const createEmptyPasswordState =
  (): PasswordFormState => ({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

function PasswordModal({
  onClose,
  isOpen,
}: PasswordModalProps) {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  if (!isOpen || !user) {
    return null;
  }

  // Mounting the form only while open gives it fresh state every time.
  return <PasswordForm user={user} onClose={onClose} />;
}

interface PasswordFormProps {
  user: User;
  onClose: () => void;
}

function PasswordForm({
  user,
  onClose,
}: PasswordFormProps) {
  const dispatch = useAppDispatch();

  const [passwordState, setPasswordState] =
    useState<PasswordFormState>(
      createEmptyPasswordState()
    );

  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (error) {
      setError("");
    }

    setPasswordState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordState;

    if (currentPassword !== user.password) {
      setError("Invalid current password");
      return;
    }

    if (newPassword === currentPassword) {
      setError(
        "New password cannot be same as your current password"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to change your password?"
      )
    ) {
      return;
    }

    dispatch(
      updateUser({
        password: newPassword,
      })
    );

    setPasswordState(
      createEmptyPasswordState()
    );

    setError("");

    onClose();

    showSuccess(
      "Password changed successfully."
    );
  };

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">

        <div className="modal-header">
          <h2>Change Password</h2>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handlePasswordSubmit}
          className="password-form"
        >
          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <div className="modal-body">

            <label htmlFor="current-password">
              Current password:
            </label>

            <input
              type="password"
              name="currentPassword"
              id="current-password"
              placeholder="Enter your current password"
              minLength={8}
              value={passwordState.currentPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="new-password">
              New password:
            </label>

            <input
              type="password"
              name="newPassword"
              id="new-password"
              placeholder="Enter a new password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              minLength={8}
              value={passwordState.newPassword}
              onChange={handleChange}
              required
            />

            <p className="password-help">
              Password must be at least 8 characters
              and include an uppercase letter, a
              lowercase letter, a number, and a
              special character.
            </p>

            <label htmlFor="confirm-password">
              Confirm Password:
            </label>

            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Confirm your new password"
              value={passwordState.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>

          <div className="modal-footer">

            <button
              type="submit"
              className="button"
            >
              Save Password
            </button>

            <button
              type="button"
              className="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}

export default PasswordModal;