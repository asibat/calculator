import axios from 'axios'
import { getIn } from 'icepick'

const { post } = axios.create({
  baseURL: 'http://localhost:3060/api'
})
export const fetch = stateObject => post('/calc', stateObject).then(data => getIn(data, ['data']))
