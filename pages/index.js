import MainLayout from '../components/MainLayout'
import SearchForm from '../components/SearchForm'
import React from 'react'
import '../sass/style.scss'

class Index extends React.Component {
  render () {
    return <MainLayout>
            <SearchForm />
          </MainLayout>
  }
}

export default Index
