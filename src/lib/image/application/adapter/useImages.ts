import { fetchGallery } from "@/lib/image/application/adapter/slice/image.thunks";
import {
  currentPage,
  prevPage, selectImage,
  selectImages,
  totalPages
} from "@/lib/image/application/adapter/slice";
import { useDispatch, useSelector } from "@/lib/shared/application/adapter";

export const useImages = () => {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  const selectedSection = useSelector(state => state.image.selectedSection);
  const viral = useSelector(state => state.image.viral);
  const windowFilter = useSelector(state => state.image.window);
  const sort = useSelector(state => state.image.sort);
  const isLoading = useSelector(state => state.image.loading);


  const handleSelectImage = (imageId: string) => {
    dispatch(selectImage(imageId));
  }

  const getGallery = () => {
    dispatch(fetchGallery({ viral, option: selectedSection, sort, window: windowFilter }));
  }


  return {
    images,
    window: windowFilter,
    isLoading: isLoading === 'pending',
    getGallery,
    handleSelectImage,
  }
}
