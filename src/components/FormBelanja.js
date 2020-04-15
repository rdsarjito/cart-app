import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FormBelanja extends React.Component {
    constructor() {
      super()
      this.state = {
        count: '',
        harga: '',
        namaBarang: '',
        idCategory: '',
        idBarang: ''
      };
  
      this._inputCount = this._inputCount.bind(this);
      this._inputBarang = this._inputBarang.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    };
  
    _inputCount(e) {
      this.setState( {count: e.target.value} )
    };
  
    _inputBarang(z) {
      var cariID = this.props.barangs.filter(e => e.id === parseInt(z.target.value))
      this.setState( {
        harga: cariID[0].harga, 
        namaBarang: cariID[0].namaBarang,
        idCategory: cariID[0].idCategory,
        idBarang: z.target.value
      });
    };
  
    _handleSubmit(e) {
      e.preventDefault();
      const totalHarga = parseInt(this.state.harga) * parseInt(this.state.count)
      this.props.tambahDataBelanja(
        +new Date(), 
        this.state.count, 
        totalHarga, 
        this.state.idCategory,
        this.state.idBarang
      );
  
      this.setState( {
        count: '',
        harga: '',
        totalHarga: '',
        namaBarang: '',
        idCategory: '',
        idBarang: ''
      });
    };
  
    render() {
      const listBarang = this.props.barangs.map((list) =>
      <option key={list.id} value={list.id}>
        {list.namaBarang}
      </option>
      );
      return (
        <form onSubmit={this._handleSubmit} style={{border: '2px solid black'}}>
          <h1>Form Belanja</h1>
          <div style={{margin: 20}}>
            <select style={{width: 263}} onChange={this._inputBarang} value={this.state.idBarang}>
              <option>-</option>
              {listBarang}
            </select>
            <input style={{width: 20}} onChange={this._inputCount} value={this.state.count}></input>
          </div>
          <input type='submit' value='Tambah' style={{marginLeft: 245}} />
        </form>
      );
    };
};

const mapStateToProps = (state) => {
  return {
    barangs: state.barang,
    belanja: state.belanja
  };
};

const mapDispatchToProps = {
  tambahDataBelanja: actions.tambahDataBelanja
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBelanja)