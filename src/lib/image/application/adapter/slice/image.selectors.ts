import { ReduxState } from "@/lib/shared/application/adapter";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";

function createImageList(ids: string[], images: Record<string, ImageAggregate>) {
  return ids.map(id => images[id]);
}

function getCurrentPage(images: ImageAggregate[], page: number, perPage: number) {
  return images.slice((page - 1) * perPage, page * perPage);
}

export const selectImages = (state: ReduxState) => {
  const ids = state.image.ids;
  const images = createImageList(ids, state.image.entities);
  const currentPageImages = getCurrentPage(images, state.image.page, state.image.perPage);

  return currentPageImages;
}

export const currentPage = (state: ReduxState) => {
  const currentPageImage = state.image.page;
  return currentPageImage;
}

export const totalPages = (state: ReduxState) => {
  const totalPages = state.image.pages;
  return totalPages;
}
