import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import SearchParamsDialogs from '../components/SearchParamsDialogs';
/*
const getSmodeSelected = createSelector(
  state => state.HomePage.searchParams.s_mode,
  pathname => ['/', '/player', '/about'].findIndex(value => value === pathname)
);
*/
function mapStateToProps(state) {
  return {
    HomePage: state.main.settings.language.HomePage.searchParams,
    searchParams: state.HomePage.searchParams
  };
}

function searchParamsChange(a, b) {
  return {
    type: 'HomePage/searchParams/change',
    param: a,
    value: b
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchParamsChange }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchParamsDialogs);
