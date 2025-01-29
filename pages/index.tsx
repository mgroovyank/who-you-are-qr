import { Result } from "@zxing/library";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Page() {
  const [data, setData] = useState("No result");
  const [lastScanned, setLastScanned] = useState("");

  const scannerConstraints: MediaTrackConstraints = {
    facingMode: "environment",
  };

  function handleScanResult(result: Result) {
    console.log(result);
    setData(result.getText());
    const uuid: string = result.getText();
    console.log("uuid: " + uuid);
    if (uuid == lastScanned) {
      console.log("Already Scanned!!!");
      return;
    }
  }

  return (
    <>
      <QrReader
        scanDelay={1000}
        onResult={(result, error) => {
          if (!!result) {
            handleScanResult(result);
          }

          if (!!error) {
            console.log(error);
          }
        }}
        constraints={scannerConstraints}
      />
      <p>{data}</p>
    </>
  );
}
