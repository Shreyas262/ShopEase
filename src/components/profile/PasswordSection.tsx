import { useState } from "react";
import PasswordModal from "./PasswordModal";

function PasswordSection() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <section className="password-section">
      <h3>🔒 Password</h3>

      <p>
        Keep your account secure by updating your
        password regularly.
      </p>

      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        Change Password
      </button>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

export default PasswordSection;