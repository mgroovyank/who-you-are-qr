import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { uuid } = await req.body;
  console.log("UUID received by API:", uuid);
  const { data, error } = await supabase
    .from("qrCodeStatus")
    .update({ status: 1 })
    .eq("uuid", uuid)
    .select();

  if (error) {
    console.log(error);
    console.log("Unable to mark Person as a valid person in database!!");
    return res.status(500).json({
      message: "Unable to mark Person as a valid person in database!!",
    });
  }
  if (data.length == 0) {
    console.log(
      "Invalid QR Code!! This QR Code doesn't belong to Who-You-Are-QR!!"
    );
    return res.status(500).json({
      message:
        "Invalid QR Code!! This QR Code doesn't belong to Who-You-Are-QR!!",
    });
  }
  return res.status(200).json({ message: data[0] });
}
//f884d98e-5574-4fa1-982c-6d1d56e4feee
