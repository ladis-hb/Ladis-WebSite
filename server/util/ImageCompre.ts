import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import Path from "path"

export default async (path:string)=>{
    // console.log(path);
    
    const ext = Path.extname(path)
    if (["png", "jpeg", "jpg", "git", "bmp"].includes(ext)) return false
    try {
        await imagemin([path], {
            destination: Path.dirname(path),
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
        return true
    } catch (error) {
        return false
    }
}
