import type { Address } from "./address";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface RegistrationFormState {
  id: null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: RegistrationAddress[];
  password: string;
}

export interface RegistrationAddress {
  flatHouse: string;
  buildingStreet: string;
  city: string;
  zipcode: string;
}