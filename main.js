/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author: Yasmina
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

const  unzip= require("./IOhandler").unzip
const  readDir= require("./IOhandler").readDir
const  grayScale= require("./IOhandler").grayScale


unzip(zipFilePath, pathUnzipped)
    .then(() => console.log("Extraction operation complete"))
    .then(() => readDir("./unzipped"))
    .then((images) => { // [in1.png in2.png]
        images.forEach((img) => {
            grayScale(`${__dirname}/unzipped/${img}`,`${__dirname}/grayscaled`)
        })
    })
    .catch((err) => console.log(err))


