// Returns `true` if the NODE_ENV is 'development'.
//
// `npm start`: process.env.NODE_ENV === 'development'
// `npm test`: process.env.NODE_ENV === 'test'
// `npm build`: process.env.NODE_ENV === 'production'

function isDevelopment(): Boolean {
  return process.env.NODE_ENV === 'development';
}

export default isDevelopment;
