import { useState,useEffect } from "react";
import axios from 'axios';

 function useFetch(url){

    const [data,setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        axios.get(url)
        .then(res =>{
            setLoading(false);
            setData(res.data)
        })
        .catch(err=>{
            setLoading(false);
            setError("ha ocurrido un error");
        })
       
    }, [url])
  
        return { data, loading, error };


}

export default useFetch