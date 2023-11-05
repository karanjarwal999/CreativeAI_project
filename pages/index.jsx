import Head from "next/head";
import style from "@/styles/Home.module.css";
import { useState } from "react";
import { Button, Select, useDisclosure, useToast } from "@chakra-ui/react";
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
import Modals from "@/components/Modals";
import {
  Request_Convert_Code,
  Request_Debug_Code,
  Request_QualityCheck,
} from "@/components/data_functions";

export default function Home({ token, api_key, setApikey }) {
  const [language, setLanguage] = useState({ from: "javascript", to: "java" });
  const [code, setCode] = useState('');
  const [output, setOutput] = useState("");
  const toast = useToast()

  // states to manage modals
  const { isOpen: API_isOpen, onOpen: API_onOpen, onClose: API_onClose} = useDisclosure();
  const { isOpen: Push_isOpen, onOpen: Push_onOpen, onClose: Push_onClose} = useDisclosure();
  const { isOpen: Fetch_isOpen, onOpen: Fetch_onOpen, onClose: Fetch_onClose} = useDisclosure();

  // options for language selection input
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

  // this function render a toast at the top with message
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

  // functionn middleware to pass porps to function
  function Action_middleware(func) {
    if (api_key) {
      func({
        target_language: language.to,
        current_language: language.from,
        code,
        api_key,
        setOutput,
        ShowToast
      });
    } else {
      API_onOpen();
    }
  }

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
              {popularLanguages.map((el, ind) =>
                el !== language.to ? (
                  <option
                    key={ind}
                    style={{ backgroundColor: "#17191f" }}
                    value={el}
                  >
                    {el}
                  </option>
                ) : null
              )}
            </Select>
            <Select
              name="tp"
              id="TOlanguage"
              onChange={(e) =>
                setLanguage((prev) => ({ ...prev, to: e.target.value }))
              }
            >
              {popularLanguages.map((el, ind) =>
                el !== language.from ? (
                  <option
                    key={ind}
                    style={{ backgroundColor: "#17191f" }}
                    value={el}
                  >
                    {el}
                  </option>
                ) : null
              )}
            </Select>
          </div>
          <div className={style.ButtonDiv}>
            <Button margin={'0px 2px'}
              colorScheme="messenger"
              onClick={() => Action_middleware(Request_Convert_Code)}
            >
              Convert
            </Button>
            <Button margin={'0px 2px'}
              colorScheme="red"
              onClick={() => Action_middleware(Request_Debug_Code)}
            >
              Debug
            </Button>
            <Button margin={'0px 2px'}
              colorScheme="blue"
              onClick={() => Action_middleware(Request_QualityCheck)}
            >
              Review
            </Button>
            <Button margin={'0px 2px'} colorScheme="purple" 
            onClick={()=> token.username && token.image ? Fetch_onOpen() : ShowToast() }>
              Import <BsGithub style={{ marginLeft: "5px" }} />
            </Button>
            
            {/* below buttons will only visible for mobile */}
            <Button className={style.mobileButton} colorScheme="purple" margin={'0px 2px'} display={"flex"} gap={'5px'}  onClick={()=> token.username && token.image ? Push_onOpen() : ShowToast()}>
              Export 
            </Button>
            <Button className={style.mobileButton} colorScheme="purple" margin={'0px 2px'} onClick={API_onOpen}>API key</Button>
          </div>
          <div className={style.codeEditor}>
            <AceEditor
              theme="monokai"
              placeholder="// write code here"
              mode={language.from}
              width="100%"
              value={code}
              onChange={(value) => setCode(value)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              wrapEnabled={true}
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
          <Button  colorScheme="purple" margin={'0px 2px'} display={"flex"} gap={'5px'}  onClick={()=> token.username && token.image ? Push_onOpen() : ShowToast()}>
              Export <BsGithub />
            </Button>
            <Button  colorScheme="purple" margin={'0px 2px'} onClick={API_onOpen}>API key</Button>
          </div>
          <AceEditor
            theme="monokai"
            placeholder="result will shown here"
            mode={language.to}
            width="100%"
            height="100%"
            value={output}
            onChange={(value) => setOutput(value)}
            fontSize={14}
            showPrintMargin={true}
            showGutter={false}
            highlightActiveLine={true}
            wrapEnabled={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>

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
      </main>
    </>
  );
}
