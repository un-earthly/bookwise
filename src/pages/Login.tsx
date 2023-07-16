import { useState } from 'react';
import { useLoginUserMutation } from '../redux/api/authApi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Destructure the mutation function and its status values
    const [loginUser, { isLoading, isError }] = useLoginUserMutation();

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email, password });

            if ('data' in response && response.data) {
                // Handle successful login (data contains the response data)
                console.log('Logged in user:', response.data.email);

                // You can perform any additional actions after successful login, such as redirecting the user to another page.
            }
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);

        }
    };

    return (
        <div className="min-h-screen hero-content flex-col">
            <h1 className="lg:text-3xl font-semibold">Please Login</h1>
            <div className="flex-shrink-0 max-w-xl w-full shadow-2xl bg-base-100">
                <div className="card-body">
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
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        {/* Disable the button during API call */}
                        <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    {isError && <p className="text-red-500 mt-2">Login failed. Please try again.</p>}
                </div>
            </div>
        </div>
    );
}
