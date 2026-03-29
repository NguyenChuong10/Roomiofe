
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "@/app/store";

import { AppToaster } from "./shared/components/AppToaster";
import AppRoutes from "@/routes";
import "@/styles/global.css";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes/>
                <AppToaster/>
            </BrowserRouter>
        </Provider>
    </StrictMode>
)
