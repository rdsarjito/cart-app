import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

const LIST_CATEGORY_STORAGE = 'list-category';
const LIST_BARANG_STORAGE = 'list-barang';
const LIST_BELANJA_STORAGE = 'list-belanja';

const getLocalStorageCategory = () => {
  const storageCategory = localStorage.getItem(LIST_CATEGORY_STORAGE);
  if(!storageCategory) return[];
  return JSON.parse(storageCategory);
};

const getLocalStorageBarang = () => {
  const storageBarang = localStorage.getItem(LIST_BARANG_STORAGE);
  if (!storageBarang) return [];
  return JSON.parse(storageBarang);
};

const getLocalStorageBelanja = () => {
  const storageBelanja = localStorage.getItem(LIST_BELANJA_STORAGE);
  if (!storageBelanja) return [];
  return JSON.parse(storageBelanja);
};

const saveToLocalStorageCategory = (items) => {
  localStorage.setItem(LIST_CATEGORY_STORAGE, JSON.stringify(items));
}

const saveToLocalStorageBarang = (items) => {
  localStorage.setItem(LIST_BARANG_STORAGE, JSON.stringify(items));
};

const saveToLocalStorageBelanja = (items) => {
  localStorage.setItem(LIST_BELANJA_STORAGE, JSON.stringify(items));
};

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      listBarang: getLocalStorageBarang(),
      listBelanja: getLocalStorageBelanja(),
      listCategory: getLocalStorageCategory()
    };
    this._tambahCategory = this._tambahCategory.bind(this);
    this._simpanBarang = this._simpanBarang.bind(this);
    this._simpanBelanja = this._simpanBelanja.bind(this);
    this._hapusListBarang = this._hapusListBarang.bind(this);
    this._hapusListBelanja = this._hapusListBelanja.bind(this);
  };

  // TAMBAH CATEGORY DAN SIMPAN CATEGORY
  _tambahCategory() {
    var getValueCategory = window.prompt('Masukan Category');
    var listBaru = this.state.listCategory;
    listBaru.push({
      category: getValueCategory,
      id: +new Date()
    });

    saveToLocalStorageCategory(listBaru);

    this.setState( {
      listCategory: listBaru
    });
    
  };

  _simpanBarang(namaBarang, harga, idCategory) {
    var listBaru = this.state.listBarang;
    listBaru.push({
      namaBarang,
      harga,
      idCategory,
      id: +new Date()
    });

    saveToLocalStorageBarang(listBaru);

    this.setState( {
      listBarang: listBaru
    });
  };

  _simpanBelanja(count, totalHarga, idCategory, idBarang) {
    var listBaru = this.state.listBelanja;
    listBaru.push({
      count,
      totalHarga,
      idCategory,
      idBarang,
      id: +new Date()
    });

    saveToLocalStorageBelanja(listBaru);

    this.setState( {
      listBelanja: listBaru
    });
  };

  _hapusListBarang(id) {
    const newList = this.state.listBarang;
    const cariIndex = newList.findIndex(e => e.id === id);
    if (cariIndex > -1) {
      newList.splice(cariIndex, 1);
      this.setState({
        listBarang: newList
      });
    };
    saveToLocalStorageBarang(newList);
  };

  _hapusListBelanja(id) {
    const newList = this.state.listBelanja;
    const cariIndex = newList.findIndex(e => e.id === id);
    if (cariIndex > -1) {
      newList.splice(cariIndex, 1);
      this.setState({
        listBelanja: newList
      });
    };
    saveToLocalStorageBelanja(newList);
  };

  render () {
    return (
      <Fragment>
        <button style={{marginLeft: 321}} onClick={this._tambahCategory}>Tambah Category +</button>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <FormBarang 
            categorys={this.state.listCategory} 
            submitBarang={this._simpanBarang}
          />
          <FormBelanja 
            barangs={this.state.listBarang} 
            submitBelanja={this._simpanBelanja}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ListBarang 
            barangs={this.state.listBarang} 
            hapusListBarang={this._hapusListBarang} 
          />
          <ListBelanja 
            categorys={this.state.listCategory} 
            barangs={this.state.listBarang}
            belanjas={this.state.listBelanja}
            hapusListBelanja={this._hapusListBelanja} 
          />
        </div>
      </Fragment>
    );
  };
};

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
    var cariID = this.props.categorys.filter(e => e.id === parseInt(z.target.value));
    this.setState( {
      idCategory: cariID[0].id
    });
  };

  _handleSubmit(e) {
    e.preventDefault();
    if(!this.state.idCategory) {
      alert('masukin category') 
    } else {
      this.props.submitBarang(this.state.namaBarang, this.state.harga, this.state.idCategory);
      this.setState({
        namaBarang: '',
        harga: '',
        idCategory: ''
      });
    };
  };

  render() {
    const listCategory = this.props.categorys.map((list) =>
    <option key={list.id} value={list.id}>
      {list.category}
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

class ListBarang extends React.Component {
  constructor() {
    super()
    this._hapusListHandler = this._hapusListHandler.bind(this);
  };

  _hapusListHandler(id) {
    this.props.hapusListBarang(id);
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

class FormBelanja extends React.Component {
  constructor() {
    super()
    this.state = {
      count: '',
      idBarang: '',
      harga: '',
      totalHarga: '',
      namaBarang: '',
      idCategory: ''
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
      idBarang: z.target.value, 
      harga: cariID[0].harga, 
      namaBarang: cariID[0].namaBarang,
      idCategory: cariID[0].idCategory
    });
  };

  _handleSubmit(e) {
    e.preventDefault();

    this.state.totalHarga = parseInt(this.state.harga) * parseInt(this.state.count)
    this.props.submitBelanja( 
      this.state.count, 
      this.state.totalHarga, 
      this.state.idCategory,
      this.state.idBarang
    );

    this.setState( {
      count: '',
      idBarang: '',
      harga: '',
      totalHarga: '',
      namaBarang: '',
      idCategory: ''
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

class ListBelanja extends React.Component {
  constructor() {
    super()
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

    return totalPerCategory
  }

  _hapusListHandler(id) {
    this.props.hapusListBelanja(id);
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
      {list.category} {this._filteredCategory(list.id)}
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

ReactDOM.render(<App />, document.getElementById('root'));