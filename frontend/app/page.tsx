// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
import Navbar from '../Components/Navbar'
import styles from '../Styles/LoginPage/Login.module.css'
import toast from "react-hot-toast";
import Link from "next/link";
import { LoginAction } from './action';

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const router = useRouter();

  // const login = async () => {
  //   if(email === ""){
  //     toast('Email is required', {
  //       icon : '⚠️'
  //     })
  //     return
  //   }

  //   if(password === ""){
  //     toast('Enter your Password', {
  //       icon : '⚠️'
  //     })
  //     return
  //   }

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       toast.error(data?.message || "Invalid credentials");
  //       return;
  //     }

  //     toast.success("Login successful 🎉");
  //     document.cookie = `token=${data.token}; path=/`;
  //     router.push("/dashboard");
  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : "Server not reachable";
  //     toast.error(message || "Server not reachable");
  //   }
  // };

  return (
    <>
    <Navbar/>
    <div className={styles.login_page_container}>
      <form className={styles.login_form_container} action={LoginAction}>
      <h2 className={styles.form_header}>Login Form</h2>
       {/* <form > */}
        <div className={styles.label_input_container}>
          <label htmlFor="email" className={styles.form_label}>Email</label>
          <input type="email" id="email" name="email" required className={styles.form_input} placeholder='Email'/>
        </div>
        
        <div className={styles.label_input_container}>
          <label htmlFor="password" className={styles.form_label}>Password</label>
          <input type="password" id="password" name="password" required className={styles.form_input} placeholder='Password'/>
        </div>
        
      {/* </form> */}
      {/* <div className={styles.label_input_container}>
      <label className={styles.form_label}>Enter Your Email</label>
      <input placeholder="Enter Your Email" className={styles.form_input} onChange={e=>setEmail(e.target.value)} />
      </div> */}
      {/* <div className={styles.label_input_container}>
      <label className={styles.form_label}>Enter Your Password</label>
      <input type="password" className={styles.form_input} placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)} />
      </div> */}
      <div className={styles.label_input_container}>
            <Link href="/forgot-password" className={styles.forgot_pass_link}>Forgot Password?</Link>
      </div>
      <div className={styles.login_form_button}>
        <button type="submit" className={styles.login_button}>Log In</button>
        </div>
      {/* <div className={styles.login_form_button}>
      <button onClick={login} className={styles.login_button}>Login</button>
      </div> */}
      </form>
    </div>
    </>
  );
}
