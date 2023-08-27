import { createAsyncThunk } from "@reduxjs/toolkit";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { container } from "@/lib/challenge.module";

export const fetchGallery = createAsyncThunk<ImageAggregate[]>(
  'image/fetchGallery',
  async (_) => {
    return await fetch('/api/gallery').then(res => res.json()) as ImageAggregate[];
  }
);
