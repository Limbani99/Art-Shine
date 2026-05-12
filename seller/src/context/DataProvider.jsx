import { Children, createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import toast from 'react-hot-toast';

// import { useNavigate } from "react-router-dom";
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    // const navigate = useNavigate()
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [role, setRole] = useState()
    const [categories, setCategories] = useState([])
    const [Allproducts, setAllproducts] = useState([])
    const [Allcustomer, setAllcustomer] = useState([])
    const [TotalOrder, setTotalOrder] = useState([])
    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", JSON.stringify(token))
        setUser(userData)
        setRole(userData.role)
        setToken(token)
    }
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
        setRole(null)
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
            setRole(null)
            setUser(null)
            setToken(null)
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

    const getCategory = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/category/get`)
            setCategories(res.data.gotcategory || [])
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])

    const DeleteCategory = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/category/delete/${id}`)
            toast.success("Category Deleted Successfully")
            getCategory()
        } catch (err) {
            toast.error("Failed to Delete Category")
        }
    }
    const Getproduct = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/product/get`)
            setAllproducts(res.data.product || [])
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        Getproduct()
    }, [])

    const DeleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${baseUrl}/api/product/delete/${id}`);
            toast.success("Product Deleted Successfully")
            Getproduct()
        } catch (err) {
            toast.error("Failed to Delete Product")
        }
    }

    const fetchAllCustomer = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/users/all`)
            setAllcustomer(res.data.users)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchAllCustomer()
    }, [])
    const fetchTotalOrder = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/order/all`)
            setTotalOrder(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchTotalOrder()
    }, [])
    const value = {
        login,
        logout,
        user,
        categories,
        getCategory,
        DeleteCategory,
        Allproducts,
        DeleteProduct,
        Getproduct,
        Allcustomer,
        TotalOrder
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