import { initialState as initialSearchParams } from '../reducers/HomePage/searchParams';
import { initialState as initialSettings } from '../reducers/main/settings';

// delete later
localStorage.settings = JSON.stringify(initialSettings);
localStorage.searchParams = JSON.stringify(initialSearchParams);

if (!localStorage.getItem('settings')) {
  localStorage.settings = JSON.stringify(initialSettings);
}


if (!localStorage.getItem('searchParams')) {
  localStorage.searchParams = JSON.stringify(initialSearchParams);
}
