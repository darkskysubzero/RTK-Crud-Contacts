import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddContactMutation, useGetSingleContactQuery, useUpdateContactMutation } from '../services/contactsApi';

const Edit = () => {
    const initialState = {
        name: "",
        email: "",
        contact: "",
    }
    const [formValue, setFormValue] = useState(initialState);
    const { name, email, contact } = formValue;
    const navigate = useNavigate();
    const { id } = useParams();
    const [saveContact] = useAddContactMutation();
    const [updateContact] = useUpdateContactMutation();
    const { data, error } = useGetSingleContactQuery(id);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            if (data) {
                setFormValue({ ...data });
            }
        } else {
            setEditMode(false);
            setFormValue({ ...initialState });
        }
    }, [id, data])


    useEffect(() => {
        if (error && id) {
            toast.error("Something went wrong", { toastId: "error" });
        }
    }, [error])

    const addContact = async (e) => {
        e.preventDefault();
        if (name && email && contact) {

            try {
                if (!editMode) {
                    await saveContact(formValue);
                    navigate("/");
                    toast.success("Contact saved successfully!", { toastId: "success" });
                } else {
                    await updateContact(formValue);
                    navigate("/");
                    toast.success("Contact updated successfully!", { toastId: "success" });
                    setEditMode(false)
                }

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
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default Edit