import Head from 'next/head'
import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = Readonly<{
  name?: string;
  children?: React.ReactNode;
}>

const Layout = ({ name, children }: Props) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <title>{name || 'Coregonus'}</title>
      </Head>
      <div
      >
        <ToastContainer />
        {children}
      </div>
    </>
  )
}

export default Layout