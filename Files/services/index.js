const multer = require("multer");
const moment = require("moment");
const fs = require("fs");

const MongoLib = require("../../lib/mongo");
const SizeLib = require("../../lib/size");
const { CryptoLib } = require("../../lib/crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage");
  },
  filename: (req, file, cb) => {
    let name = file.originalname.split(".");
    let extension = name[name.length - 1];
    file.originalname = moment().format("x") + "." + extension;
    cb(null, file.originalname);
  },
});

let upload = multer({ storage });

class FilesService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.size = new SizeLib();
    this.cryptoLib = new CryptoLib();
  }

  async getFile({ user, id }) {
    try {
      if (fs.existsSync(`./storage/${id}`)) {
        const readStream = fs.createReadStream(`./storage/${id}`);
        return readStream;
      } else {
        throw new Error("File not found");
      }
    } catch (e) {
      throw new Error("File not found");
    }
  }

  /*
  async getFileByTkn({ id, tkn }) {
    const verified = bcrypt.compareSync('Pa$$w0rd', passwordHash);
    
    const tkn = await new Promise(async (reject, resolve) => {
      await bcrypt
        .hash(
          moment()
            .add(1, "days")
            .format("x"),
          10
        )
        .then((error, hash) => {
          if (error) reject(error);

          resolve(hash);
        });
    });
    
    const readStream = fs.createReadStream(`./storage/${id}`);
    return readStream

    // Validate user
    const file = await this.mongoDB.getOneById(id)
    if(file) {
      const readStream = fs.createReadStream(filename);

      let fileStream = s3.getObject({
        Bucket: 'hackoom',
        Key: `${user}/${file.path}/${file.name}`
      }).createReadStream()
      
      return fileStream
    }
    return false
  }*/

  async generateTkn() {
    const tkn = this.cryptoLib.encrypt(
      moment()
        .add(1, "days")
        .format("x")
    );

    return tkn;
  }

  async uploadFile({ user, file }) {
    if (!file) {
      return false;
    }

    const json = {
      name: file.originalname,
      path: file.path,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      formatSize: await this.size.format(file.size),
      createdAt: moment(),
      status: false,
    };

    try {
      await this.mongoDB.insertOne("files", json);
      return file.originalname;
    } catch (e) {
      return false;
    }
  }
}

module.exports = {
  FilesService,
  upload,
};
