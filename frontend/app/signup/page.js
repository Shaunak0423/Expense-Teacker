"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from '../../Components/Navbar'
import styles from '../../Styles/Signup/Signup.module.css'
import toast from "react-hot-toast";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signup = async () => {

    if(name === ''){
        toast.error('Enter Your Name')
        return
    }
    if(email === ''){
        toast.error("Enter Your Email")
        return
    }
    if(password === ''){
        toast.error("Enter Your Password")
        return
    }

    try{
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        name, email, password
        });
    toast.success("User Created Successfully")
    router.push("/");
    }
    catch(error){
        if(error.response){
            toast.error(error.response.data)
        }
        else{
            toast.error('Server Not Reachable')
        }
    }
    
  };

  return (
    <>
    <Navbar/>
    <div className={styles.signup_page_container}>
        <div className={styles.signup_form_container}>
            <h2 className={styles.form_header}>Signup</h2>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Full Name</label>
            <input placeholder="Enter Full Name" className={styles.form_input} onChange={e=>setName(e.target.value)} />
            </div>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Your Email</label>
            <input placeholder="Enter Your Email" className={styles.form_input} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className={styles.label_input_container}>
            <label className={styles.form_label}>Enter Your Password</label>
            <input type="password" className={styles.form_input} placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className={styles.login_form_button}>
            <button className={styles.login_button} onClick={signup}>Signup</button>
            </div>
        </div>
    </div>
    </>
  );
}
