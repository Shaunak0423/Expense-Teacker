"use client";
import React, {useState} from 'react'
import Navbar from '../../Components/Navbar'
import styles from '../../Styles/ForgotPass/ForgotPass.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'

function page() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confPassword,setConfPassword] = useState('')

    const ChangePassword = async () => {
        if(email === ''){
            toast('Email is required!', {
                icon: '⚠️',
            })
            return
        }
        if(password === ''){
            toast('Enter New Password', {
                icon: '⚠️',
            })
            return
        }
        if(confPassword === ''){
            toast('Confirm Entered Password', {
                icon: '⚠️',
            })
            return
        }
        if(password !== confPassword){
            toast('Password And Confirm Password must be same', {
                icon: '⚠️',
            })
            return
        }

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
            {email,password}
        )
        toast.success(res.data); 
        } catch (err) {
            if (err.response && err.response.data) {
            toast.error(err.response.data); 
            } else {
            toast.error("Something went wrong");
            }
        }
    }

  return (
    <>
    <Navbar/>
        <div className={styles.login_page_container}>
          <div className={styles.login_form_container}>
          <h2 className={styles.form_header}>Change Password</h2>
          <div className={styles.label_input_container}>
          <label className={styles.form_label}>Enter Your Email</label>
          <input placeholder="Enter Your Email" className={styles.form_input} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className={styles.label_input_container}>
          <label className={styles.form_label}>Enter New Password</label>
          <input type="password" className={styles.form_input} placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className={styles.label_input_container}>
          <label className={styles.form_label}>Confirm New Password</label>
          <input type="confPassword" className={styles.form_input} placeholder="Enter Your Password" onChange={e=>setConfPassword(e.target.value)} />
          </div>
          {/* <div className={styles.label_input_container}>
                <Link href="/forgot-password" className={styles.forgot_pass_link}>Forgot Password</Link>
          </div> */}
          <div className={styles.login_form_button}>
          <button onClick={ChangePassword} className={styles.login_button}>Change Password</button>
          </div>
          </div>
        </div>
        </>
  )
}

export default page