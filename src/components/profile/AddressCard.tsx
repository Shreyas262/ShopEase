import type { Address } from "../../types/address";

interface AddressCardProps {
  address: Address;
  index: number;
  onEdit: (address: Address, index: number) => void;
  onDelete: (address: Address) => void;
}

function AddressCard({
  address,
  index,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div className="address-card">
      <div className="address-card-content">
        <h4>Address {index + 1}</h4>

        <p>
          {address.flatHouse}, {address.buildingStreet}
        </p>

        <p>
          {address.city} - {address.zipcode}
        </p>
      </div>

      <div className="address-card-actions">
        <button
          type="button"
          className="button"
          onClick={() => onEdit(address, index)}
        >
          Edit
        </button>

        <button
          type="button"
          className="button"
          onClick={() => onDelete(address)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AddressCard;