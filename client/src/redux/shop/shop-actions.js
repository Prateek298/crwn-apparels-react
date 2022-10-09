import { createAction } from '@reduxjs/toolkit';

import { shopActions } from './shop-slice';

export const fetchCollections = createAction('FETCH_COLLECTIONS');

export const { isCollectionsFetching, setCollections, setError } = shopActions;
