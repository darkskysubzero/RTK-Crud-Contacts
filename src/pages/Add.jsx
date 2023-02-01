import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddContactMutation } from '../services/contactsApi';

const initialState = {
    name: "",
    email: "",
    contact: "",
}

const Add = () => {

    const [formValue, setFormValue] = useState(initialState);
    const { name, email, contact } = formValue;
    const navigate = useNavigate();
    const [saveContact] = useAddContactMutation();


    const addContact = async (e) => {
        e.preventDefault();
        if (name && email && contact) {

            try {
                await saveContact(formValue);
                navigate("/");
                toast.success("Contact saved successfully!", { toastId: "success" });


            } catch (e) {
                toast.error("Something went wrong!", { toastId: 'error' });
            }

        } else {
            toast.error("Please provide valid inputs!", { toastId: 'error' });
        }
    }

    const changeValue = (e) => {
        setFormValue(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }


    return (
        <div>
            <ToastContainer autoClose={200} />
            <h1>Add New Contact</h1>
            <div className="add-contact">
                <form onSubmit={addContact} autoComplete="off">
                    <p>Name</p>
                    <input type="text" name='name' value={name} onChange={changeValue} />
                    <p>Email</p>
                    <input type="email" name='email' value={email} onChange={changeValue} />
                    <p>Contact</p>
                    <input type="number" name='contact' value={contact} onChange={changeValue} />
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default Add