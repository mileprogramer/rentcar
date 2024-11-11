import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/userService";
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider ({ children })  {

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    function isAdminLogged() {
        return admin ? true : false;
    }

    function checkAuthStatus() {
        setLoading(true);
        userService.checkAuthStatus()
            .then((response) => setAdmin(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    async function loginAdmin(credentials) {
        setLoading(true)
        try {
            const axiosResponse = await userService.loginAdmin(credentials);
            setAdmin(() => axiosResponse.data);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    // logout to do
    async function logoutAdmin () {
        await userService.logout();
        setAdmin(null);
    };


    return (
        <AuthContext.Provider value={{ admin, loginAdmin, logoutAdmin, loading, error, isAdminLogged }}>
            {children}
        </AuthContext.Provider>
    );
}