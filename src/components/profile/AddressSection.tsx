import { useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import { updateUser } from "../../app-store/slice/authSlice";
import { showSuccess } from "../../utils/toast";

import type { Address } from "../../types/address";

import AddressCard from "./AddressCard";
import AddressModal from "./AddressModal";

function AddressSection() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingAddress, setEditingAddress] =
    useState<Address | null>(null);

  if (!user) {
    return null;
  }

  const handleAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (
    address: Address
  ) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (address: Address) => {
    if (user.addresses.length <= 1) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) {
      return;
    }

    const updatedAddresses = user.addresses.filter(
      (item) => item.id !== address.id
    );

    dispatch(
      updateUser({
        addresses: updatedAddresses,
      })
    );

    showSuccess(
      "Address deleted successfully."
    );
  };

  return (
    <section className="address-section card">
      <div className="section-header">
        <h3>Addresses</h3>

        <button
          type="button"
          className="button"
          onClick={handleAdd}
        >
          Add Address
        </button>
      </div>

      <div className="address-list">
        {user.addresses.map((address, index) => (
          <AddressCard
            key={address.id}
            address={address}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={editingAddress ? "edit" : "add"}
        address={editingAddress}
      />
    </section>
  );
}

export default AddressSection;