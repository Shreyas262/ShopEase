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
import { loadUsers } from "../../utils/localStorage";
import { showSuccess } from "../../utils/toast";

import type { User } from "../../types/user";

import "../../pages/profile/profile.scss";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditProfileModal({isOpen,onClose}: EditProfileModalProps) {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  if (!isOpen || !user) {
    return null;
  }

  // Mounting the form only while open gives it fresh state every time.
  return <EditProfileForm user={user} onClose={onClose} />;
}

interface EditProfileFormProps {
  user: User;
  onClose: () => void;
}

function EditProfileForm({ user, onClose }: EditProfileFormProps) {
  const dispatch = useAppDispatch();

  const [updatedUserState, setUpdatedUserState] =
    useState<User>(user);

  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (error) {
      setError("");
    }

    setUpdatedUserState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formattedUser: User = {
      ...updatedUserState,
      firstName: updatedUserState.firstName.trim(),
      lastName: updatedUserState.lastName.trim(),
      phone: updatedUserState.phone.trim(),
    };

    const phoneTaken = loadUsers().some(
      (existingUser) =>
        existingUser.id !== user.id &&
        existingUser.phone === formattedUser.phone
    );

    if (phoneTaken) {
      setError("A user already exists with this phone number.");
      return;
    }

    const confirmEdit = window.confirm(
      "Apply changes to your profile?"
    );

    if (confirmEdit) {
      dispatch(updateUser(formattedUser));

      showSuccess("Profile updated successfully.");

      onClose();
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">

        <div className="modal-header">
          <h2>Edit Profile</h2>

          <button
            onClick={onClose}
            type="button"
            className="modal-close-btn"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form
          className="edit-profile-form"
          onSubmit={handleFormSubmit}
        >
          <div className="modal-body">

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <label htmlFor="userFirstName">
              First Name:
            </label>

            <input
              type="text"
              name="firstName"
              id="userFirstName"
              placeholder="Change your first name"
              value={updatedUserState.firstName}
              onChange={handleChange}
              required
            />

            <label htmlFor="userLastName">
              Last Name:
            </label>

            <input
              type="text"
              name="lastName"
              id="userLastName"
              placeholder="Change your last name"
              value={updatedUserState.lastName}
              onChange={handleChange}
              required
            />

            <label htmlFor="userPhone">
              Phone Number:
            </label>

            <input
              type="text"
              name="phone"
              id="userPhone"
              placeholder="e.g. 9876543210"
              inputMode="numeric"
              pattern="^[0-9]{10}$"
              title="Enter a 10-digit phone number"
              maxLength={10}
              minLength={10}
              value={updatedUserState.phone}
              onChange={handleChange}
              required
            />

          </div>

          <div className="modal-footer">

            <button
              type="submit"
              className="button"
            >
              Save
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

export default EditProfileModal;
