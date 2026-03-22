
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import {store} from "@/app/store";
import AppRoutes from "@/routes";
import "@/styles/global.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration:3000,
                        className:'font-sans text-sm rounded-lg shadow-card',
                        success:{
                            className :'font-sans text-sm rouded-lg bg-green-50 text-green-500 border border-green-20'
                        },
                        error : {
                            className :'font-sans text-sm rouded-ls bg-red-50 text-red-500 border border-red-20'
                        },
                    }}
                    >
                </Toaster>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
