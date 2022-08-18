import { put } from 'redux-saga/effects';
import * as actionCreators from '../actions/actionCreators';
import * as API from '../../api';
import { mergeArrObjectsById } from '../../common/functions';

export function* getMangaSaga(action) {
  yield put(actionCreators.getMangaRequest());
  try {
    const { data: { data } } = yield API.getManga(action.payload.options);
    yield put(actionCreators.getMangaSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaError({ error }));
  }
}

export function* getMangaCatalogSaga(action) {
  yield put(actionCreators.getMangaCatalogRequest());
  try {
    const { data: { data } } = yield API.getMangaCatalog(action.payload.options);
    yield put(actionCreators.getMangaCatalogSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaCatalogError({ error }));
  }
}

export function* getMangaSearchSaga(action) {
  yield put(actionCreators.getMangaSearchRequest());
  try {
    const { data: { data } } = yield API.getMangaCatalog(action.payload.options);
    yield put(actionCreators.getMangaSearchSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaSearchError({ error }));
  }
}

export function* getMangaCoversSaga(action) {
  yield put(actionCreators.getMangaCoversRequest());
  try {
    const { data: { data } } = yield API.getMangaCovers(action.payload.options);
    yield put(actionCreators.getMangaCoversSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaCoversError({ error }));
  }
}

export function* getChapterSaga(action) {
  yield put(actionCreators.getChapterRequest());
  try {
    const { data: { data } } = yield API.getChapter(action.payload.options);
    yield put(actionCreators.getChapterSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChapterError({ error }));
  }
}
export function* getChaptersSaga(action) {
  yield put(actionCreators.getChaptersRequest());
  try {
    const { data: { data } } = yield API.getChapters(action.payload.options);
    yield put(actionCreators.getChaptersSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChaptersError({ error }));
  }
}

export function* getChapterPagesSaga(action) {
  yield put(actionCreators.getChapterPagesRequest());
  try {
    const { data: { data } } = yield API.getChapterPages(action.payload.options);
    yield put(actionCreators.getChapterPagesSuccess(data));
  } catch (error) {
    yield put(actionCreators.getChapterPagesError({ error }));
  }
}

export function* getNextChapterIdSaga(action) {
  yield put(actionCreators.getNextChapterIdRequest());
  try {
    const { data: { data } } = yield API.getNextChapterId(action.payload.options);
    yield put(actionCreators.getNextChapterIdSuccess(data));
  } catch (error) {
    yield put(actionCreators.getNextChapterIdError({ error }));
  }
}

export function* getFirstChapterIdSaga(action) {
  yield put(actionCreators.getFirstChapterIdRequest());
  try {
    const { data: { data } } = yield API.getFirstChapterId(action.payload.options);
    yield put(actionCreators.getFirstChapterIdSuccess(data));
  } catch (error) {
    yield put(actionCreators.getFirstChapterIdError({ error }));
  }
}

export function* getTagListSaga() {
  yield put(actionCreators.getTagListRequest());
  try {
    const { data: { data } } = yield API.getTagList();
    yield put(actionCreators.getTagListSuccess(data));
  } catch (error) {
    yield put(actionCreators.getTagListError({ error }));
  }
}

export function* getMangaListsSaga(action) {
  yield put(actionCreators.getMangaListsRequest());
  try {
    const { data: { data } } = yield API.getMangaLists(action.payload.options);
    yield put(actionCreators.getMangaListsSuccess(data));
  } catch (error) {
    yield put(actionCreators.getMangaListsError(error));
  }
}

export function* saveMangaToListSaga(action) {
  yield put(actionCreators.saveMangaToListRequest());
  try {
    const { data: { data } } = yield API.saveMangaToList(action.payload.options);
    yield put(actionCreators.saveMangaToListSuccess(data));
  } catch (error) {
    yield put(actionCreators.saveMangaToListError(error));
  }
}

export function* removeMangaFromListSaga(action) {
  yield put(actionCreators.removeMangaFromListRequest());
  try {
    const { data: { data } } = yield API.removeMangaFromList(action.payload.options);
    yield put(actionCreators.removeMangaFromListSuccess(data));
  } catch (error) {
    yield put(actionCreators.removeMangaFromListError(error));
  }
}

export function* getListSaga(action) {
  yield put(actionCreators.getListRequest());
  try {
    const { data: { data } } = yield API.getList(action.payload.options);
    yield put(actionCreators.getListSuccess(data));
  } catch (error) {
    yield put(actionCreators.getListError(error));
  }
}

export function* getRecommendationListSaga(action) {
  yield put(actionCreators.getRecommendationListRequest());
  try {
    const { data: { data: { list } } } = yield API.getRecommendationList(action.payload.options);
    const { data: { data } } = yield API.getMangaCatalog({
      ids: list,
      limit: list.length,
    });
    yield put(actionCreators.getRecommendationListSuccess(data));
  } catch (error) {
    yield put(actionCreators.getRecommendationListError(error));
  }
}

export function* getFullRecommendationListSaga(action) {
  yield put(actionCreators.getFullRecommendationListRequest());
  try {
    const { data: { data: { list } } } = yield API.getFullRecommendationList(action.payload.options);
    const ids = list.map(({ id }) => id);
    const { data: { data } } = yield API.getMangaCatalog({
      ids: ids,
      limit: ids.length,
    });
    data.mangaList = mergeArrObjectsById(data.mangaList, list);
    yield put(actionCreators.getFullRecommendationListSuccess(data));
  } catch (error) {
    yield put(actionCreators.getFullRecommendationListError(error));
  }
}

export function* saveMangaToRecommendationListSaga(action) {
  yield put(actionCreators.saveMangaToRecommendationListRequest());
  try {
    const { data: { data } } = yield API.saveMangaToRecommendationList(action.payload.options);
    yield put(actionCreators.saveMangaToRecommendationListSuccess(data));
  } catch (error) {
    yield put(actionCreators.saveMangaToRecommendationListError(error));
  }
}

export function* removeMangaFromRecommendationListSaga(action) {
  yield put(actionCreators.removeMangaFromRecommendationListRequest());
  try {
    const { data: { data } } = yield API.removeMangaFromRecommendationList(action.payload.options);
    yield put(actionCreators.removeMangaFromRecommendationListSuccess(data));
  } catch (error) {
    yield put(actionCreators.removeMangaFromRecommendationListError(error));
  }
}

export function* getCarouselCatalogSaga(action) {
  const { options, order } = action.payload;
  yield put(actionCreators.getCarouselCatalogRequest(order));
  try {
    const { data: { data } } = yield API.getMangaCatalog(options);
    yield put(actionCreators.getCarouselCatalogSuccess(data, order));
  } catch (error) {
    yield put(actionCreators.getCarouselCatalogError({ error }, order));
  }
}