import { loadUsers, saveUsers } from "./localStorage";
import type { User } from "../types/user";

export default function updateStoredUser(updatedUser: User): void {
    const allUsers = loadUsers();

    const updatedUsers = allUsers.map(user => {
        if (user.id === updatedUser.id) {
            return updatedUser
        }
        return user
    });

    saveUsers(updatedUsers);
}