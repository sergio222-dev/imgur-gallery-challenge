import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

export interface ImageRepository {
  fetchGallery(section: sectionOptions, sort: sortOptions, window: windowOptions, viral: boolean): Promise<ImageAggregate[]>
}
