const moment = require("moment");
const MongoLib = require("../../lib/mongo");
const { ObjectId } = require("mongodb");
const { FilesService } = require("../../Files/services");
const { RequestLib } = require("../../lib/request");
const { LocationService } = require("../../Location/services");

class MessagesService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.filesService = new FilesService();
    this.requestLib = new RequestLib();
    this.locationService = new LocationService();
    this.collection = "messages";
  }

  async createOne({
    user,
    latitude,
    longitude,
    accuracy,
    altitude,
    bearing,
    speed,
    gpsDateTime,
    message,
  }) {
    const createdAt = parseInt(moment().format("x"));
    const createdBy = user.id;

    try {
      const location = await this.locationService.createOne({
        user,
        latitude,
        longitude,
        accuracy,
        altitude,
        bearing,
        speed,
        gpsDateTime,
        message,
      });

      if (location.msg != "ok") {
        return {
          msg: "error",
          data: location.data,
        };
      }
      let result = {};

      const json2Save = {
        latitude,
        longitude,
        userId: user.id,
        iat: parseInt(moment().format("x")),
        dls: parseInt(moment().format("x")),
        message,
        createdAt,
        createdBy,
      };

      const createId = await this.mongoDB.insertOne(this.collection, json2Save);
      result["_id"] = createId;

      return {
        msg: "ok",
        data: result,
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async getAll({ user, query, sort, filter, start, end, page, max }) {
    if (user.role === "client") {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    query = query ? query.trim().toLowerCase() : null;
    let sortKey, sortValue;
    let filterKey, filterValue;
    page = page ? parseInt(page) : 1;
    max = max ? parseInt(max) : 25;

    if (sort) {
      [sortKey, sortValue] = sort.split(":");
    }

    if (filter) {
      [filterKey, filterValue] = filter?.split(":");
    }

    sortValue = sortValue === "asc" ? 1 : -1;

    if (query) {
      query = {
        $and: [
          {
            $or: [
              { lat: { $regex: new RegExp("^" + query, "i") } },
              {
                lng: { $regex: new RegExp("^" + query, "i") },
              },
              { userId: { $regex: new RegExp("^" + query, "i") } },
            ],
          },
          {
            deletedAt: null,
            deletedBy: null,
          },
        ],
      };
    } else {
      query = {
        deletedAt: null,
        deletedBy: null,
      };
    }

    if (filterKey && filterValue) {
      query = {
        ...query,
        [filterKey]: filterValue,
      };
    }

    if (start) {
      const date = parseInt(moment(start).format("x"));
      query = {
        ...query,
        createdAt: {
          ...(query?.createdAt || {}),
          $gte: date,
        },
      };
    }

    if (end) {
      const date = parseInt(moment(end).format("x"));
      query = {
        ...query,
        createdAt: {
          ...(query?.createdAt || {}),
          $lte: date,
        },
      };
    }

    try {
      let list = await this.mongoDB.getAll(
        this.collection,
        query,
        page,
        max,
        sortKey,
        sortValue
      );

      let result = [];
      for (let i = 0; i < list.length; i++) {
        list[i].i = i + 1 + (page - 1) * max;

        if (list[i].data?.createdAt)
          list[i].data.createdAt = new Date(list[i].data.createdAt);

        result.push({
          ...list[i],
        });
      }

      let count = await this.mongoDB.countDocuments(this.collection, query);

      if (count >= max) {
        if (count % max > 0) {
          count = parseInt(count / max) + 1;
        } else {
          count = parseInt(count / max);
        }
      } else if (count > 0) {
        count = 1;
      }

      return {
        msg: "ok",
        data: {
          result,
          pages: count,
        },
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async getTracker({ user, query, sort, filter, page, max }) {
    if (user.role === "client") {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    query = query ? query.trim().toLowerCase() : null;
    let sortKey, sortValue;
    let filterKey, filterValue;
    page = page ? parseInt(page) : 1;
    max = max ? parseInt(max) : 25;

    if (sort) {
      [sortKey, sortValue] = sort.split(":");
    }

    if (filter) {
      [filterKey, filterValue] = filter?.split(":");
    }

    sortValue = sortValue === "asc" ? 1 : -1;

    if (query) {
      query = {
        $and: [
          {
            $or: [
              { lat: { $regex: new RegExp("^" + query, "i") } },
              {
                lng: { $regex: new RegExp("^" + query, "i") },
              },
              { userId: { $regex: new RegExp("^" + query, "i") } },
            ],
          },
          {
            deletedAt: null,
            deletedBy: null,
          },
        ],
      };
    } else {
      query = {
        deletedAt: null,
        deletedBy: null,
      };
    }

    if (filterKey && filterValue) {
      query = {
        ...query,
        [filterKey]: filterValue,
      };
    }

    try {
      let list = await this.mongoDB.getAll(
        this.tracker,
        query,
        page,
        max,
        sortKey,
        sortValue
      );

      let result = [];
      for (let i = 0; i < list.length; i++) {
        list[i].i = i + 1 + (page - 1) * max;

        if (list[i].data?.createdAt)
          list[i].data.createdAt = new Date(list[i].data.createdAt);

        result.push({
          ...list[i],
        });
      }

      let count = await this.mongoDB.countDocuments(this.tracker, query);

      if (count >= max) {
        if (count % max > 0) {
          count = parseInt(count / max) + 1;
        } else {
          count = parseInt(count / max);
        }
      } else if (count > 0) {
        count = 1;
      }

      return {
        msg: "ok",
        data: {
          result,
          pages: count,
        },
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async getOneById({ user, id }) {
    if (user.role === "client") {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    try {
      const location = await this.mongoDB.getOne(this.collection, {
        _id: ObjectId(id),
        deletedAt: null,
        deletedBy: null,
      });

      if (!location) {
        return {
          msg: "error",
          data: "Location_not_found",
        };
      }

      return {
        msg: "ok",
        data: location,
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async addOneMessage({ user, msg }) {
    const updatedAt = parseInt(moment().format("x"));
    const updatedBy = user.id;

    try {
      const locationFound = await this.mongoDB.getOneSort(
        this.collection,
        {
          userId: user.id,
        },
        {
          createdAt: -1,
        }
      );

      if (!locationFound) {
        return {
          msg: "error",
          data: "Location_not_found",
        };
      }

      const json2Update = {
        msg: [
          ...locationFound.msg,
          {
            msg,
            iat: parseInt(moment().format("x")),
          },
        ],
        updatedAt,
        updatedBy,
      };

      await this.mongoDB.updateOne(this.collection, userFound._id, json2Update);
      return {
        msg: "ok",
        data: "ok",
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }
}

module.exports = {
  MessagesService,
};
