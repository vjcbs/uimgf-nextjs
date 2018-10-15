import Head from 'next/head'

const MainLayout = (props) => (
  <section className="content" style={props.contentStyle}>
    <Head>
      <title>Unsplash Image Finder</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    {props.children}
  </section>

)

export default MainLayout
