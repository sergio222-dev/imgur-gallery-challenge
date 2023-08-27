import { SectionObject } from "@/lib/image/domain/section.object";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";

export interface ImageRepository {
  fetchGallery(section: SectionObject): Promise<ImageAggregate[]>
}
