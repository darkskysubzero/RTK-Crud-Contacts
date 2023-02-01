import React, { useEffect } from 'react'
import { useGetAllContactsQuery } from '../services/contactsApi'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

    const { data, error, isSuccess, refetch, isError } = useGetAllContactsQuery();

    useEffect(() => {

        //when pages loads refetch it
        if (!isError) {
            refetch();
        }

        const timer = setTimeout(() => {
            if (isSuccess) {
                toast.info("Data loaded")
            }

            if (error) {
                toast.error("Something went wrong!", { toastId: "error" });
                return;
            }
        }, 100)



        return () => {
            clearTimeout(timer);
        }

    }, [error, isSuccess]);


    return (
        <div>
            <ToastContainer autoClose={500} />
            <h1>Contact App</h1>
            <div className="data">
                <Link to="/add"><button>Add Contact</button></Link>
                <div className="data-table">
                    <div className="default-row">
                        <div className="info">
                            <p>No.</p>
                            <p>Name</p>
                            <p>Email</p>
                            <p>Contact</p>
                        </div>
                        <p className='action-info'>Action</p>
                    </div>

                    {
                        data?.map(contact => {
                            return <div className='data-row' key={contact.id}>
                                <div className="data-info" >
                                    <p>{contact.id}</p>
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                    <p>{contact.contact}</p>
                                </div>
                                <div className="action-buttons">
                                    <Link to={`/edit/:${contact.id}`}><button className='green'>Edit</button></Link>
                                    <Link to={`/delete/:${contact.id}`}><button className='red'>Delete</button></Link>
                                    <Link to={`/view/:${contact.id}`}><button>View</button></Link>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Home