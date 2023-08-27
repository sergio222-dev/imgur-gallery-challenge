import { ImageRepository } from "@/lib/image/domain/image.repository";
import { AxiosInstance } from "axios";
import { IMAGE_ROUTES } from "@/lib/image/infrastructure/routes";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import {
  ImageGalleryResponse,
  ItemImageGalleryResponse,
  SingleImageGalleryResponse
} from "@/lib/shared/domain/GalleryResponse";

function isItemImageGalleryResponse(value: SingleImageGalleryResponse | ItemImageGalleryResponse): value is ItemImageGalleryResponse {
  return (value as ItemImageGalleryResponse).images !== undefined;
}

export class AxiosImageRepository implements ImageRepository {
  public static inject = ['axiosInstance'] as const;

  constructor(private readonly instance: AxiosInstance) {
  }

  async fetchGallery(section: string): Promise<ImageAggregate[]> {
    try {
      const response = await this.instance.get<ImageGalleryResponse>(`${ IMAGE_ROUTES.GALLERY }/${ section }///1`);

      // console.log('qxc', response.data.data[0].images);
      return response.data.data.map<ImageAggregate>(image => {
        // console.log('qxc image', image);
        if ( isItemImageGalleryResponse(image) ) {
          const {images, id, title, description} = image;

          const { link, type, gifv} = images[0];
          return {
            id,
            title,
            link,
            description,
            type: type === 'video/mp4' ? 'video' : 'image'
          }

        }

        const {id, title, link, description, type, gifv} = image;
        return {
          id,
          title,
          link,
          description,
          type: type === 'video/mp4' ? 'video' : 'image'
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
