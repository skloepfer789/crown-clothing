import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = memoize((collectionUrlParam) => 
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
    )
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => 
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);
//!! 'double bang' converts anything into a boolean (t or f) 0, null, empty strings all go false. 1, words in string, objects all go true. So this test if we have shop data, if we do, it says true, if we don't we get false.