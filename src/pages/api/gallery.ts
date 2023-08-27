import { NextApiRequest, NextApiResponse } from "next";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { container } from "@/lib/challenge.module";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageAggregate[]>
) {
  const service = container.resolve('getGallerySectionService');
  const images = await service.execute();
  res.status(200).json(images);
}
