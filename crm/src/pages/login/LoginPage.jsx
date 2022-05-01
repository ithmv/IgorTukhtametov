import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthForm from "./AuthForm";

export function LoginPage() {
    const { isAuth, login } = useAuth();

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (<>
        <h1 className="h1log">Войти в систему</h1>
        <AuthForm onLogin={login} />
    </>)
}