import { createAction } from '@reduxjs/toolkit';

import { shopActions } from './shopReducer';

export const fetchCollections = createAction('FETCH_COLLECTIONS');

export const { isCollectionsFetching, setCollections, setError } = shopActions;
