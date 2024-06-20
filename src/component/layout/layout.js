import react from "react";
import { Outlet } from 'react-router-dom'
import "./layout.css";
import Footer from "./footer";
import Header from "./header";

const Layout = () => {
    return (
        <div>
            <Header />
            <div >
                <main id="main">
                    <Outlet />
                </main>    
            </div>
            <Footer />
        </div>

    )
}

export default Layout;