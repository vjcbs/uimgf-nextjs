import Link from 'next/link'
import MainLayout from '../components/MainLayout'
import SearchForm from '../components/SearchForm'
import Unsplash, {toJson} from 'unsplash-js'
import fetch from 'isomorphic-unfetch'

import '../sass/style.scss'

const unsplash = new Unsplash({
  applicationId: "APP_ID",
  secret: "SECRET_KEY",
  headers: {
    "Accept-Version": "v1",
  }
})

const ImageItem = ({ image }) => (
  <li key={image.id} className="result__item">
    <div className="result__img-wrapper">
      <Link href={`/i/${image.id}`}>
        <img className="result__img" src={`${image.urls.small}`} alt={`${image.description}`}/>
      </Link>
    </div>
  </li>
)

const Result = (props) => {

  if (!props.data.results || props.data.total == 0) {
    return (
      <MainLayout contentStyle={{flexDirection: 'column', justifyContent: 'flex-start', paddingTop: "88px"}}>
        <SearchForm asSearchBar={true} />
        <span className="nodata" style={{color: 'white', display: 'block'}}>Images not found</span>
      </MainLayout>
    )
  }

  return (
  <MainLayout>
    <SearchForm asSearchBar={true} total={props.data.total} keyword={props.url.query.keyword}/>
    <div className="result">
      <ul className="result__list">
        {props.data.results.map(image => (
          <ImageItem key={image.id} image={image} />
        ))}
      </ul>
    </div>
  </MainLayout>
)}

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    sessionStorage.setItem('result', JSON.stringify(this.props.data))
    window.scrollTo(0,0)
  }

  componentWillReceiveProps(nextProps) {
    sessionStorage.setItem('result', JSON.stringify(nextProps.data))
    window.scrollTo(0,0)
  }

  render() {
    return <Result {...this.props}/>
  }
}

Wrapper.getInitialProps = async ({req, query}) => {
  const data = await unsplash.search.photos(query.keyword, 1, 20)
  .then(toJson)
  .then(json => {
      return json
    }).catch(err => {
      return {data: {total: 0, results: []}}
    });

  return { data: data }
}

export default Wrapper
