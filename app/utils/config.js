import { initialState as initialSearchParams } from '../reducers/HomePage/searchParams';
import { initialState as initialSettings } from '../reducers/main/settings';

if (!localStorage.getItem('settings')) {
  localStorage.settings = JSON.stringify(initialSettings);
}

if (!localStorage.getItem('searchParams')) {
  localStorage.searchParams = JSON.stringify(initialSearchParams);
}
