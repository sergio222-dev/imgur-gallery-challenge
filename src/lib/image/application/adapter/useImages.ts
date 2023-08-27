import { fetchGallery } from "@/lib/image/application/adapter/slice/image.thunks";
import { currentPage, nextPage, prevPage, selectImages, totalPages } from "@/lib/image/application/adapter/slice";
import { useDispatch, useSelector } from "@/lib/shared/application/adapter";

export const useImages = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const pages = useSelector(totalPages);
  const page = useSelector(currentPage);

  const getGallery = () => {
    dispatch(fetchGallery());
  }

  const nextPageClick = () => {
    dispatch(nextPage());
  }

  const prevPageClick = () => {
    dispatch(prevPage())
  }

  return {
    images,
    pages,
    page,
    getGallery,
    nextPageClick,
    prevPageClick,
  }
}
