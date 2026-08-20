import { useState } from "react";
import { useAppSelector } from "../../app-store/storeHooks";
import AddressModal from "../profile/AddressModal";
import type { Address } from "../../types/address";
import "./addressSelector.scss";

interface AddressSelectorProps {
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
}

function AddressSelector({
  selectedAddress,
  onSelect,
}: AddressSelectorProps) {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  if (!user) {
    return null;
  }

  const addresses = user.addresses;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="address-selector-list checkout-card">
      <h2>Select Address</h2>

      {addresses.length === 0 ? (
        <p className="empty-address-state">
          You haven't added any addresses yet.
        </p>
      ) : (
        addresses.map((address) => (
          <div
            key={address.id}
            className="address-selector-card"
          >
            <label
              htmlFor={`address-${address.id}`}
              className="address-selector-label"
            >
              <input
                type="radio"
                id={`address-${address.id}`}
                name="addressSelector"
                value={address.id}
                checked={
                  selectedAddress?.id === address.id
                }
                onChange={() => onSelect(address)}
                required
              />

              <div className="address-details">
                <p>
                  {address.flatHouse},{" "}
                  {address.buildingStreet}
                </p>

                <p>
                  {address.city} -{" "}
                  {address.zipcode}
                </p>
              </div>
            </label>
          </div>
        ))
      )}

      <button
        type="button"
        className="button"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Address
      </button>

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode="add"
        address={null}
      />
    </div>
  );
}

export default AddressSelector;