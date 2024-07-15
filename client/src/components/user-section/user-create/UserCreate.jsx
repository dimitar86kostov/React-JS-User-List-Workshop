import { useEffect, useState, useRef } from "react";

const baseURL = "http://localhost:3030/jsonstore"


export default function UserCreate({ onClose, onSave }) {

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: '',

    });
    
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const changeFormHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        setFormValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value,
        }))
    };

    async function addUserSaveHandler(e) {
        // prevent refresh
        e.preventDefault()

        console.log(formValues);
        // // get user data
        // const formData = new FormData(e.currentTarget);
        // const userData = {
        //     ...Object.fromEntries(formData),
        //     "createdAt": new Date().toISOString(),
        //     "updatedAt": new Date().toISOString(),
        // };

        // make post request
        const response = await fetch(`${baseURL}/users`, {
            method: "POST",
            headers: {
                'Content-type': 'pplication-json'
            },
            body: JSON.stringify(formValues)
        });

        const createdUser = await response.json();

        onSave(createdUser)

        // // update local state
        // setUsers(oldUsers => [...oldUsers, createdUser])

        // // close modal
        // setShowAddUser(false);
    }

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="user-container">
                    <header className="headers">
                        <h2>Edit User/Add User</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <form onSubmit={addUserSaveHandler}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={formValues.firstName}
                                        onChange={changeFormHandler}
                                    />

                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last name</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-user"></i></span>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={formValues.lastName}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-envelope"></i></span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={formValues.email}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-phone"></i></span>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        value={formValues.phoneNumber}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group long-line">
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span><i className="fa-solid fa-image"></i></span>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={formValues.imageUrl}
                                    onChange={changeFormHandler}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={formValues.country}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-city"></i></span>
                                    <input
                                        id="city"
                                        ref={inputRef}
                                        name="city"
                                        type="text"
                                        value={formValues.city}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-map"></i></span>
                                    <input
                                        id="street"
                                        name="street"
                                        type="text"
                                        value={formValues.street}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="streetNumber">Street number</label>
                                <div className="input-wrapper">
                                    <span><i className="fa-solid fa-house-chimney"></i></span>
                                    <input
                                        id="streetNumber"
                                        name="streetNumber"
                                        type="text"
                                        value={formValues.streetNumber}
                                        onChange={changeFormHandler}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="form-actions">
                            <button id="action-save" className="btn" type="submit">Save</button>
                            <button id="action-cancel" className="btn" type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}