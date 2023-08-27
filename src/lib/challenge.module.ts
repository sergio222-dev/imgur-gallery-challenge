import { createInjector } from "typed-inject";
import { AxiosInstance } from "@/lib/shared/infrastructure/axios/instance";
import { AxiosImageRepository } from "@/lib/image/infrastructure/repository/AxiosImage.repository";
import { GetGallerySectionService } from "@/lib/image/application/GetGallerySection.service";

const buildContainer = () => {
  return createInjector()
  // instance
    .provideValue('axiosInstance', AxiosInstance)
  // repositories
    .provideClass('imageRepository', AxiosImageRepository)
  // repositories
    .provideClass('getGallerySectionService', GetGallerySectionService)
}

const container = buildContainer();

export { container };
