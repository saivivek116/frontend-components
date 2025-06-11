"use client";
import { useState, useRef } from "react";
import "./style.css"
import ReactDOM from "react-dom";
import Image from "next/image";

const Avatar = ()=>{
    const [users, setUsers] = useState([{name:"sai", id:1}]);
    const [showDialog, setShowDialog] = useState(false);
    const [showWarningDialog, setShowWarningDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null); // Track user to delete

    const handleClose =()=>{
        setShowDialog(false)
    }

    const handleCloseWarning = () => {
        setShowWarningDialog(false);
        setUserToDelete(null);
    }

    const handleDeleteAction = (id)=>{
        setUserToDelete(id);
        setShowWarningDialog(true);
    }

    const handleDeleteUser = ()=>{
        setUsers(users.filter(user => user.id !== userToDelete));
        setShowWarningDialog(false);
        setUserToDelete(null);
    }

    const handleAddUser = (user)=>{
        setShowDialog(false);
        const newUser = {
            name:user,
            id: Date.now(),
        }
        setUsers([...users, newUser])
    }
    return (
        <div className="container">
            <h1>Avatar Screen</h1>
            <Users users={users} addUser={setShowDialog} onRemove={handleDeleteAction}/>
            <UserInput isOpen={showDialog} onClose={handleClose} onConfirm={handleAddUser}/>
            <Warning isOpen={showWarningDialog} onClose={handleCloseWarning} onConfirm={handleDeleteUser}/>
        </div>
    )
}

const UserInput = ({isOpen, onClose, onConfirm})=>{
    const usernameRef = useRef("");

    if(!isOpen){
        return null
    }
    return ReactDOM.createPortal(
        <div className="modal-container">
            <div className="dialog">
                <div className="dialog-header">
                    <Image src="/add-user.png" width={20} height={20} alt="add-user"/>
                    <h1>New user</h1>
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <div className="dialog-body">
                    <label>Enter Name</label>
                    <input ref={usernameRef} type="text" />
                </div>
                <div className="dialog-footer">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={()=>onConfirm(usernameRef.current.value)}>Confirm</button>
                </div>
            </div>
        </div>,
        document.querySelector("body")
    )
}

const Users = ({users, addUser, onRemove})=>{
    return (
        <div className="users-list">
            {   <>
                {users.map((user,i)=>{
                    return (
                        <div key={user.id} className="avatar">
                            {user.name[0].toUpperCase()}
                            <span className="remove" onClick={()=>onRemove(user.id)}>x</span>
                        </div>
                    )
                })}
                <div className="add-user" onClick={()=>addUser(true)}>
                    +
                </div>
            </>}
        </div>
    )
}

const Warning = ({isOpen, onClose, onConfirm}) => {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal-container">
            <div className="dialog">
                <div className="dialog-header">
                    <h1>Warning</h1>
                </div>
                <div className="dialog-body">
                    <p>Are you sure you want to delete user?</p>
                </div>
                <div className="dialog-footer">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onConfirm}>Continue</button>
                </div>
            </div>
        </div>,
        document.querySelector("body")
    );
}

export default Avatar;