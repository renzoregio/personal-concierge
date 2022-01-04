import s from "./SignOut.module.css"
import { useRouter } from 'next/router'


const SignIn  = () => {
  const router = useRouter()
    return (
        <div className={s.container}>
            <div>
              <h1>You have successfully signed out!</h1>
              <button onClick={() => router.push("/")}>Return to Login Page</button>
            </div>
        </div>
    )
}

export default SignIn;