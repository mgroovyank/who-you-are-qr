"use client";
import { Result } from "@zxing/library";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Page() {
  const [data, setData] = useState("No result");
  const [lastScanned, setLastScanned] = useState("test");
  const [displayScanner, setDisplayScanner] = useState<boolean>(false);

  const scannerConstraints: MediaTrackConstraints = {
    facingMode: "environment",
  };

  async function handleScanResult(result: Result) {
    console.log(result);
    const uuid: string = result.getText().trim();

    console.log("uuid: " + uuid);
    console.log("lastScanned:" + lastScanned);
    if (uuid === lastScanned) {
      console.log("Already Scanned!!!");
      setData("INVALID - Already Scanned!");
      return;
    }
    setLastScanned(uuid);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        uuid: uuid,
      }),
    };

    console.log("Checking if QR CODE has already been used...");
    let qrCodeCheckStreamRes = await fetch("/api/check-status", options);
    console.log("qrCodeCheckStreamRes:", qrCodeCheckStreamRes);
    if (qrCodeCheckStreamRes.status != 200) {
      setData("INVALID QR CODE - ALREADY USED");
      return;
    }

    console.log("Marking status in supabase...");
    let resReadableStream = await fetch("/api/mark-status", options);
    console.log("resReadableStream:", resReadableStream);
    if (resReadableStream.status == 200) {
      setData("OK - PASS");
    } else {
      let res = await resReadableStream.json();
      console.log("res.message: ", res.message);
      setData(res.message);
    }
  }

  return (
    <>
      {displayScanner && (
        <QrReader
          scanDelay={4000}
          onResult={async (result, error) => {
            if (!!result) {
              await handleScanResult(result);
              setDisplayScanner(false);
            }

            if (!!error) {
              console.log("Error during scan!!");
              // console.log("lastScanned: ", lastScanned);
              console.log(error);
            }
          }}
          constraints={scannerConstraints}
        />
      )}
      <h2>{data}</h2>
      <button
        onClick={() => {
          setDisplayScanner(true);
          setData("No Result");
        }}
      >
        {" "}
        Scan Next
      </button>
    </>
  );
}
