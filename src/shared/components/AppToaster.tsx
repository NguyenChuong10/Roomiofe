import { Toaster } from "react-hot-toast";

const toastBaseClass = 'font-sans text-sm rounded-lg shadow-card';

export function AppToaster() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                className: toastBaseClass,
                success: {
                    className: `${toastBaseClass} bg-green-50 text-green-500 border border-green-200`,
                },
                error: {
                    className: `${toastBaseClass} bg-red-50 text-red-500 border border-red-200`,
                },
            }}
        />
    );
}