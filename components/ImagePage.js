import Link from 'next/link'

const Image = ({image, isHorizontal}) => {

  const createdAt = new Date(image.created_at).toLocaleDateString('ru-RU')
  const horizontalImageStyle = isHorizontal ? {
    flexDirection: "column",
    alignItems: "stretch"
  } : {}
  const horizontalImageWrapperStyle = isHorizontal ? {
    maxWidth: "100%"
  } : {}


  return (
  <div className="image" style={horizontalImageStyle}>
    <div className="image__img-wrapper" style={horizontalImageWrapperStyle}>
      <img className="image__img" src={`${image.urls.regular}`} alt={`${image.description}`}/>
    </div>
    <div className="image__info">
      <table className="image__table">
        <tbody>
          <tr>
            <td>Description:</td>
            <td>{image.description}</td>
          </tr>
          <tr>
            <td>Uploaded By:</td>
            <td><a href={`${image.user.links.html}`} target="_blank">{image.user.username}</a></td>
          </tr>
          <tr>
            <td>Created At:</td>
            <td>{createdAt}</td>
          </tr>
          <tr>
            <td>Full Width:</td>
            <td>{image.width}</td>
          </tr>
          <tr>
            <td>Full Height:</td>
            <td>{image.height}</td>
          </tr>
          <tr>
            <td>Original image:</td>
            <td><a href={`${image.links.html}`} target="_blank">link</a></td>
          </tr>
        </tbody>
      </table>
      <div className="image__tags">
        {image.tags.map(elem => (
          <Link href={`/result?keyword=${elem.title}`}>
            <a key={`${elem.title}`}><span className="image__tag">{elem.title}</span></a>
          </Link>
        ))}
      </div>
    </div>
  </div>
)}

export default Image
