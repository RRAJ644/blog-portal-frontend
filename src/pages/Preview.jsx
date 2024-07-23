const Preview = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>
}

export default Preview
