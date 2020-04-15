import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListBarang extends React.Component {
  constructor() {
    super()
    this.state = {
      listBarang: ''
    }
    this._hapusListHandler = this._hapusListHandler.bind(this);
  };

  _hapusListHandler(id) {
    this.props.hapusDataBarang(id);
    this.setState( {listBarang: this.props.barangs} )
  };

  render() {
    const listBarang = this.props.barangs.map((list) =>
    <li key={list.id}>
        <b>{list.namaBarang}</b> harganya <b>{list.harga}</b> <button onClick={() => this._hapusListHandler(list.id)}>x</button>
    </li>
    ); 
    return (
      <ul>{listBarang}</ul>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    categorys: state.category,
    barangs: state.barang
  };
};

const mapDispatchToProps = {
  hapusDataBarang: actions.hapusDataBarang
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBarang)