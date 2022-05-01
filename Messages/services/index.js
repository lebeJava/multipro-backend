const moment = require("moment");
const MongoLib = require("../../lib/mongo");
const { ObjectId } = require("mongodb");
const { MailLib } = require("../../lib/mail");

class LocationService {
  constructor() {
    this.mongoDB = new MongoLib();
    this.mailLib = new MailLib();
  }

  async createMessage({ user, json }) {
    try {
      const { id } = user;
      const { lat, lng, msg } = json;

      const find = await this.mongoDB.getOne("location", {
        lat,
        lng
      });

      let result;

      if(found) {
        const json2Update = {
          msg: [
            
          ]
          userId: id,
          iat: moment().utc(),
          msg,
        };
  
        result = await this.mongoDB.updateOne("procedure", find._id, json2Update);
      }else{
        const json2Save = {
          lat,
          lng,
          userId: id,
          iat: moment().utc(),
          msg,
        };
  
        result = await this.mongoDB.insertOne("procedure", json2Save);
      }

      

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

  /*async read({ user, query, sort, filter, type, page, max }) {
    // query=''&sort='fecha_emision:desc'&filter='stages[0].status:new'&page=1&max=25
    // query=''&sort='fecha_emision:desc'&filter='currentStage:0'&page=1&max=50

    query = query ? query.trim().toLowerCase() : null;
    let sortKey, sortValue;
    let filterKey, filterValue;
    type = type || false;
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
              { "data.ownerName": { $regex: new RegExp("^" + query, "i") } },
              {
                "data.ownerLastName": { $regex: new RegExp("^" + query, "i") },
              },
              { "data.fut": { $regex: new RegExp("^" + query, "i") } },
              { "data.expNum": { $regex: new RegExp("^" + query, "i") } },
              {
                "data.ownerCompanyName": {
                  $regex: new RegExp("^" + query, "i"),
                },
              },
              {
                "data.ownerCompanyRepreLastName": {
                  $regex: new RegExp("^" + query, "i"),
                },
              },
              { "data.carBrand": { $regex: new RegExp("^" + query, "i") } },
              {
                "data.carLicensePlate": {
                  $regex: new RegExp("^" + query, "i"),
                },
              },
            ],
          },
        ],
      };
    } else {
      query = {};
    }

    if (type) {
      query = {
        ...query,
        procedureType: type,
      };
    } else {
      if (!query?.$and) {
        query.$and = [];
      }

      query = {
        ...query,
        $and: [
          ...query.$and,
          {
            $or: [
              { procedureType: "HAB" },
              { procedureType: "ACT" },
              { procedureType: "SUST" },
              { procedureType: "REN" },
              { procedureType: "TRANS-PER" },
              { procedureType: "TRANS-ESC" },
            ],
          },
        ],
      };
    }

    if (user.role === "client") {
      // Usuario tipo cliente
      // console.log('client')
      query = {
        ...query,
        ownerId: user.id,
      };
    } else {
      // Usuario tipo administrativo
      // console.log('admin')
      if (user.role === "admin") {
        query = {
          ...query,
        };
      } else if (user.role === "mesapartes") {
        query = {
          ...query,
          currentStage: 0,
        };
      } else if (user.role === "subGerenciaCirc") {
        query = {
          ...query,
          currentStage: 1,
        };
      } else if (user.role === "areaSetare") {
        query = {
          ...query,
          currentStage: 2,
        };
      } else if (user.role === "subGerenteTrans") {
        query = {
          ...query,
          currentStage: 3,
        };
      } else if (user.role === "gerenteTrans") {
        query = {
          ...query,
          currentStage: 4,
        };
      } else if (user.role === "archivo") {
        query = {
          ...query,
          currentStage: 5,
        };
      } else if (user.role === "administracion") {
        query = {
          ...query,
          currentStage: 6,
        };
      }
    }

    if (filterKey && filterValue) {
      query = {
        ...query,
        [filterKey]: filterValue,
      };
    }

    let list = await this.mongoDB.getAll(
      "procedure",
      query,
      page,
      max,
      sortKey,
      sortValue
    );

    let result = [];
    for (let i = 0; i < list.length; i++) {
      list[i].i = i + 1 + (page - 1) * max;

      if (list[i].data?.initDate)
        list[i].data.initDate = new Date(list[i].data.initDate);

      if (list[i].data?.dueDate)
        list[i].data.dueDate = new Date(list[i].data.dueDate);

      if (list[i].data?.ownerBirth)
        list[i].data.ownerBirth = new Date(list[i].data.ownerBirth);

      if (list[i].data?.driverBirth)
        list[i].data.driverBirth = new Date(list[i].data.driverBirth);

      if (list[i].resolucion?.createdDate)
        list[i].resolucion.createdDate = new Date(
          list[i].resolucion.createdDate
        );

      if (list[i].resolucion?.sendedDate)
        list[i].resolucion.sendedDate = new Date(list[i].resolucion.sendedDate);

      result.push({
        ...list[i],
      });
    }

    let count = await this.mongoDB.countDocuments("procedure", {});

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
  }

  async readOne({ id }) {
    let procedure = await this.mongoDB.getOneById("procedure", id);

    if (!procedure)
      return {
        msg: "error",
        data: "not found",
      };

    if (procedure.data?.initDate)
      procedure.data.initDate = new Date(procedure.data.initDate);

    if (procedure.data?.dueDate)
      procedure.data.dueDate = new Date(procedure.data.dueDate);

    if (procedure.data?.ownerBirth)
      procedure.data.ownerBirth = new Date(procedure.data.ownerBirth);

    if (procedure.data?.driverBirth)
      procedure.data.driverBirth = new Date(procedure.data.driverBirth);

    if (procedure.resolucion?.createdDate)
      procedure.resolucion.createdDate = new Date(
        procedure.resolucion.createdDate
      );

    if (procedure.resolucion?.sendedDate)
      procedure.resolucion.sendedDate = new Date(
        procedure.resolucion.sendedDate
      );

    return {
      msg: "ok",
      data: procedure,
    };
  }

  async update({ user, id, json }) {
    // Validate user
    try {
      const procedure = await this.mongoDB.getOne("procedure", {
        _id: ObjectId(id),
      }); //

      if (!procedure)
        return {
          msg: "error",
          data: "id not found",
        };

      delete json._id;

      if (procedure.resolucion?.sendEmail) {
        return {
          msg: "error",
          data: "procedure archived",
        };
      }

      if (json.data?.initDate)
        json.data.initDate = parseInt(moment(json.data.initDate).format("x"));

      if (json.data?.dueDate)
        json.data.dueDate = parseInt(moment(json.data.dueDate).format("x"));

      if (json.data?.ownerBirth)
        json.data.ownerBirth = parseInt(
          moment(json.data.ownerBirth).format("x")
        );

      if (json.data?.driverBirth)
        json.data.driverBirth = parseInt(
          moment(json.data.driverBirth).format("x")
        );

      if (json.resolucion?.createdDate)
        json.resolucion.createdDate = parseInt(
          moment(json.resolucion.createdDate).format("x")
        );

      if (json.resolucion?.sendedDate)
        json.resolucion.sendedDate = parseInt(
          moment(json.resolucion.sendedDate).format("x")
        );

      let notifyObserved = false;
      if (json.data?.companyStatus == "observed") {
        notifyObserved = true;
        json.data.observedDate = parseInt(moment().format("x"));
      }

      let code = procedure.data.fut
        ? procedure.data.fut
        : procedure.data.expNum;

      if (json.resolucion?.sendEmail) {
        try {
          // TODO: Adjuntar resolución en forma de link
          const mail = await this.mailLib.sendNotify({
            from: "MPA SETARE",
            to: procedure.data.ownerEmail,
            subject: "Su Trámite ha sido Observado por más de 48 horas",
            html: `El trámite con FUT/Expediente: ${code} ha sido observado por más de 48 horas.`,
          });
        } catch (e) {
          console.log("Email error:", e.message);
        }
      }

      await this.mongoDB.updateOne("procedure", procedure._id, json); // db.Types.ObjectId()

      if (notifyObserved) {
        try {
          const mail = await this.mailLib.sendNotify({
            from: "MPA SETARE",
            to: procedure.data.ownerEmail,
            subject: "Trámite Observado",
            html: `El trámite con FUT/Expediente: ${code} ha sido observado.`,
            attachments: [
              {
                filename: resolucion.file.file.name,
                path: `./storage/${resolucion.file.file.name}`,
              },
            ],
          });
        } catch (e) {
          console.log("Email error:", e.message);
        }
      }

      return {
        msg: "ok",
        data: {
          _id: procedure._id,
          fut: procedure.data.fut,
        },
      };
    } catch (e) {
      return {
        msg: "error",
        data: "",
      };
    }
  }

  async delete({ user, id }) {
    // Delete by id
    try {
      const deleted = await this.mongoDB.deleteOne("procedure", id);

      if (deleted.deletedCount) {
        return {
          msg: "ok",
          data: {
            _id: id,
          },
        };
      } else {
        return {
          msg: "error",
          data: "not_found",
        };
      }
    } catch (e) {
      return {
        msg: "error",
        data: "",
      };
    }
  }*/
}

module.exports = {
  LocationService,
};
