const axios = require('axios')

async function get (){
  var a = await axios.get('http://localhost:3000/api/GET_router')
  console.log(a.data)
}
get()
