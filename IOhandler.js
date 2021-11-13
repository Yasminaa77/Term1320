/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');



/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */



//-----------------------1--------------------------
//---Unzip the using unzipper library (streams)
    //"Extraction operation complete"
    //create a directory called unzipped with all your images in it.(1,2,3)
    //make an array of each photo path
    //sending it to greyscale function

// let unzippedPath = __dirname + "\\myfile.zip";
// let zippedPath= 'myfiles';
//https://www.npmjs.com/package/unzipper

const unzip = (pathIn, pathOut) => {
 return fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({path: pathOut}))
    .promise()
};



//https://github.com/Yasminaa77/Term1320.git


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */

////creating array of the png images paths


const readDir = dir => {
    let images=[];
    return new Promise((resolve, reject) => {
        fs.readdir(dir , function(err, data){
            if (err){
                reject(err)
            }else{
                for(let image of data ){
                    if( path.extname(image) === ".png"){
                        images.push(image);
                    }
                }
               resolve(images);
            }
        });
    })
}


/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */



//-----------------------2--------------------------
//----grey scale function (parameters: pathIn and pathOut.)
    //PNGJS will be used to parse the path in images (giving an array
    //loop through all three arrays of px and change the values
    //save the modified as png  one and pass it to path (new directory)

const grayScale = (pathIn, pathOut) => {

// let images=[ 'in.png', 'in1.png', 'in2.png' ]

        // images.forEach((pngImage)=> {
        //     console.log("im working")
            fs.createReadStream(`${pathIn}`)
                .pipe(
                    new PNG({})
                )


                .on("parsed", function () {
                    let  grey;
                    let  random;
                    for (let y = 0; y < this.height; y++) {
                        for (let x = 0; x < this.width; x++) {
                            let idx = (this.width * y + x) << 2;


                            grey = (this.data[idx] + this.data[idx + 1]+ this.data[idx + 2])/3

                            this.data[idx] = grey ;
                            this.data[idx + 1] = grey;
                            this.data[idx + 2] = grey;

                        }
                    }
                    random= Math.floor(Math.random()*1000);
                    this.pack().pipe(fs.createWriteStream(`${pathOut}/edited${random}.png`));
                });


        // })

    };

// grayScale(`${__dirname}/unzipped`,`${__dirname}/grayscaled`)

module.exports = {
  unzip,
  readDir,
    grayScale
};

//status, add ., commit -m "comment", push -u origin master
//.gitignore

