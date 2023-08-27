export interface ItemImageGalleryResponse {
  id: string;
  type?: "image/jpeg" | "image/png" | "image/gif" | "video/mp4";
  mp4?: string;
  gifv?: string;
  link: string;
  title: string;
  description: string;
  images: SingleImageGalleryResponse[];
}

export interface SingleImageGalleryResponse {
  id: string;
  type: "image/jpeg" | "image/png" | "image/gif" | "video/mp4";
  mp4?: string;
  gifv?: string;
  link: string;
  title: string;
  description: string;
}

export interface ImageGalleryResponse {
  data: ItemImageGalleryResponse[] | SingleImageGalleryResponse[];
}
