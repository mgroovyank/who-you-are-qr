import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Page() {
  const [data, setData] = useState("No result");

  const scannerConstraints: MediaTrackConstraints = {
    facingMode: "environment",
  };

  return (
    <>
      <QrReader
        scanDelay={300}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={scannerConstraints}
      />
      <p>{data}</p>
    </>
  );
}
