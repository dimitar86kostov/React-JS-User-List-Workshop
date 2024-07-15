import { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Search from "../search/Search";
import UserList from "./user-list/UserList";
import UserCreate from "./user-create/UserCreate";
import UserDetails from "./user-details/UserDetails";
import UserDelete from "./user-delete/UserDelete";
import Spinner from "../spinner/Spinner";

const baseURL = "http://localhost:3030/jsonstore"

export default function UserSection(props) {

    const [users, setUsers] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showDetails, setShowDetails] = useState(null);
    const [deleteUserState, setDeleteUserState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${baseURL}/users`);
                const result = await response.json();
                const data = Object.values(result);
                console.log(data);
                setUsers(data);
            } catch (err) {
                console.error(err.message);
            } finally {
                setIsLoading(false);
            }

        })();
    }, []);

    function addUserClickHandler() {
        setShowAddUser(true);
    }

    function addUserCloseHandler() {
        setShowAddUser(false);
    }

    async function userSaveHandler(createdUser) {
       
        // update local state
        setUsers(oldUsers => [...oldUsers, createdUser])

        // close modal
        setShowAddUser(false);
    }

    function showDetailsInfo(userId) {
        setShowDetails(userId)

    }

    const showDeleteModal = (userId) => {
        setDeleteUserState(userId);
    }

    const onDeleteHandler = async (userId) => {
        // make delete request
        await fetch(`${baseURL}/users/${userId}`, {
            method: "DELETE"
        });

        // delete from local state
        setUsers(oldState => oldState.filter(user => user._id !== userId));

        // close modal
        setDeleteUserState(null);
    }

    return (
        <section className="card users-container">

            <Search />

            <UserList
                isLoading={isLoading}
                users={users}
                showDetailsBtn={showDetailsInfo}

                showDeleteModal={showDeleteModal}
                onCancel={() => { console.log('Delete cancelation'); }}
            />

            {showAddUser && (<UserCreate
                onClose={addUserCloseHandler}
                onSave={userSaveHandler}
            />)}

            {showDetails && <UserDetails
                user={users.find(user => user._id === showDetails)}

                onCloseDetails={() => setShowDetails(null)}
            />}

            {deleteUserState && (<UserDelete
                onDelete={() => onDeleteHandler(deleteUserState)}
                onCancel={() => setDeleteUserState(null)}

            />)}


            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            <Pagination />
        </section>
    );
}