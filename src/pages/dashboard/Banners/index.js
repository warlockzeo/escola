import React, { Component } from "react";
import Tabela from "../../../components/Tabela";
import { Spinner } from "reactstrap";
//import { Form, Select } from '@rocketseat/unform';

import FormUploadBanner from "../../../components/FormUploadBanner";
import ConfirmDelete from "../../../components/ConfirmDelete";

import urlBaseApi from "../../../components/config";

const camposBanners = [
  {
    id: "urlImage",
    numeric: false,
    disablePadding: true,
    label: "Imagem",
    component: "th",
    scope: "row",
    padding: "none"
  }
];

class Banners extends Component {
  state = {
    banners: [],
    bannerAtual: {},
    show: "tableBanner",
    showAnterior: "",
    errorMessage: ""
  };

  loadBanners = () => {
    fetch(`${urlBaseApi}banners`)
      .then(response => response.json())
      .then(responseJson => {
        const banners = responseJson.map(banner => {
          return {
            id: banner.id,
            urlImage: banner.urlImage
          };
        });
        this.setState({ banners });
      }).catch(() => {
        this.setState({ banners: [] });
      });
  };

  onAddBannerClick = () => {
    this.setState({
      showAnterior: this.state.show,
      show: "editAddBanner",
      bannerAtual: {}
    });
  };

  onDeletBannerClick = data => {
    this.setState({
      showAnterior: this.state.show,
      show: "deleteBanner",
      bannerAtual: data
    });
  };

  handleDeleteBanner = () => {
    const id = this.state.bannerAtual.id;
    this.setState({ show: "wait" });
    fetch(`${urlBaseApi}banners/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id })
    })
      .then(response => console.log(`resp:`, response))
      .then(() => {
        console.log(`deletado`);
        this.setState({
          show: 'tableBanner',
          bannerAtual: {}
        });
        this.loadBanners();
      }).catch(error => console.log(error));
  };

  handleSubmitBanner = data => {
      const formData = new FormData();
      formData.append('file', data.arquivo);
  
      fetch(`${urlBaseApi}files`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(`resp upload ok: ${responseJson.resp}`);
        
          fetch(`${urlBaseApi}banners`, {
            method: "POST",
            body: JSON.stringify({
              urlImage: data.nomeArquivo,
              posicao: data.posicao
            })
          })
            .then(response => response.json())
            .then(responseJson => {
              this.loadBanners();
            })
            .catch(response => this.setState({ show: "edit", errorMessage: response }));
            this.setState({show: 'tableBanner'});

        })
        .catch(error => console.error(`Caught error:  ${error}`));
  };

  handleCancelForm = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: "",
      bannerAtual: {}
    });
  };

  onClickBanner = () => {
    this.setState({ show: "tableBanner" });
  };

  cancelDelete = () => {
    this.setState({
      show: this.state.showAnterior,
      showAnterior: "",
      bannerAtual: {}
    });
  };

  componentWillMount() {
    this.loadBanners();
  }

  render() {
    return (
      <div className="dashboard">
        {this.state.show === "tableBanner" && (
          <div className="container">
            <Tabela
              titulo="Banners"
              campos={camposBanners}
              dados={this.state.banners}
              add={this.onAddBannerClick}
              delete={this.onDeletBannerClick}
            />
          </div>
        )}

        {this.state.show === "deleteBanner" && (
          <ConfirmDelete
            info={`do banner ${this.state.bannerAtual.urlImage}`}
            delete={this.handleDeleteBanner}
            cancel={this.cancelDelete}
          />
        )}

        {this.state.show === "editAddBanner" && (
          <FormUploadBanner
            titulo="Banner"
            dados={this.state.bannerAtual}
            onSubmit={this.handleSubmitBanner}
            onCancel={this.handleCancelForm}
            errorMessage={this.state.errorMessage}
          />
        )}

        {this.state.show === "wait" && (
          <div className="wrap100vh">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default Banners;
