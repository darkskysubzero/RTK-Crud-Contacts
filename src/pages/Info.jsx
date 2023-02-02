import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetSingleContactQuery } from '../services/contactsApi';


const Info = () => {

    const { id } = useParams();
    const { data, error } = useGetSingleContactQuery(id);

    useEffect(() => {
        if (error) {
            toast.error("Something went wrong", { toastId: "error" });
        }
    }, [error])


    return (
        <div className='single-contact'>
            <ToastContainer autoClose={500} />
            <h1>{data && data.id}</h1>
            <h1>{data && data.name}</h1>
            <h1>{data && data.email}</h1>
            <h1>{data && data.contact}</h1>
            <Link to={"/"}>Go Back</Link>
        </div>
    )
}

export default Info