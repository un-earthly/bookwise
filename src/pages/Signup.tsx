import { useState } from 'react';
import { useRegisterUserMutation } from '../redux/api/authApi';
import { saveUserToLocalStorage } from '../utils/localstorager';
import Input from '../components/Input';
import { showErrorToast, showSuccessToast } from '../utils/toast';

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
                saveUserToLocalStorage(response.data);

                showSuccessToast("User registered successfully")
            }
        } catch (error) {
            console.error('Registration failed:', error);

            showErrorToast('Registration failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen hero-content flex-col">
            <h1 className="lg:text-3xl font-semibold">Please Fill The Form</h1>
            <div className="flex-shrink-0 max-w-xl w-full shadow-2xl bg-base-100">
                <div className="card-body">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                    <Input
                        label="Contact"
                        type="text"
                        placeholder="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <div className="form-control mt-6">
                        <button className="btn btn-primary" onClick={handleRegister} disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                    {isError && (
                        <p className="text-red-500 mt-2">Registration failed. Please try again.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
