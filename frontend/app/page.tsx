"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from '../Components/Navbar'
import styles from '../Styles/LoginPage/Login.module.css'
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    if(email === ""){
      alert("Enter Your Email")
      return
    }

    if(password === ""){
      alert("Enter Your Passsword")
      return
    }

    try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      { email, password }
    );

    toast.success("Login successful 🎉");
    document.cookie = `token=${res.data.token}; path=/`;
    router.push("/dashboard");

  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data || "Invalid credentials");
    } else {
      toast.error("Server not reachable");
    }
  }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.login_page_container}>
      <div className={styles.login_form_container}>
      <h2 className={styles.form_header}>Login Form</h2>
      <div className={styles.label_input_container}>
      <label className={styles.form_label}>Enter Your Email</label>
      <input placeholder="Enter Your Email" className={styles.form_input} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div className={styles.label_input_container}>
      <label className={styles.form_label}>Enter Your Password</label>
      <input type="password" className={styles.form_input} placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)} />
      </div>
      <div className={styles.login_form_button}>
      <button onClick={login} className={styles.login_button}>Login</button>
      </div>
      </div>
    </div>
    </>
  );
}
