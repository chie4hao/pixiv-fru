import { initialState as initialSearchParams } from '../reducers/HomePage/searchParams';

if (!localStorage.getItem('language')) {
  localStorage.language = 'chs';
}

if (!localStorage.getItem('searchParams')) {
  localStorage.searchParams = JSON.stringify(initialSearchParams);
}
