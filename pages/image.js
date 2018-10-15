import React from 'react'

import MainLayout from '../components/MainLayout'
import SearchForm from '../components/SearchForm'
import ImagePage from '../components/ImagePage'

import '../sass/style.scss'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isImageHorizontal: false,
      wasImageSizeChecked: false
    }

    this.getData = this.getData.bind(this)
  }

  static async getInitialProps(context) {
    const {id} = context.query
    return {id}
  }

  componentDidMount() {
    this.setState({data: this.getData()})
  }

  componentDidUpdate() {
    if (!this.state.wasImageSizeChecked) {
      let img = this.state.data.filter(elem => elem.id == this.props.id)[0]
      if (img.width > img.height) {
        this.setState({isImageHorizontal: true, wasImageSizeChecked: true})
      }
    }
  }

  getData() {
    return JSON.parse(sessionStorage.getItem('result')).results
  }

  render() {
    return (
        <MainLayout>
          <SearchForm asSearchBar={true}/>
          {this.state.data.map(elem => {
            if(elem.id == this.props.id) {
              return (
                <ImagePage key={elem.id} image={elem} isHorizontal={this.state.isImageHorizontal}/>
              )
            }
          })}
        </MainLayout>
    )
  }
}
