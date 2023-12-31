import { Outlet } from 'react-router-dom';
import Header from '../components/Common/Header'
const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;