import { toast, ToastOptions, ToastPosition } from 'react-toastify';

const toastOptions: ToastOptions = {
    position: 'top-center' as ToastPosition,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const showSuccessToast = (message: string) => {
    toast.success(message, toastOptions);
};

export const showErrorToast = (message: string) => {
    toast.error(message, toastOptions);
};

export default toastOptions;
