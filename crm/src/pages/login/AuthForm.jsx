import { useInput } from '../../hooks';
import 'antd/dist/antd.css';
import { Button } from 'antd';




export default function AuthForm({ onLogin }) {
    const loginInput = useInput();
    const passwordInput = useInput();
  
    function reset() {
      loginInput.setValue('');
      passwordInput.setValue('');
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const data = {
        userName: loginInput.value,
        password: passwordInput.value
      };
  
      onLogin(data);
      reset();
    }
  
    return (
      <form class="inputForm" onSubmit={handleSubmit}>
        <label class="inputLabel">
          <input class="inputLogIn" {...loginInput} placeholder="Введите логин" />
        </label>
        <br />
        <label class="inputLabel">
          <input class="inputLogIn"  {...passwordInput} type="password" placeholder="Введите пароль" />
        </label>
        <br />

        <Button type="primary" onClick={handleSubmit}>Войти </Button>
      </form>
    );
  }
