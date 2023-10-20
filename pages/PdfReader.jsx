import Head from "next/head";
import React from "react";
import style from "../styles/PdfReader.module.css";
import { Button, Input } from "@chakra-ui/react";

function PdfReader() {
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
      <div className={style.file_input}>
        <input type="file" name="pdf" id="pdf" />
        <div id={style.Loader}></div>
      </div>
      <p className={style.file_note}>
        Currently it supports only 1 or 2 page pdf
      </p>

      <div className={style.QandA_DIv}>
        <div className={style.questionInput}>
          <Input type="text" />
          <Button colorScheme="whatsapp" width={"20%"}>
            Search
          </Button>
        </div>
        <div className={style.ResultDiv}></div>
      </div>
    </div>
  );
}

export default PdfReader;
