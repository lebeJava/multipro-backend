const { MongoClient, ObjectId } = require("mongodb");
const AWS = require("aws-sdk");
const { config } = require("../config");

function uploadToS3(fileName, file) {
  let s3bucket = new AWS.S3({
    accessKeyId: config.iam_user_key,
    secretAccessKey: config.iam_user_secret,
    Bucket: config.bucket_name,
  });
  s3bucket.createBucket(() => {
    let params = {
      Bucket: config.bucket_name,
      Key: fileName,
      Body: file,
    };
    s3bucket.upload(params, (error, data) => {
      if (error) {
        console.log("S3 Backup Error:", error);
      } else {
        console.log("S3 Backup Ok:", data);
        rimraf.sync("./dump");
        fs.unlinkSync(`./${fileName}`);
      }
    });
  });
}

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI =
  USER && PASS
    ? `mongodb://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${DB_NAME}`
    : `mongodb://${config.dbHost}:${config.dbPort}/${DB_NAME}`;
//const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
    this.ObjectId = ObjectId;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          console.log("Connected succesfully to MongoDB");
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  countDocuments(collection, query) {
    return this.connect().then((db) => {
      return db
      .collection(collection)
      .find(query)
      .count();
    });
  }

  getAll(collection, query, page, max, sortKey, sortValue) {
    return this.connect().then((db) => {
      return sortKey && sortValue
        ? db
            .collection(collection)
            .find(query)
            .skip((page - 1) * max)
            .limit(max)
            .sort({ [sortKey]: sortValue })
            .toArray()
        : db
            .collection(collection)
            .find(query)
            .skip((page - 1) * max)
            .limit(max)
            .toArray();
    });
  }

  getOneById(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  getOne(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne(query);
    });
  }

  getOneSort(collection, query, sort) {
    return this.connect().then((db) => {
      return db
        .collection(collection)
        .find(query)
        .sort(sort)
        .limit(1)
        .toArray();
    });
  }

  insertOne(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  insertMany(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertMany(data);
      })
      .then((result) => result.insertedId);
  }

  updateOne(collection, id, data) {
    // $set
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne(
            { _id: ObjectId(id) },
            { $set: { ...data } },
            { upsert: true }
          );
      })
      .then((result) => result.upsertedId || id);
  }

  update(collection, id, data) {
    // $set
    return this.connect()
      .then((db) => {
        return db.collection(collection).update({ _id: ObjectId(id) }, data);
      })
      .then((result) => result.upsertedId || id);
  }

  deleteOne(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
  }
}

module.exports = MongoLib;
