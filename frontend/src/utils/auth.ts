// Secure token management utility
const TOKEN_KEY = 'storytide_auth_token';

class TokenManager {
    private static instance: TokenManager;
    
    private constructor() {}
    
    static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }
    
    // Get token from storage
    getToken(): string | null {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error reading token:', error);
            return null;
        }
    }
    
    // Set token in storage
    setToken(token: string): void {
        try {
            localStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    }
    
    // Remove token from storage
    removeToken(): void {
        try {
            localStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error removing token:', error);
        }
    }
    
    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!this.getToken();
    }
    
    // Get Authorization header value
    getAuthHeader(): Record<string, string> {
        const token = this.getToken();
        if (token) {
            return { Authorization: token };
        }
        return {};
    }
}

export const tokenManager = TokenManager.getInstance();
