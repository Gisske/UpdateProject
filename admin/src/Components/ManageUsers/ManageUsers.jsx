import React, { useEffect, useState } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ idstudent: '', email: '', role: 'user', password: '', date: Date });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const deleteUser = (id) => {
        fetch(`http://localhost:4000/api/users/${id}`, { method: 'DELETE' })
            .then(() => setUsers(users.filter(user => user._id !== id)))
            .catch((error) => console.error('Error deleting user:', error));
    };

    const editUser = (user) => {
        setEditingUser(user);
        setNewUser({ idstudent: user.idstudent, email: user.email, role: user.role, password: user.password, date: user.date });
    };

    const updateUser = () => {
        fetch(`http://localhost:4000/api/users/${editingUser._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((updatedUser) => {
                setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
                setEditingUser(null);
                setNewUser({ idstudent: '', email: '', role: 'user', password: '', date: Date });
            })
            .catch((error) => console.error('Error updating user:', error));
    };

    const addUser = () => {
        fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((addedUser) => {
                setUsers([...users, addedUser]);
                setNewUser({ idstudent: '', email: '', role: 'user', password: '', date: Date });
            })
            .catch((error) => console.error('Error adding user:', error));
    };

    return (
        <div className="manage-users-container">
            <header className="header">
                <h1>User Management</h1>
            </header>
            <main className="main-content">
                <section className="user-form">
                    <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
                    <div className="form-fields">
                        <input
                            type="text"
                            placeholder="ID"
                            value={newUser.idstudent}
                            onChange={(e) => setNewUser({ ...newUser, idstudent: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <input
                            type="date"
                            placeholder="date"
                            value={newUser.date}
                            onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
                        />
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="seller">seller</option>
                        </select>
                    </div>
                    <button className="btn-submit" onClick={editingUser ? updateUser : addUser}>
                        {editingUser ? 'Update User' : 'Add User'}
                    </button>
                </section>
                <section className="user-table">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Password</th>
                                <th>Date Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.idstudent}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.password}</td>
                                    <td>{new Date(user.date).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => editUser(user)}>Edit</button>
                                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default ManageUsers;
