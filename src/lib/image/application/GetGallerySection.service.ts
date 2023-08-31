import { ImageRepository } from "@/lib/image/domain/image.repository";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

export class GetGallerySectionService {
  public static inject = ['imageRepository'] as const;

  constructor(private readonly repository: ImageRepository) {
  }

  async execute(option: sectionOptions = "hot", sort: sortOptions = "time", window: windowOptions = "day", viral = true): Promise<ImageAggregate[]> {
    return await this.repository.fetchGallery(option, sort, window, viral);
  }
}
