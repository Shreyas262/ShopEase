import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";
import type { User } from "../types/user";
import type { Order } from "../types/order";

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(
  key: string
): T | null {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function saveUserCollection<T>(
  key: string,
  userId: string,
  items: T[]
): void {
  const collection = loadFromStorage<Record<string, T[]>>(key) ?? {};

  saveToStorage(key, {
    ...collection,
    [userId]: items,
  });
}

function loadUserCollection<T>(
  key: string,
  userId: string
): T[] {
  const collection = loadFromStorage<Record<string, T[]>>(key) ?? {};

  return collection[userId] ?? [];
}

// 
export const saveCart = (
  userId: string,
  items: CartItem[]
): void => {
  saveUserCollection("carts", userId, items);
};

export const loadCart = (
  userId: string
): CartItem[] => {
  return loadUserCollection<CartItem>(
    "carts",
    userId
  );
};

export const saveWishlist = (
  userId: string,
  items: Product[]
): void => {
  saveUserCollection("wishlists", userId, items);
};

export const loadWishlist = (
  userId: string
): Product[] => {
  return loadUserCollection<Product>(
    "wishlists",
    userId
  );
};

export const saveUsers = (
  users: User[]
): void => {
  saveToStorage("users", users);
};

export const loadUsers = (): User[] => {
  return loadFromStorage<User[]>("users") ?? [];
};

export const saveUser = (
  user: User
): void => {
  saveToStorage("user", user);
};

export const loadUser = (): User | null => {
  return loadFromStorage<User>("user");
};

export const removeUser = ():void => {
    localStorage.removeItem("user")
}

export function loadOrders(): Record<string, Order[]> {
  return (
    loadFromStorage<Record<string, Order[]>>("orders") ?? {}
  );
}

export function saveOrders(
  orders: Record<string, Order[]>
): void {
  saveToStorage("orders", orders);
}

export function addOrder(
  userId: string,
  order: Order
): void {
  const orders = loadOrders();

  if (!orders[userId]) {
    orders[userId] = [];
  }

  orders[userId].push(order);

  saveOrders(orders);
}