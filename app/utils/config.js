const {
  language = 'english',
  downloadOptions = 3,
  themeOptions
} = localStorage;

if (!localStorage.getItem('language')) {
  localStorage.language = 'english';
}
