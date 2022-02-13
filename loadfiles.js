
const path = require('path');
const fs = require('fs');
const mime = require('mime-types')

const directoryPath = path.join(__dirname, 'static/sounds');

const rawdata = fs.readFileSync('static/db.json');
let db = JSON.parse(rawdata);

// console.log(db)

fs.readdir(directoryPath, function (err, files) {
    // handling error
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    } 
    // listing all files using forEach
    files.forEach(function (file) {
        //  Do whatever you want to do with the file
        // console.log(file); 
        const lastIndex = file.lastIndexOf(".");
        const filename = file.substring(0, lastIndex);
        const extension = file.substring(lastIndex + 1);

        let soundIndex = db.sounds.findIndex(sound => sound.filename === filename)

        if (soundIndex === -1) {
            db.sounds.push({
                "title": filename,
                filename,
                files: []
            })
            soundIndex = db.sounds.length - 1
        }

        if (!db.sounds[soundIndex].files.find(file => file.extension === extension)) {
            db.sounds[soundIndex].files.push({
                extension,
                "codec": mime.lookup(extension)               
            })
        }


    });

    const data = JSON.stringify(db, null, 4);
    // console.log(data)
    fs.writeFileSync('static/db.json', data);
});

