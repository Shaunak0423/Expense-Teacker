import Navbar from '../../Components/Navbar'
import styles from '../../Styles/Signup/Signup.module.css'
import { signupAction } from '../action';

export default function Signup() {

//   const signup = async () => {

//     if(name === ''){
//         toast.error('Enter Your Name')
//         return
//     }
//     if(email === ''){
//         toast.error("Enter Your Email")
//         return
//     }
//     if(password === ''){
//         toast.error("Enter Your Password")
//         return
//     }

//     try{
//         await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
//         name, email, password
//         });
//     toast.success("User Created Successfully")
//     router.push("/");
//     }
//     catch(error: unknown){
//         if(axios.isAxiosError(error)){
//             toast.error(error.response?.data || "Invalid Credentials")
//         }
//         else{
//             toast.error('Server Not Reachable')
//         }
//     }
    
//   };

  return (
    <>
    <Navbar/>
    <div className={styles.signup_page_container}>
        <form className={styles.signup_form_container} action={signupAction}>
            <h2 className={styles.form_header}>Signup</h2>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Full Name</label>
            <input placeholder="Enter Full Name" className={styles.form_input} name="name" />
            </div>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Your Email</label>
            <input placeholder="Enter Your Email" className={styles.form_input} name="email" />
            </div>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Your Password</label>
            <input type="password" className={styles.form_input} placeholder="Enter Your Password" name="password" />
            </div>
            <div className={styles.login_form_button}>
            <button className={styles.login_button} type="submit">Signup</button>
            </div>
        </form>
    </div>
    </>
  );
}
