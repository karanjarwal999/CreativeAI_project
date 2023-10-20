import Head from 'next/head'
import React, { useState } from 'react'
import style from "@/styles/Home.module.css";
import { Button, Select } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function PreFixer() {
  const [code,setCode]=useState(`h1 {
    border-radius: 10px;
  }`)
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
          <div className={style.ButtonDiv}>
            <Button colorScheme="messenger">Convert</Button>
            <Button colorScheme="purple">
              Import <BsGithub style={{ marginLeft: "5px" }} />
            </Button>
          </div>
          <div>
          <AceEditor
              theme="monokai"
              value={`${code}`}
              mode="css"
              width="100%"
              onChange={(value)=>setCode(value)}
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
          <button className={style.gitImport}>
            Export <BsGithub />
          </button>
          <AceEditor
              theme="monokai"
              value={`h1 {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
  }`}
              mode="css"
              width="100%"
              height='100%'
              onChange={(value)=>setCode(value)}
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
    </div>
  )
}

export default PreFixer
