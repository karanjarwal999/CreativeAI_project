import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import style from "@/styles/Home.module.css";
import { useState } from "react";
import { Button, Select } from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-rust";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default function Home() {
  const [language, setLanguage] = useState({ from: "javascript", to: "java" });
  const [code,setCode]=useState()
  const popularLanguages = [
    "javascript",
    "java",
    "python",
    "typescript",
    "php",
    "kotlin",
    "c",
    "c++",
    "ruby",
    "c#",
    "swift",
    "go",
    "rust",
    "bbjective-c",
  ];

  return (
    <>
      <Head>
        <title>Code Converter</title>
        <meta
          name="description"
          content="convert code from one language to other language !"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.mainDiv}>
        <div className={style.leftDiv}>
          <div className={style.selecterDiv}>
            <Select
              name="from"
              id="FROMlanguage"
              onChange={(e) =>
                setLanguage((prev) => ({ ...prev, from: e.target.value }))
              }
            >
              {popularLanguages.map((el) =>
                el !== language.to ? <option style={{backgroundColor:"#17191f"}} value={el}>{el}</option> : null
              )}
            </Select>
            <Select
              name="tp"
              id="TOlanguage"
              onChange={(e) =>
                setLanguage((prev) => ({ ...prev, to: e.target.value }))
              }
            >
              {popularLanguages.map((el) =>
                el !== language.from ? <option style={{backgroundColor:"#17191f"}} value={el}>{el}</option> : null
              )}
            </Select>
          </div>
          <div className={style.ButtonDiv}>
            <Button colorScheme="messenger">Convert</Button>
            <Button colorScheme="red">Debug</Button>
            <Button colorScheme="blue">Review</Button>
            <Button colorScheme="purple">
              Import <BsGithub style={{ marginLeft: "5px" }} />
            </Button>
          </div>
          <div className={style.codeEditor}>
            <AceEditor
              theme="monokai"
              placeholder="// write code here"
              mode={language.from}
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
              placeholder="result will shown here"
              mode={language.from}
              width="100%"
              height="100%"
              onChange={(value)=>setCode(value)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={false}
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
    </>
  );
}
