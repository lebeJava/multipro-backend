const moment = require("moment");
const MongoLib = require("../../lib/mongo");
const { ObjectId } = require("mongodb");
const { FilesService } = require("../../Files/services");
const { RequestLib } = require("../../lib/request");
const { json } = require("express");

class UserService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.filesService = new FilesService();
    this.requestLib = new RequestLib();
    this.collection = "users";
  }

  async createOne({ user, json }) {
    if (user.role === "client") {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    json.createdAt = parseInt(moment().format("x"));
    json.createdBy = user.id;

    try {
      const user = await this.mongoDB.getOne(this.collection, {
        $or: [{ user: json.user }, { email: json.email }],
        deletedAt: null,
        deletedBy: null,
      });

      if (user) {
        return {
          msg: "error",
          data: "User_duplicated",
        };
      }

      const data = await this.mongoDB.insertOne(this.collection, json);

      if (!data) {
        return {
          msg: "error",
          data: "Cannot_insert_user",
        };
      }

      return {
        msg: "ok",
        data: data,
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async getAll({ user, query, sort, filter, page, max }) {
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
              { user: { $regex: new RegExp("^" + query, "i") } },
              {
                email: { $regex: new RegExp("^" + query, "i") },
              },
              { name: { $regex: new RegExp("^" + query, "i") } },
              { role: { $regex: new RegExp("^" + query, "i") } },
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

  async getOneById({ user, id }) {
    if (user.role === "client" && user.id !== id) {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    try {
      const user = await this.mongoDB.getOne(this.collection, {
        _id: ObjectId(id),
        deletedAt: null,
        deletedBy: null,
      });

      if (!user) {
        return {
          msg: "error",
          data: "User_not_found",
        };
      }

      return {
        msg: "ok",
        data: user,
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async getOne({ query }) {
    try {
      const user = await this.mongoDB.getOne(this.collection, {
        ...query,
        deletedAt: null,
        deletedBy: null,
      });

      if (!user) {
        return {
          msg: "error",
          data: "User_not_found",
        };
      }

      return {
        msg: "ok",
        data: user,
      };
    } catch (e) {
      return {
        msg: "error",
        data: e.message,
      };
    }
  }

  async updateOne({ user, id, json }) {
    if (user.role === "client" && user.id !== id) {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    json.updatedAt = parseInt(moment().format("x"));
    json.updatedBy = user.id;

    try {
      const user = await this.mongoDB.getOne(this.collection, {
        _id: {
          $ne: ObjectId(id),
        },
        $or: [{ user: json.user }, { email: json.email }],
        deletedAt: null,
        deletedBy: null,
      });

      if (user) {
        return {
          msg: "error",
          data: "User_duplicated",
        };
      }

      const userFound = await this.mongoDB.getOne(this.collection, {
        _id: ObjectId(id),
      });

      if (!userFound) {
        return {
          msg: "error",
          data: "User_not_found",
        };
      }

      delete json._id;
      delete json.createdAt;
      delete json.createdBy;

      await this.mongoDB.updateOne(this.collection, userFound._id, json);
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

  async deleteOne({ user, id }) {
    if (user.role === "client" && user.id !== id) {
      return {
        msg: "error",
        data: "Authorization_error",
      };
    }

    try {
      const userFound = await this.mongoDB.getOne(this.collection, {
        _id: ObjectId(id),
      });

      if (!userFound) {
        return {
          msg: "error",
          data: "User_not_found",
        };
      }

      userFound["deletedAt"] = parseInt(moment().format("x"));
      userFound["deletedBy"] = user.id;

      await this.mongoDB.updateOne(this.collection, id, userFound);

      return {
        msg: "ok",
        data: {
          _id: id,
        },
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
  UserService,
};
