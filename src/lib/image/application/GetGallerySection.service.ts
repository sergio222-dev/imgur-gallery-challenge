import { ImageRepository } from "@/lib/image/domain/image.repository";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";

export class GetGallerySectionService {
  public static inject = ['imageRepository'] as const;
  constructor(private readonly repository: ImageRepository) {}

  async execute(): Promise<ImageAggregate[]> {
    return await this.repository.fetchGallery("hot");
  }
}
