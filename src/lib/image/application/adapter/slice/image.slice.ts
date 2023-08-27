import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { fetchGallery } from "@/lib/image/application/adapter/slice/image.thunks";

interface ImageSliceState {
  ids: Array<string>;
  entities: Record<string, ImageAggregate>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  pages: number;
  page: number;
  perPage: number;
}

interface ImageSliceReducer extends SliceCaseReducers<ImageSliceState> {
  nextPage: CaseReducer<ImageSliceState, PayloadAction>,
  prevPage: CaseReducer<ImageSliceState, PayloadAction>,
}

const initialState: ImageSliceState = {
  ids: [],
  entities: {},
  loading: 'idle',
  pages: 0,
  page: 1,
  perPage: 10,
}


export const imageSlice = createSlice<ImageSliceState, ImageSliceReducer>({
  name: 'image',
  initialState,
  reducers: {
    nextPage: (state) => {
      if ( state.page < state.pages )
        state.page += 1;
    },
    prevPage: (state) => {
      if ( state.page > 1 )
        state.page -= 1;
    }
  },
  extraReducers: (builder) => {

    builder.addCase(fetchGallery.pending, (state) => {
      state.loading = 'pending';
    });

    builder.addCase(fetchGallery.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.ids = action.payload.map(x => x.id);
      state.pages = Math.ceil(action.payload.length / state.perPage);

      state.entities = action.payload.reduce<Record<string, ImageAggregate>>((acc, x) => {
        acc[x.id] = x;
        return acc;
      }, {});
    })
  }
});

export const { nextPage, prevPage } = imageSlice.actions;
