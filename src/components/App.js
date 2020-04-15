import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import FormBarang from './FormBarang';
import FormBelanja from './FormBelanja';
import ListBarang from './ListBarang';
import ListBelanja from './ListBelanja';

class App extends React.Component {
  constructor() {
    super()
    this._tambahCategory = this._tambahCategory.bind(this);
  };

  _tambahCategory() {
    const getValueCategory = window.prompt('Masukan Category');
    this.props.tambahDataCategory(+new Date(), getValueCategory);
  };

  render () {
    return (
      <Fragment>
        <button style={{marginLeft: 321}} onClick={this._tambahCategory}>Tambah Category +</button>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <FormBarang />  
          <FormBelanja /> 
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ListBarang />
          <ListBelanja />
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    categorys: state.category  
  };
};

const mapDispatchToProps = {
  tambahDataCategory: actions.tambahDataCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(App)