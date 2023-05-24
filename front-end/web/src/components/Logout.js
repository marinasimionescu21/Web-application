import { useNavigate} from 'react-router-dom';
import {setAuthToken} from '../helpers/setAuthToken'

function Logout() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem("token"));
    const navigate = useNavigate();
    setAuthToken(null);
    return (<h2>Home page</h2>);  
    navigate('/');
}

export default Logout;