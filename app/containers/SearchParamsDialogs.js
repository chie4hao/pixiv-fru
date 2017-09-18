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

function searchParamsChange(param, value) {
  return {
    type: 'HomePage/searchParams/change',
    param,
    value
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchParamsChange }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchParamsDialogs);
