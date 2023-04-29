import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef,useContext } from 'react';
const ProfileForm = () => {
 const history=useHistory(); 
const newPasswordInputRef=useRef();
const authCtx =useContext(AuthContext);
const submitHandler= event=>{
  event.preventDefault();


  const enteredNewPassword= newPasswordInputRef.current.value;

  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD3H70FTTwTGSuNuJjexlHiIPj4MAsZR10&token=abc',{
    method:'POST',
    body:JSON.stringify({
      idToken:authCtx.token,
      password:enteredNewPassword,
      returnSecureToken:false
    }),
    headers:{
      'content-Type':'application/json',
      'Authorization':'Bearer abc'
    }
  }).then(res=>{

    history.replace('/');
  })
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
