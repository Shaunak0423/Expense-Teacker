"use client"

import React from 'react'
import styles from '../Styles/Navbar.module.css'
import Image from 'next/image'
import logo from '../Images/App-Logo.png'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

function Navbar() {
    const router = useRouter()
    const Location = usePathname()
    const LoginPage = Location === '/'
  return (
    <div className={styles.navbar_container}>
    <Link href='/'>
    <Image src={logo} alt='Website-logo' className={styles.logo}/>
    </Link>


    <div className={styles.log_out_signin_button}>
        <button
         onClick={() => LoginPage ? router.push('/signup') : router.push('/')}
         className={styles.nav_button}
         >
            {
                LoginPage ? 'Signup' :  'Login'
            }
        </button>
    </div>

    </div>
  )
}

export default Navbar
