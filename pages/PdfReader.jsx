import Head from "next/head";
import React, { useState } from "react";
import style from "../styles/PdfReader.module.css";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";

function PdfReader({ token, api_key, setApikey }) {
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [isFileUploded, SetisFileUploded] = useState(true);

  // state to store pdf file 
  const [pdf_file, setPdf_file] = useState();

  // state to store question asked and answer to provided
  const [question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");

  //  states for api modal
  const [tempkey, setTempkey] = useState('');
  const { isOpen: API_isOpen, onOpen: API_onOpen, onClose: API_onClose} = useDisclosure();


  function ShowToast(message) {
    toast({
      title: message,
      status: "info",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  }

  // handle pdf uplode 
  async function handleSubmit() {
    setLoader(true);

    const formData = new FormData();
    formData.append("file", pdf_file);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/PDF_upload`, formData)
      .then((res) => {
        // handle loader and toast
        ShowToast(res.data.message);
        setLoader(false);
        // once a one time pdf upload done we allow user to search question
        SetisFileUploded(false)
      })
      .catch((err) => {
        // handle loader and toast
        if(err?.response?.data?.error){
        ShowToast(err.response.data.error);}
        setLoader(false);
      });
  }

  // handle question search
  function hableSearch() {
    if(!api_key){API_onOpen();return}
    setAnswer('Searching...')
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/PDF_QA`,{ api_key,question })
      .then((res) => {
        setAnswer(res.data)
      })
      .catch((err) => {
        setAnswer(err.message)
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>PDF Reader</title>
        <meta
          name="description"
          content="uplode a pdf and ask anything from it"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={style.title}>Uplode a PDF and ask anythging from it !!</h1>
      <div className={style.inputOuterDiv}>
        <div>
          <input
            className={style.fileInput}
            onChange={(e) => setPdf_file(e.target.files[0])}
            type="file"
            name="pdf"
            id="pdf"
          />
          <p className={style.file_note}>
            Currently it supports only 1 or 2 page pdf <br /> with limit of 3 question per minute
          </p>
        </div>
        <div>
        <Button colorScheme="messenger" width={"80px"} onClick={handleSubmit} >
          {loader ? <div id={style.Loader}></div> : "Uplode"}
        </Button>
        <Button className={style.mobileButton} colorScheme="purple" margin={'0px 2px'} onClick={API_onOpen}>API key</Button>
        </div>
      </div>

      <div className={style.QandA_DIv}>
        <div className={style.questionInput}>
          <Input type="text" onChange={(e)=>setQuestion(e.target.value)}/>
          <Button colorScheme="whatsapp" width={"20%"} isDisabled={isFileUploded} onClick={hableSearch}>
            Search
          </Button>
        </div>
        <div className={style.ResultDiv}>{Answer}</div>
      </div>

      <Modal isOpen={API_isOpen} onClose={API_onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#1A1C23"} border={"1px solid gray"}>
          <ModalHeader>Enter OPEN_AI API KEY </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} gap={"10px"} marginBottom={"10px"}>
            <Input
              type="text"
              value={tempkey}
              onChange={(e) => setTempkey(e.target.value)}
            />
            <Button
              onClick={() => {
                setApikey(tempkey);
                API_onClose();
              }}
            >
              Save
            </Button>
          </ModalBody>
          <a style={{paddingLeft:'6%',marginBottom:'10px'}} href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key" target="_blank">How to get API key ?</a>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PdfReader;
