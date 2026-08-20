import {
  useEffect,
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

import type { Address } from "../../types/address";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  address: Address | null;
}

const createEmptyAddress = (): Address => ({
  id: crypto.randomUUID(),
  flatHouse: "",
  buildingStreet: "",
  city: "",
  zipcode: "",
});

function AddressModal({
  isOpen,
  onClose,
  mode,
  address,
}: AddressModalProps) {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  const [addressState, setAddressState] =
    useState<Address>(createEmptyAddress());

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (mode === "edit" && address) {
      setAddressState(address);
    } else {
      setAddressState(createEmptyAddress());
    }

    setError("");
  }, [isOpen, mode, address]);

  if (!currentUser || !isOpen) {
    return null;
  }

  const addresses = currentUser.addresses;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (error) {
      setError("");
    }

    setAddressState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formattedAddress: Address = {
      ...addressState,
      flatHouse: addressState.flatHouse.trim(),
      buildingStreet:
        addressState.buildingStreet.trim(),
      city: addressState.city.trim(),
      zipcode: addressState.zipcode.trim(),
    };

    if (
      !formattedAddress.flatHouse ||
      !formattedAddress.buildingStreet ||
      !formattedAddress.city ||
      !formattedAddress.zipcode
    ) {
      setError(
        "Please fill in all address fields."
      );
      return;
    }

    const addressExists = addresses.some(
      (existingAddress) =>
        existingAddress.id !== formattedAddress.id &&
        existingAddress.flatHouse ===
          formattedAddress.flatHouse &&
        existingAddress.buildingStreet ===
          formattedAddress.buildingStreet &&
        existingAddress.city ===
          formattedAddress.city &&
        existingAddress.zipcode ===
          formattedAddress.zipcode
    );

    if (addressExists) {
      setError("Address already exists.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to ${mode} this address?`
      )
    ) {
      return;
    }

    const updatedAddresses =
      mode === "add"
        ? [...addresses, formattedAddress]
        : addresses.map((existingAddress) =>
            existingAddress.id === formattedAddress.id
              ? formattedAddress
              : existingAddress
          );

    dispatch(
      updateUser({
        addresses: updatedAddresses,
      })
    );

    onClose();

    showSuccess(
      mode === "add"
        ? "Address added successfully."
        : "Address updated successfully."
    );
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">

        <div className="modal-header">
          <h2>
            {mode === "add"
              ? "Add Address"
              : "Edit Address"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
          >
            &times;
          </button>
        </div>

        <form
          className="address-form"
          onSubmit={handleSubmit}
        >
          <div className="modal-body">

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <label htmlFor="address-flat-house">
              Flat/House No.:
            </label>

            <input
              type="text"
              name="flatHouse"
              id="address-flat-house"
              placeholder="e.g. A-101"
              value={addressState.flatHouse}
              onChange={handleChange}
              required
            />

            <label htmlFor="address-building-street">
              Building/Street Name:
            </label>

            <input
              type="text"
              name="buildingStreet"
              id="address-building-street"
              placeholder="e.g. ABC building/street"
              value={addressState.buildingStreet}
              onChange={handleChange}
              required
            />

            <label htmlFor="address-city">
              City:
            </label>

            <input
              type="text"
              name="city"
              id="address-city"
              placeholder="e.g. Delhi"
              value={addressState.city}
              onChange={handleChange}
              required
            />

            <label htmlFor="address-zipcode">
              Zip-code:
            </label>

            <input
              type="text"
              name="zipcode"
              id="address-zipcode"
              placeholder="e.g. 425201"
              maxLength={6}
              value={addressState.zipcode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-footer">

            <button
              type="submit"
              className="button"
            >
              {mode === "add" ? "Add" : "Save"}
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

export default AddressModal;