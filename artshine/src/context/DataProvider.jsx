import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [role, setRole] = useState()
    const [allProduct, setAllProduct] = useState([])

    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", JSON.stringify(token))
        setUser(userData)
        setToken(token)
        setRole(userData.role)
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")
        const savedRole = savedUser ? JSON.parse(savedUser).role : null
        if (savedToken && savedUser) {
            const parsedUser = (JSON.parse(savedUser))
            setUser(parsedUser)
            setToken(savedToken)
            setRole(savedRole)
        } else {
            setUser(null)
            setToken(null)
            setRole(null)
        }
    }, [])

    // Axios request interceptor for token, interceptor is a function that run in background before every request 
    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                const token =
                    localStorage.getItem("token") || sessionStorage.getItem("token");
                if (token) config.headers["Authorization"] = `Bearer ${token}`;
                return config;
            },
            (error) => Promise.reject(error),
        );
        return () => axios.interceptors.request.eject(interceptor);
    }, []);

    const AllProduct = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/product/get`)
            setAllProduct(res.data.product)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        AllProduct()
    }, [])

    const value = {
        login,
        logout,
        user,
        allProduct
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    return useContext(DataContext)
}