import { Outlet } from 'react-router-dom';
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer';
const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;