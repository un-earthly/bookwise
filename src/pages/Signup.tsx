import React, { useState } from 'react';
import { useRegisterUserMutation } from '../redux/api/authApi';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

    const handleRegister = async () => {
        try {
            const response = await registerUser({ username, email, password, contact });

            if ('data' in response && response.data) {
                console.log('Registered user:', response.data);
            }

        } catch (error) {
            console.error('Registration failed:', error);

        }
    };

    return (
        <div className="min-h-screen hero-content flex-col">
            <h1 className="lg:text-3xl font-semibold">Please Fill The Form</h1>
            <div className="flex-shrink-0 max-w-xl w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="username"
                            className="input input-bordered"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="email"
                            className="input input-bordered"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contact</span>
                        </label>
                        <input
                            type="text"
                            placeholder="contact"
                            className="input input-bordered"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <div className="form-control mt-6">
                        {/* Disable the button during API call */}
                        <button className="btn btn-primary" onClick={handleRegister} disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    {isError && <p className="text-red-500 mt-2">Register failed. Please try again.</p>}

                </div>
            </div>
        </div>
    );
}
