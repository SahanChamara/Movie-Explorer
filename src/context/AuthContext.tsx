import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// tempory users for check
const MOCK_USERS = [
    { username: 'user1', password: 'password1' },
    { username: 'sahan', password: 'sahan123' },
    { username: 'user2', password: 'password2' },
    { username: 'demo', password: 'demo' },
];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if user was previously logged in
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (username: string, password: string): boolean => {
        // Reset error
        setError(null);

        // Find user
        const foundUser = MOCK_USERS.find(
            (u) => u.username === username && u.password === password
        );

        if (foundUser) {
            const userObj = { username: foundUser.username };
            setUser(userObj);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(userObj));
            return true;
        } else {
            setError('Invalid username or password');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );


}