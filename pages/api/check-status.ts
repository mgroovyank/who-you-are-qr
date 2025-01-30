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
  console.log("UUID received by check-status API:", uuid);
  const { data, error } = await supabase
    .from("qrCodeStatus")
    .select()
    .eq("uuid", uuid)
    .eq("status", 1);

  if (error) {
    console.log(error);
    console.log("Unable to mark Person as a valid person in database!!");
    return res.status(500).json({
      message: "Unable to mark Person as a valid person in database!!",
    });
  }

  if (data.length > 0) {
    console.log("This QR Code has already been used!!!");
    return res.status(500).json({
      message: "INVALID QR CODE - ALREADY USED",
    });
  }
  return res.status(200).json({ message: "QR CODE is still unused!!" });
}
//f884d98e-5574-4fa1-982c-6d1d56e4feee
