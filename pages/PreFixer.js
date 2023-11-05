import Head from 'next/head'
import React, { useState } from 'react'
import style from "@/styles/Home.module.css";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import Modals from '@/components/Modals';
import { Request_CSS } from '@/components/data_functions';

function PreFixer({token, api_key, setApikey}) {

  // states to manage modals
  const { isOpen: API_isOpen, onOpen: API_onOpen, onClose: API_onClose} = useDisclosure();
  const { isOpen: Push_isOpen, onOpen: Push_onOpen, onClose: Push_onClose} = useDisclosure();
  const { isOpen: Fetch_isOpen, onOpen: Fetch_onOpen, onClose: Fetch_onClose} = useDisclosure();

 
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('');
  const toast = useToast()

  function ShowToast(message,submessage){
    toast({
      title: message||'Connect github first...',
      description: submessage||"By clicking on the github logo",
      status: "warning",
      duration: 5000,
      position:'top',
      isClosable: true,
    })
  }


  return (
    <div>
      <Head>
        <title>CSS PreFixer</title>
        <meta name="description" content="maintain your style across the all browsers and all versions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={style.title}>CSS PreFix Generetor</h1>
      <main className={style.mainDiv}>
        <div className={style.leftDiv}>
          <div className={style.PrefixButtonDiv}>
            <Button colorScheme="messenger" onClick={()=>api_key?Request_CSS({code,api_key,setOutput,ShowToast}):API_onOpen()}>Convert</Button>
            <Button colorScheme="blue" onClick={API_onOpen}>API Key</Button>
            <Button colorScheme="purple" onClick={()=> token.username && token.image ? Fetch_onOpen() : ShowToast()}>
              Import <BsGithub style={{ marginLeft: "5px" }} />
            </Button>
            <Button className={style.mobileButton} colorScheme="purple" margin={'0px 2px'} display={"flex"} gap={'5px'}  onClick={()=> token.username && token.image ? Push_onOpen() : ShowToast()}>
              Export 
            </Button>
          </div>
          <div>
            <AceEditor
              theme="monokai"
              value={code}
              mode="css"
              width="100%"
              wrapEnabled={true}
              // height='100%'
              placeholder={
`h1 {
      border-radius: 10px;
}`}
              onChange={(value) => setCode(value)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </div>
        </div>
        <div className={style.ResultDiv}>
          <div className={style.gitImport}>
          <Button colorScheme="purple" margin={'0px 2px'} display={"flex"} gap={'5px'}  onClick={()=> token.username && token.image ? Push_onOpen() : ShowToast()}>
              Export <BsGithub />
            </Button>
          </div>
          <AceEditor
            theme="monokai"
            mode="css"
            width="100%"
            height='100%'
            wrapEnabled={true}
            placeholder={
`h1 {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
}`}
            value={output}
            onChange={(value) => setOutput(value)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </main>

      {/* importing all the modals */}
      <Modals
          token={token}
          output={output}
          setCode={setCode}
          api_key={api_key}
          setApikey={setApikey}
          
          API_isOpen={API_isOpen}
          API_onClose={API_onClose}

          Push_isOpen={Push_isOpen}
          Push_onClose={Push_onClose}

          Fetch_isOpen={Fetch_isOpen}
          Fetch_onClose={Fetch_onClose}
        />
    </div>
  )
}

export default PreFixer
