import { CaseReducer, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { ImageAggregate } from "@/lib/image/domain/ImageAggregate";
import { fetchGallery } from "@/lib/image/application/adapter/slice/image.thunks";
import { sectionOptions, sortOptions, windowOptions } from "@/lib/shared/domain/types/utils";

interface ImageSliceState {
  ids: Array<string>;
  entities: Record<string, ImageAggregate>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  pages: number;
  page: number;
  perPage: number;
  selectedSection: sectionOptions;
  viral: boolean;
  window: windowOptions;
  sort: sortOptions;
  selectedImageId: string;
}

interface ImageSliceReducer extends SliceCaseReducers<ImageSliceState> {
  nextPage: CaseReducer<ImageSliceState, PayloadAction>;
  prevPage: CaseReducer<ImageSliceState, PayloadAction>;
  setSection: CaseReducer<ImageSliceState, PayloadAction<'hot' | 'top' | 'user'>>;
  toggleViral: CaseReducer<ImageSliceState, PayloadAction>;
  setWindow: CaseReducer<ImageSliceState, PayloadAction<windowOptions>>;
  setSort: CaseReducer<ImageSliceState, PayloadAction<sortOptions>>;
  selectImage: CaseReducer<ImageSliceState, PayloadAction<string>>;
}

const initialState: ImageSliceState = {
  ids: [],
  entities: {},
  loading: 'idle',
  pages: 0,
  page: 1,
  perPage: 15,
  selectedSection: 'hot',
  viral: true,
  window: 'day',
  sort: 'time',
  selectedImageId: '',
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
    },
    setSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    toggleViral: (state) => {
      state.viral = !state.viral
    },
    setWindow: (state, action) => {
      state.window = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    selectImage: (state, action) => {
      state.selectedImageId = action.payload
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
      state.page = 1;

      state.entities = action.payload.reduce<Record<string, ImageAggregate>>((acc, x) => {
        acc[x.id] = x;
        return acc;
      }, {});
    })
  }
});

export const {
  nextPage,
  prevPage,
  setSection,
  toggleViral,
  setSort,
  setWindow,
  selectImage,
} = imageSlice.actions;
