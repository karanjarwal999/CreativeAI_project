import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function App({ Component, pageProps }) {
  const [api_key, setApikey]=useState('')
  const [token, setToken] = useState({ image: "", username: "" })
  const router = useRouter()

  function fetchuserData(token) {
    fetch("https://api.github.com/user", {
      headers: {
        'Authorization': `token ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setToken({ "username": data.login, "image": data.avatar_url, "token": router.query?.token })
      })
      .catch(err =>{console.log(err);  setToken({"token":token})})
  }

  useEffect(() => {
    if (router.query?.token) {
      fetchuserData(router.query?.token)
    }
  }, [router.query]);
  return <>
    <ChakraProvider>
      <Navbar token={token} />
      <Component token={token} api_key={api_key} setApikey={setApikey} {...pageProps} />
    </ChakraProvider>
  </>
}
