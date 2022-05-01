const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const socket = require('./utils/socket')

// test
/*const { exec } = require('child_process')
const PDF = require('hummus-recipe');
const moment = require("moment");*/

const { config } = require("./config/index");

const { authApi } = require("./Auth/routes");
// const usersApi = require('./routes/users.js')

// const reportsApi = require('./routes/reports.js')
const { userApi } = require("./User/routes");
const { filesApi } = require("./Files/routes");
const { locationApi } = require("./Location/routes");
// const workspacesApi = require('./routes/workspaces.js')
//const { ProcedureService } = require("./Location/services/index.js");

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require("./utils/middleware/errorHandlers.js");

const notFoundHandler = require("./utils/middleware/notFoundHandler");
const { jwtHandler } = require("./utils/middleware/jwtHandler");
const { authHandler } = require("./utils/middleware/authHandler");

const { MailLib } = require("./lib/mail");

// body parser
app.use(express.static(__dirname + "/public"));
app.use(express.json());
// $.cookie("Token", this.value, { path: '/' });
app.use(cookieParser());
app.use(cors());
app.use(
  morgan(
    ":date[iso] --> [:remote-addr] :method :url :status :response-time ms - :res[content-length]"
  )
);

// routes
authApi(app);
userApi(app);
filesApi(app);
locationApi(app);

//usersApi(api);

//reportsApi(api);
//workspacesApi(api);

/*app.get('/abc/:id(\\d+)', (req, res) => {
  var id = req.params.id;
  res.end("Received parameter:"+id);
  console.log('id='+id);
})*/

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

/*const procedureService = new ProcedureService();

let isNotifyInProgress = false;
// Tareas
new CronJob(
  "30 * * * * *",
  async () => {
    // Notifies
    if (!isNotifyInProgress) {
      isNotifyInProgress = true;

      const setCancelledStatus = await procedureService.setCancelledStatus();
      const notifyBeforeEnd = await procedureService.notifyBeforeEnd();

      isNotifyInProgress = false;
    }
  },
  null,
  true,
  "America/Lima"
);*/

// const mailLib = new MailLib();

// Servidor
var server = app.listen(config.port, async () => {
  console.log(`[EXPRESS] Listening port :${config.port}`);
  // const r = await mailLib.sendNotify({from: 'MPA SETARE', to: 'lebe.java@gmail.com', subject: 'test 2', html: 'Hola mundo'})
});

/*socket.connect(server, {
  cors: {
    origin: "*",
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});*/

/*const aaa = () => {
  var x = 100
  var y = 100
  var w = 500
  var h = 1000

    path = './TRSS43683.pdf'
    const pdfDoc = new PDF(path, path)
    //console.log(pdfDoc.metadata);
    // 266, y: 605, w: 593, h: 840
    x = map_range(x, 0, w, 0, pdfDoc.metadata[1].width)
    y = map_range(y, 0, h, 0, pdfDoc.metadata[1].height)
    pdfDoc
            .editPage(1)
            .image('./sign.png', x, y, {width: 110, keepAspectRatio: true})
            .endPage()
            .endPDF();
        try {

          var time = moment().unix()

          exec('pdftoppm -png -l 1 ' + path + ' ./' + time, (error, stdout, stderr) => {
            if(error) {
              
          console.error(error.message)
              return
            }else{
              
          console.log('ok')
            }
          })
        }catch(error) {
          console.error(error.message)
        }
  
}

const map_range = (value, low1, high1, low2, high2) => {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

aaa()*/

socket.connect(server, {
  cors: {
    origin: '*',
  },
  pingInterval: 10000,
  pingTimeout: 5000,
})

/*const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});

io.on('connection', (socket) => {

  console.log('Connected')
  socket.emit('msg', {msg: 'Hola'})

  socket.on('location', (data) => {
    try {
      console.log('Ping:', data)
    }catch(error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    console.log('disconnect');
  })
})
*/