import { useAuth } from '../context/AuthContext';
import { Button } from 'antd';


export default function Logout() {
    const { isAuth, logout } = useAuth();

    return isAuth ? (
        <Button type="primary" danger onClick={logout}>Выйти из системы</Button>
    ) : null;
}