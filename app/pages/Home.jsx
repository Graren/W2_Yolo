import React, { Component } from 'react';
import Page from '../pages/Page';
import HomeContainer from '../containers/Home';

class Home extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Yolo';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'A Yolo' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <HomeContainer {...this.props} />
      </Page>
    );
  }
}

export default Home;
