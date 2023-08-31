import { ImageRepository } from "@/lib/image/domain/image.repository";
import { AxiosInstance } from "axios";
import { IMAGE_ROUTES } from "@/lib/image/infrastructure/routes";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import {
  ImageGalleryResponse,
  ItemImageGalleryResponse,
  SingleImageGalleryResponse
} from "@/lib/shared/domain/GalleryResponse";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

function isItemImageGalleryResponse(value: SingleImageGalleryResponse | ItemImageGalleryResponse): value is ItemImageGalleryResponse {
  return (value as ItemImageGalleryResponse).images !== undefined;
}

export class AxiosImageRepository implements ImageRepository {
  public static inject = ['axiosInstance'] as const;

  constructor(private readonly instance: AxiosInstance) {
  }

  async fetchGallery(section: sectionOptions, sort: sortOptions, window: windowOptions, viral: boolean): Promise<ImageAggregate[]> {
    try {
      const response = await this.instance.get<ImageGalleryResponse>(`${ IMAGE_ROUTES.GALLERY }/${ section }/${ sort }/${ window }/1?showViral=${ viral }`);

      return response.data.data.map<ImageAggregate>(image => {
        if ( isItemImageGalleryResponse(image) ) {
          const {images, id, title, description, ups, downs, score} = image;

          const {link, type} = images[0];
          return {
            id,
            title,
            upVote: ups,
            downVote: downs,
            score,
            link,
            description,
            type: type === 'video/mp4' ? 'video' : 'image'
          }
        }

        const {id, title, link, description, type, ups, downs, score} = image;
        return {
          id,
          title,
          link,
          upVote: ups,
          downVote: downs,
          score,
          description,
          type: type === 'video/mp4' ? 'video' : 'image'
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
