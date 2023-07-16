import { useState } from 'react';
import { useLoginUserMutation } from '../redux/api/authApi';
import { saveUserToLocalStorage } from '../utils/localstorager';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import Input from '../components/Input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { isLoading, isError }] = useLoginUserMutation();

    const handleLogin = async () => {
        try {
            const response = await loginUser({ email, password });

            if ('data' in response && response.data) {
                console.log('Registered user:', response.data);
                saveUserToLocalStorage(response.data);


                showSuccessToast('Logged in successfully!');

            }

        } catch (error) {
            console.error('Login failed:', error);

            showErrorToast('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen hero-content flex-col">
            <h1 className="lg:text-3xl font-semibold">Please Login</h1>
            <div className="flex-shrink-0 max-w-xl w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <Input
                        label="Email"
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                            Forgot password?
                        </a>
                    </label>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                    {isError && (
                        <p className="text-red-500 mt-2">Login failed. Please try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
