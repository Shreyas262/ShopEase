import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  loadUsers,
  saveUsers,
} from "../../utils/localStorage";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

import type {
  RegistrationFormState,
  User,
} from "../../types/user";
import type { Address } from "../../types/address";

const createInitialState = (): RegistrationFormState => ({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  addresses: [
    {
      flatHouse: "",
      buildingStreet: "",
      city: "",
      zipcode: "",
    },
  ],
  password: "",
});

function RegisterForm() {

  const [registerState, setRegisterState] = useState<RegistrationFormState>(createInitialState());
  const [error, setError] = useState("");
  const [cnfPass, setCnfPass] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (error) {
      setError("");
    }

    setRegisterState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (error) {
      setError("");
    }

    const primaryAddress = {
      ...registerState.addresses[0],
      [name]: value,
    };

    setRegisterState((prev) => ({
      ...prev,
      addresses: [primaryAddress],
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const allUsers = loadUsers();
    const emailExists = allUsers.some(user => user.email === registerState.email);
    const phoneExists = allUsers.some(user => user.phone === registerState.phone); 

    if (emailExists) {
      setError("A user already exists with this e-mail.");
      showError("Email already exists.");
      return;
    }

    if (phoneExists) {
      setError("A user already exists with this phone number.");
      showError("Phone number already exists.");
      return;
    }

    if (registerState.password !== cnfPass) {
      setError("Passwords do not match.");
      return;
    }

    const newAddress: Address = {...registerState.addresses[0], id: crypto.randomUUID()}

    const newUser: User = {
      ...registerState, 
      id: crypto.randomUUID(),
      addresses: [newAddress]
    }

    allUsers.push(newUser);
    saveUsers(allUsers);

    setRegisterState(createInitialState());
    setCnfPass("");
    showSuccess("Account created successfully.");
    
    navigate("/login");
    
  };

  return (
    <form className="register-form" onSubmit={handleFormSubmit}>
      
      {error && <p className="error">{error}</p> }

      <label htmlFor="userFirstName">First Name: </label>
      <input
        type="text"
        name="firstName"
        id="userFirstName"
        placeholder="Enter your first name"
        value={registerState.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="userLastName">Last Name: </label>
      <input
        type="text"
        name="lastName"
        id="userLastName"
        placeholder="Enter your last name"
        value={registerState.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="useremail">E-mail: </label>
      <input
        type="email"
        name="email"
        id="useremail"
        placeholder="e.g. abc@email.com"
        value={registerState.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="userPhone">Phone Number: </label>
      <input
        type="text"
        name="phone"
        id="userPhone"
        placeholder="e.g. 9876543210"
        inputMode="numeric"
        pattern="^[0-9]*$"
        maxLength={10}
        value={registerState.phone}
        onChange={handleChange}
        required
      />

      <fieldset>
        <legend>Address</legend>

        <label htmlFor="address-flat-house">Flat/House No.: </label>
        <input
          type="text"
          name="flatHouse"
          id="address-flat-house"
          placeholder="e.g. A-101"
          value={registerState.addresses[0].flatHouse}
          onChange={handleAddressChange}
          required
        />

        <label htmlFor="address-building-street">Building/Street Name: </label>
        <input
          type="text"
          name="buildingStreet"
          id="address-building-street"
          placeholder="e.g. ABC building/street"
          value={registerState.addresses[0].buildingStreet}
          onChange={handleAddressChange}
          required
        />

        <label htmlFor="address-city">City: </label>
        <input
          type="text"
          name="city"
          id="address-city"
          placeholder="e.g. Delhi"
          value={registerState.addresses[0].city}
          onChange={handleAddressChange}
          required
        />

        <label htmlFor="userZipcode">Zip-code: </label>
        <input
          type="text"
          name="zipcode"
          id="address-zipcode"
          placeholder="e.g. 425201"
          maxLength={6}
          value={registerState.addresses[0].zipcode}
          onChange={handleAddressChange}
          required
        />

      </fieldset>

      <label htmlFor="userPassword">Password: </label>
      <input
        type="password"
        name="password"
        id="userPassword"
        placeholder="Create a strong password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        minLength={8}
        value={registerState.password}
        onChange={handleChange}
        required
      />
      <p className="password-help">
        Password must be at least 8 characters and
        include an uppercase letter, a lowercase letter, a number, and a special character.
      </p>

      <label htmlFor="cnfPassword">Confirm Password: </label>
      <input
        type="password"
        name="confirmPassword"
        id="cnfPassword"
        placeholder="Confirm your password"
        value={cnfPass}
        onChange={e=> setCnfPass(e.target.value)}
        required
      />

      <button type="submit" className="button">Register</button>

    </form>
  )
}

export default RegisterForm
