export default (props, defaultProps) => {
  const keys = Object.keys(defaultProps)
  const target = {}

  for (let key of Object.keys(props)) {
    if (keys.indexOf(key) === -1) {
      target[ key ] = props[ key ]
    }
  }

  return target
}
