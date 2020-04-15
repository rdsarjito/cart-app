import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FormBarang extends React.Component {
  constructor() {
    super();
    this.state = {
      namaBarang: '',
      harga: '',
      idCategory: ''
    };
    this._inputBarang = this._inputBarang.bind(this);
    this._inputHarga = this._inputHarga.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._inputCategory = this._inputCategory.bind(this);
  };

  _inputBarang(e) {
    this.setState( {namaBarang: e.target.value} );
  };

  _inputHarga(e) {
    this.setState( {harga: e.target.value} );
  };

  _inputCategory(z) {
    var cariID = this.props.category.filter(e => e.id === parseInt(z.target.value));
    this.setState( {
      idCategory: cariID[0].id
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
    if(!this.state.idCategory) {
      alert('masukin category') 
    } else {
      this.props.tambahDataBarang(+new Date(), this.state.namaBarang, this.state.harga, this.state.idCategory);
      this.setState({
        namaBarang: '',
        harga: '',
        idCategory: ''
      });
    };
  };

  render() {
    const listCategory = this.props.category.map((list) =>
    <option key={list.id} value={list.id}>
      {list.namaCategory}
    </option>
    );
    return (
      <div>
        <form onSubmit={this._handleSubmit} style={{border: '2px solid black'}}>
          <h1>Form Barang</h1>
          <div style={{margin: 20}}>
            <input
              onChange={this._inputBarang}
              value={this.state.namaBarang}
              style={{ width: 263 }}
            /><br />
            <input onChange={this._inputHarga} value={this.state.harga}/>
            <select onChange={this._inputCategory} value={this.state.idCategory}>
              <option>-</option>
              {listCategory}
            </select><br></br>
            <input type='submit' value='Tambah'/>
          </div>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    category: state.category,
    barang: state.barang
  };
};

const mapDispatchToProps = {
  tambahDataBarang: actions.tambahDataBarang
};

export default connect(mapStateToProps, mapDispatchToProps)(FormBarang)