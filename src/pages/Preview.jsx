const Preview = ({ content }) => {
  console.log(content)
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>
}

export default Preview
