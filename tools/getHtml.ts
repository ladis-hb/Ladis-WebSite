import axios from "axios"
import { load } from "cheerio"


const url = new URL("http://www.ladis.com.cn").toString()

axios.get(url).then(Response => {
    const file = Response.data
    const $ = load(file)
    const keys = ['keywords', 'description']
    const title = $("title").text()
    let keywords = ''
    let description = ''
    const meta = $("meta").map((i, val) => {
        return val.attribs
    })
        .get()
        .filter(el => keys.includes((el.name as string)))
        .map(el => ({ [el.name]: el.content }))
        
    const a = Object.assign({},...meta)
    keywords = a['keywords']
    description = a['description']
        

})