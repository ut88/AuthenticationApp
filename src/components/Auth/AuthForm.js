import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
const emailInputRef = useRef();
const passwordInputRef= useRef(); 

const authCtx=useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [send,setSend]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    setSend(true);
    event.preventDefault();
    const enteredEmail =emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
     let url;
    if(isLogin){
        url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3H70FTTwTGSuNuJjexlHiIPj4MAsZR10'
    }else{
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3H70FTTwTGSuNuJjexlHiIPj4MAsZR10'
    }
    fetch(url,
       {
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }
       }).then(res=>{
        setSend(false)
        if(res.ok){
          return res.json();
        }else{
         return res.json().then(data =>{
          let errorMessage='Authentucation failed';
          if(data&& data.error && data.error.message){
            errorMessage=data.error.message;
          }

          throw new Error(errorMessage)
            // console.log(errorMessage);
            // alert( errorMessage);
          }) 
        }
       }).then((data)=>{
        authCtx.login(data.idToken)
        console.log(data);
       }).catch((err)=>{
          alert(err.message);
       })
    } 

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
         { send ? <p style={{ color: 'white' }} >Sending request....</p> : <button>{isLogin?'Login':'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
           >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
