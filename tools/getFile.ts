import fs from "fs"
import axios from "axios"

async function getpic(){
    const pic = await axios.get("http://www.ladis.com.cn/a_images/banner/banner04-pad.jpg",{responseType:"stream"})
    console.log({pic});
    pic.data.pipe(fs.createWriteStream("./test.jpg"))
}

getpic()