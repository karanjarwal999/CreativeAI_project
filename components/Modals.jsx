import { useToast } from "@chakra-ui/react";
import {Button,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fetch_Code_From_Repo, Push_Code_To_Repo } from "./data_functions";

function Modals({token,output,setCode,api_key,setApikey,API_isOpen,API_onClose,Fetch_isOpen,Fetch_onClose,Push_isOpen,Push_onClose}) {

  const toast = useToast()
  const [tempkey, setTempkey] = useState('');
  const [fetchData, setFetchData] = useState({});
  const [PushData, setPushData] = useState({});


  function ShowToast(message){
    toast({
      title: message,
      status: "info",
      duration: 3000,
      position:'top',
      isClosable: true,
    })
  }
  useEffect(()=>{
    setFetchData({ "repoOwner": token.username })
  },[token])

  useEffect(()=>{
    setPushData(fetchData)
  },[fetchData])

  return (
    <>
      {/* modal to enter api key */}
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

      {/* modal to import github repo */}
      <Modal isOpen={Fetch_isOpen} onClose={Fetch_onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#1A1C23"} border={"1px solid gray"}>
          <ModalHeader>Fetch code from GITHUB REPO</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            marginBottom={"10px"}
          >
            <label htmlFor="username">Repo Owner :</label>
            <Input
              id="username"
              type="text"
              value={fetchData.repoOwner}
              onChange={(e) =>
                setFetchData((prev) => ({ ...prev, "repoOwner": e.target.value }))
              }
            />
            <label htmlFor="RepoName">Repo Name :</label>
            <Input
              id="RepoName"
              type="text"
              onChange={(e) =>
                setFetchData((prev) => ({ ...prev, "RepoName": e.target.value }))
              }
            />
            <label htmlFor="FilePath">File Path :</label>
            <Input
              id="FilePath"
              type="text"
              placeholder="src/app.js"
              onChange={(e) =>
                setFetchData((prev) => ({ ...prev, "FilePath": e.target.value }))
              }
            />
            <Button
              marginTop={"10px"}
              colorScheme="purple"
              onClick={() => Fetch_Code_From_Repo({token,setCode, fetchData,ShowToast,Fetch_onClose})}
            >
              Get Code
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* modal to push github repo */}
      <Modal isOpen={Push_isOpen} onClose={Push_onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"#1A1C23"} border={"1px solid gray"}>
          <ModalHeader>Push code to GITHUB REPO</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            marginBottom={"10px"}
          >
            <label htmlFor="username">Repo Owner :</label>
            <Input
              id="username"
              type="text"
              value={PushData.repoOwner}
              onChange={(e) =>
                setPushData((prev) => ({ ...prev, "repoOwner": e.target.value }))
              }
            />
            <label htmlFor="RepoName">Repo Name :</label>
            <Input
              id="RepoName"
              type="text"
              value={PushData.RepoName}
              onChange={(e) =>
                setPushData((prev) => ({ ...prev, "RepoName": e.target.value }))
              }
            />
            <label htmlFor="FilePath">File Path :</label>
            <Input
              id="FilePath"
              type="text"
              placeholder="src/app.js"
              value={PushData.FilePath}
              onChange={(e) =>
                setPushData((prev) => ({ ...prev, "FilePath": e.target.value }))
              }
            />
            <label htmlFor="CommitMessage">Commit Message :</label>
            <Input
              id="CommitMessage"
              type="text"
              placeholder="src/app.js"
              onChange={(e) =>
                setPushData((prev) => ({ ...prev, "CommitMessage": e.target.value }))
              }
            />
            <Button
              marginTop={"10px"}
              colorScheme="purple"
              onClick={() => Push_Code_To_Repo({token,PushData,ShowToast,output,Push_onClose})}
            >
              Push Code
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Modals;
