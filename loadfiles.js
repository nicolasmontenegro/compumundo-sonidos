const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

const directoryPath = path.join(__dirname, 'static/sounds')

const rawdata = fs.readFileSync('static/db.json')
const db = JSON.parse(rawdata)

let getMaxVolume

try {
  const { execSync } = require('child_process')
  if (execSync('ffmpeg -version')) {
    getMaxVolume = (filePath) => {
      const stdOutFFMPEG = execSync(
        `ffmpeg -i "${filePath}" -filter:a volumedetect -f null - 2>&1 | grep -i "max_volume"`
      )
      if (stdOutFFMPEG) {
        const regexMatch = /-\d+\.\d+/g.exec(stdOutFFMPEG)
        return regexMatch ? Number(regexMatch[0]) : null
      } else {
        return null
      }
    }
  }
} catch (error) {
  getMaxVolume = null
}

// console.log(db)

fs.readdir(directoryPath, function (err, files) {
  // handling error
  if (err) {
    // eslint-disable-next-line no-console
    return console.error('Unable to scan directory: ' + err)
  }
  // listing all files using forEach
  files.forEach(function (file) {
    //  Do whatever you want to do with the file
    // eslint-disable-next-line no-console
    console.log(file)
    const lastIndex = file.lastIndexOf('.')
    const filename = file.substring(0, lastIndex)
    const extension = file.substring(lastIndex + 1)

    let soundIndex = db.sounds.findIndex((sound) => sound.filename === filename)

    if (soundIndex === -1) {
      db.sounds.push({
        title: filename,
        filename,
        files: [],
      })
      soundIndex = db.sounds.length - 1
    }

    const soundFileIndex = db.sounds[soundIndex].files.findIndex(
      (file) => file.extension === extension
    )

    if (soundFileIndex === -1) {
      db.sounds[soundIndex].files.push({
        extension,
        codec: mime.lookup(extension),
        ...(getMaxVolume != null
          ? { maxVolumeDb: getMaxVolume(`${directoryPath}/${file}`) }
          : null),
      })
    }

    if (getMaxVolume && !db.sounds[soundIndex].maxVolumeDb) {
      // eslint-disable-next-line no-console
      // console.log(`${directoryPath}/${file}`);
      const maxVolumeDb = getMaxVolume(`${directoryPath}/${file}`)
      if (maxVolumeDb != null)
        db.sounds[soundIndex].maxVolumeDb = getMaxVolume(
          `${directoryPath}/${file}`
        )
    }
  })

  const data = JSON.stringify(db, null, 4)
  // console.log(data)
  fs.writeFileSync('static/db.json', data)
})
