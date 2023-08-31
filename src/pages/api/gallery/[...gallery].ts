import { NextApiRequest, NextApiResponse } from "next";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { container } from "@/lib/challenge.module";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ImageAggregate[]>
) {
  const { gallery } = req.query;

  if (!gallery) {
    return res.status(400).json([]);
  }

  if (!Array.isArray(gallery)) {
    return res.status(400).json([]);
  }

  if (gallery.length !== 4) {
    return res.status(400).json([]);
  }

  const option = gallery[0] as sectionOptions;
  const sort = gallery[1] as sortOptions;
  const window = gallery[2] as windowOptions;
  const viral = gallery[3] ? gallery[3] === 'true' : true;

  const service = container.resolve('getGallerySectionService');
  const images = await service.execute(option, sort, window, viral);
  res.status(200).json(images);
}
