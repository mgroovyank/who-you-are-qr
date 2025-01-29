import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Page() {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData("Found Result");
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={undefined}
      />
      <p>{data}</p>
    </>
  );
}
