import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListBelanja extends React.Component {
  constructor() {
    super()
    this.state = {
      listBelanja: ''
    }
    this._getNamaBarang = this._getNamaBarang.bind(this);
    this._hapusListHandler = this._hapusListHandler.bind(this);
    this._filteredCategory = this._filteredCategory.bind(this);
  }

  _getNamaBarang(idBarang) {
    const barangFiltered = this.props.barangs.filter(e => e.id === parseInt(idBarang));
    if (barangFiltered.length > 0) {
      return barangFiltered[0].namaBarang;
    };
    return 'barang tidak ditemukan'
  };

  _filteredCategory(idCategory) {
    var categoryFiltered = this.props.belanjas.filter(e => e.idCategory === idCategory);

    const totalPerCategory = categoryFiltered.reduce((tot, arr) => {
      return tot +arr.totalHarga
    }, 0);

    return totalPerCategory;
  }

  _hapusListHandler(id) {
    this.props.hapusListBelanja(id);
    this.setState( {listBelanja: this.props.belanjas})
  };

  render() {
    const listBelanja = this.props.belanjas.map((list) =>
    <li key={list.id}>
      <b>{this._getNamaBarang(list.idBarang)}</b> jumlanya <b>{list.count}</b> harganya <b>{list.totalHarga}</b> <button onClick={() => this._hapusListHandler(list.id)}>x</button>
    </li>
    );
    
    const sumTotalHarga = this.props.belanjas.reduce((tot, arr) => {
      return tot + arr.totalHarga;
    }, 0);
    
    const listCategory = this.props.categorys.map((list) => 
    <li key={list.id}>
      <b>{list.namaCategory} {this._filteredCategory(list.id)}</b>
    </li>
    );

    return (
      <div>
        <div>
          <ul>{listBelanja}</ul>
          <p style={{marginLeft: 190}}>Total Belanja: <b>{sumTotalHarga}</b></p>
        </div>
        <div>
          {listCategory}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    categorys: state.category,
    barangs: state.barang,
    belanjas: state.belanja
  };
};

const mapDispatchToProps = {
  hapusListBelanja: actions.hapusDataBelanja
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBelanja)