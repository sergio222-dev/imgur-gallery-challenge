import { createAsyncThunk } from "@reduxjs/toolkit";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

interface FetchGalleryParameters {
  option: sectionOptions;
  window: windowOptions;
  sort: sortOptions;
  viral: boolean;
}

export const fetchGallery = createAsyncThunk<ImageAggregate[], FetchGalleryParameters>(
  'image/fetchGallery',
  async ({option, viral, window, sort}) => {
    return await fetch(`/api/gallery/${option}/${sort}/${window}/${viral}`).then(res => res.json()) as ImageAggregate[];
  }
);
