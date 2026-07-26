import React, { createContext, useContext, useEffect, useState } from 'react'
 const AllDataContext = createContext();

export const GetDataProvider = ({children}) => {
    const [data, setData] = useState([]);   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


        const fetchAllProduct = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/api/products");
            if(!res.ok) throw new Error("Something Went Wrong");
            const data = await res.json();
            if (!data || data.length === 0) {
                setError("Not Found");
            } else {
                setData(data);
            }
        } catch (error) {
            // setLoading(false);
            setError(error);
            setData([]);            
        }finally{
            setLoading(false);
        }
    }
useEffect(() => {
    fetchAllProduct();
},[]);
   

  return (
    <AllDataContext.Provider value={{data,fetchAllProduct, loading, error}}>
{children}
    </AllDataContext.Provider>
  )
}

export const useAllProduct = () => useContext(AllDataContext);


const getByIdContext = createContext();
export const GetProductByIdProvider = ({children}) =>{
    const [data, setData] = useState([]);   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


        const fetchById = async (id) => {
        setLoading(true);
        setError(null);
        setData([]);

        try {
            const res = await fetch(`http://localhost:8080/api/products/${id}` );
            if(!res.ok) throw new Error("Something Went Wrong");
            const data = await res.json();
            if (!data || data.length === 0) {
                setError("Not Found");
            } else {
                setData(data);
            }
        } catch (error) {
            // setLoading(false);
            setError(error);
            setData([]);            
        }finally{
            setLoading(false);
        }
    }
   

  return (
    <getByIdContext.Provider value={{data,fetchById, loading, error}}>
{children}
    </getByIdContext.Provider>
  )
}

export const useProductById = () => useContext(getByIdContext);



const getImageByIdProvider = createContext();

export const GetImageByIdContext = ({children}) => {
    const [imageUrl, setImageUrl] = useState("");
 const fetchImage = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${id}/image`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageUrl(imageObjectURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    return (
        <getImageByIdProvider.Provider value={{imageUrl, fetchImage}}>
            {children}
        </getImageByIdProvider.Provider>
    )
}

export const useImage = () => useContext(getImageByIdProvider);