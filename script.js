const sharp = require('sharp');
const compress_images = require("compress-images")


const path = process.argv[2]
const width = Number(process.argv[3])

function resize(inputPath, outputPath, width){
    sharp(inputPath).resize({width:width}).toFile(outputPath,
        //Alterei aqui para que a imagem gerada tenha o mesmo nome. 
        //Se nao passar nome e formato após o diretório buga o arquivo, ex: ./temps1/a   
        //Já nao está mais aqui, salvo em => node js wilt "primeiro resize..."
     (err) =>{
        if (err){
            console.log(err);
        } else {
            console.log("Imagem Redimensionada!");
            compress(outputPath, './temps1/compressedpraia.jpg')
        }
    })
}

resize(path, `./temps1/praia.jpg` , width)

//Compressing image
function compress(pathInput, outputPath){
    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
  }
);
}

