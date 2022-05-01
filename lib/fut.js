const moment = require("moment");
const MongoLib = require("../lib/mongo");
const { config } = require("../config");

class FUTLib {
  constructor() {
    this.mongoDB = new MongoLib();
  }

  formatFut = (number) => {
    var str = "" + number;
    var pad = "00000000";
    return pad.substring(0, pad.length - str.length) + str;
  };

  async generate() {
    let last = await this.mongoDB.getOne("fut", {});

    if (!last) {
      const fut = `00000001-${moment().format("YYYY")}`;
      await this.mongoDB.insertOne("fut", { fut });

      return `00000001-${moment().format("YYYY")}`;
    }

    let { _id, fut } = last;
    let newFut = fut.split("-");

    if (newFut[1] == moment().format("YYYY")) {
      newFut[0] = this.formatFut(parseInt(newFut[0]) + 1);
    } else {
      newFut[0] = "00000001";
    }

    fut = `${newFut[0]}-${moment().format("YYYY")}`;

    await this.mongoDB.updateOne("fut", _id, { fut });

    return fut;
  }
}

module.exports = { FUTLib };
