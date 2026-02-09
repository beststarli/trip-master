export function setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

export function getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

// User and permission types
export interface User {
    username: string;
    role: "admin" | "editor" | "viewer";
    permissions: string[];
}

// Mock users database
export const MOCK_USERS: Record<
    string,
    { password: string; role: "admin" | "editor" | "viewer"; permissions: string[] }
> = {
    admin: {
        password: "admin123",
        role: "admin",
        permissions: [
            "feature:read",
            "feature:create",
            "feature:edit",
            "feature:delete",
            "permission:manage",
        ],
    },
    editor: {
        password: "editor123",
        role: "editor",
        permissions: ["feature:read", "feature:create", "feature:edit"],
    },
    viewer: {
        password: "viewer123",
        role: "viewer",
        permissions: ["feature:read"],
    },
};

export function login(
    username: string,
    password: string
): User | null {
    const user = MOCK_USERS[username];
    if (user && user.password === password) {
        const userData: User = {
            username,
            role: user.role,
            permissions: user.permissions,
        };
        setCookie("auth_token", btoa(JSON.stringify(userData)), 7);
        return userData;
    }
    return null;
}

export function getCurrentUser(): User | null {
    const token = getCookie("auth_token");
    if (!token) return null;
    try {
        return JSON.parse(atob(token));
    } catch {
        return null;
    }
}

export function logout() {
    deleteCookie("auth_token");
}

export function hasPermission(user: User | null, permission: string): boolean {
    if (!user) return false;
    return user.permissions.includes(permission);
}
