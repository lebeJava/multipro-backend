const proceduresMock = [
  {
    _id: 'asdf122sd',
    company: 'idCompany1',
    procedureType: 'REN',
    currentStage: 0,
    data: {
      // asi el resto de datos de los inputs escritos
      fut: "1", // 00001-2022
      expNum: '1231231',
      ownerDoctype: 'DNI',
      ownerDoc: '12312312',
      ownerName: 'Mario Alberto',
      ownerLastName: 'Garate Valencia',
      ownerBirth: new Date(),
      ownerAddress: 'Calle de los Pitos 69',
      ownerDistrict: 'Arequipa',
      ownerEmail: 'eafsdsa@sape.com',
      ownerPhone: 'asdfasdf',
      ownerCompanyName: 'PoopayeSAC',
      ownerCompanyAdress: 'San Lazaro',
      ownerCompanyDistrict: 'Arequipa',
      ownerCompanyEmail: 'hola@poopaye.com',
      ownerCompanyRepreName: 'Bebo',
      ownerCompanyRepreLastName: 'Pena Sanchez',
      driverDocType: 'DNI',
      driverDoc: '4614816515',
      driverName: 'nombre',
      driverLastName: 'apellido',
      driverBirth: new Date(),
      driverAddress: 'San Poronga',
      driverDistrict: 'Concha de la lora',
      driverEmail: 'shfs@ewww.com',
      driverPhone: '646515561',
      driverLicence: '416468846',
      carBrand: 'TOYOTA',
      carModel: 'Yaris',
      carColor: 'Red',
      carYear: new Date().getFullYear(),
      carEngine: 'VSDIJVPDVS75DV5S',
      carSerie: 'VLD4F8DF4D6F4F',
      carClass: 'C486168',
      carService: 'REMISSE',
      carLicensePlate: 'V9G540',
      carBillQualification: '25656165',
      carBillFeatures: '54165161',
      carTransitoryPermise: 'YES',
      initDate: new Date().getFullYear(),
      aproveDate: null, // fecha de aprobación
      dueDate: null, // fetcha de aprobació mas un año
      // sended: true, // para saber si ya lo mandó, cosa que le deja seguir editando si no // NO ES PRIORIDAD
      companyStatus: 'active', // status del icono que ve el personal, enviado, observado, vencido, vigente
      canRenew: false, // 
      files: {
        fileArrenda: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileSoat: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '12312312',
          status: 'observed',
        },
        fileBoletaInfo: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileRevTecnica: {
          file: null,
          exempt: true,
          id: '',
          status: '',
        },
        fileReciboHabilit: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboCarater: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboFotos: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileDeclaracionJur: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
      },
      resotion: 'asdfsssdf.pdf'
    },
    stageStatus: 'active',
    needResolution: true,
    resolucion:
      {
        file: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        stage: 'subGerenciaCirc', // userType
        status: 'active', // active, sended,
        createdDate: new Date(),
        sendedDate: new Date(),
        stages: [
          {
            name: 'areaSetare',
            stageNumber: 0,
            current: true,
            status: 'new', // status del icono que ve el personal, visto, observado, enviado a la siguiente etapa o nuevo
            reviewed: false, // para que pueda filtrar por los que no estan revisados
            obsMessage: ''
          },
          {
            name: 'subGerente',
            stageNumber: 1,
            current: false,
            status: 'new',
            reviewed: false,
            obsMessage: ''
          },
          {
            name: 'gerente',
            stageNumber: 2,
            current: false,
            status: 'new',
            reviewed: false,
            obsMessage: ''
          },
          {
            name: 'archivo',
            stageNumber: 2,
            current: false,
            status: 'new',
            reviewed: false,
            obsMessage: ''
          },
        ]
      },
    stages: [
      {
        name: 'mesapartes',
        stageNumber: 0,
        current: true,
        status: 'new', // status del icono que ve el personal, visto, observado, enviado a la siguiente etapa o nuevo
        reviewed: false, // para que pueda filtrar por los que no estan revisados
        obsMessage: ''
      },
      {
        name: 'subCirc',
        stageNumber: 1,
        current: false,
        status: 'new',
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'areaSetare',
        stageNumber: 2,
        current: false,
        status: 'new',
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'subGerente',
        stageNumber: 3,
        current: false,
        reviewed: false,
        status: 'new',
        signed: false,
        obsMessage: ''
      },
      {
        name: 'gerente',
        stageNumber: 4,
        current: false,
        status: 'new',
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'archivo',
        stageNumber: 5,
        current: false,
        status: 'new',
        reviewed: false,
        obsMessage: ''
      },
    ]
  },
  {
    _id: 'asdf122sd22222',
    company: 'idCompany1',
    procedureType: 'ACT',
    currentStage: 0,
    data: {
      // asi el resto de datos de los inputs escritos
      fut: '2', // 00001-2022
      expNum: '1231231',
      ownerDoctype: 'DNI',
      ownerDoc: '12312312',
      ownerName: 'Juvenal',
      ownerLastName: 'Torres Machaca',
      ownerBirth: new Date(),
      ownerAddress: 'asdfas',
      ownerDistrict: 'asdfas',
      ownerEmail: 'eafsdsa@sape.com',
      ownerPhone: 'asdfasdf',
      ownerCompanyName: 'PoopayeSAC',
      ownerCompanyAdress: 'San Lazaro',
      ownerCompanyDistrict: 'Arequipa',
      ownerCompanyEmail: 'hola@poopaye.com',
      ownerCompanyRepreName: 'Bebo',
      ownerCompanyRepreLastName: 'Pena Sanchez',
      driverDocType: 'DNI',
      driverDoc: '4614816515',
      driverName: 'nombre',
      driverLastName: 'apellido',
      driverBirth: new Date(),
      driverAddress: 'San Poronga',
      driverDistrict: 'Concha de la lora',
      driverEmail: 'shfs@ewww.com',
      driverPhone: '646515561',
      driverLicence: '416468846',
      carBrand: 'TOYOTA',
      carModel: 'Yaris',
      carColor: 'Red',
      carYear: new Date(),
      carEngine: 'VSDIJVPDVS75DV5S',
      carSerie: 'VLD4F8DF4D6F4F',
      carClass: 'C486168',
      carService: 'REMISSE',
      carLicensePlate: 'V2D451',
      carBillQualification: '25656165',
      carBillFeatures: '54165161',
      carTransitoryPermise: 'YES',
      initDate: new Date(),
      aproveDate: null, // fecha de aprobación
      dueDate: null, // fetcha de aprobació mas un año
      // sended: true, // para saber si ya lo mandó, cosa que le deja seguir editando si no // NO ES PRIORIDAD
      companyStatus: 'sended', // status del icono que ve el personal, enviado, observado, vencido, vigente
      canRenew: false, // 
      files: {
        fileArrenda: {
          name: 'Contrato de Arrendamiento',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
        fileSoat: {
          name: 'SOAT/AFOCAT para uso de taxi',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '12312312',
          status: 'observed',
        },
        fileBoletaInfo: {
          name: 'Boleta Informativa',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
        fileRevTecnica: {
          name: 'Revisión Técnica*',
          file: null,
          exempt: true,
          id: 'observed',
          status: 'observed',
        },
        fileReciboHabilit: {
          name: 'Recibo por derecho de habilitación',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
        fileReciboCarater: {
          name: 'Recibo por certificado de características',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
        fileReciboFotos: {
          name: 'Fotografías del vehículo*',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
        fileDeclaracionJur: {
          name: 'Declaración Jurada',
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'observed',
        },
      },
      resotion: 'asdfsssdf.pdf'
    },
    stageStatus: 'new',
    stages: [
      {
        name: 'mesapartes',
        stageNumber: 0,
        current: true,
        status: 'observed', // status del icono que ve el personal, visto, observado, enviado a la siguiente etapa o nuevo
        reviewed: false, // para que pueda filtrar por los que no estan revisados
        obsMessage: ''
      },
      {
        name: 'subCirc',
        stageNumber: 1,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'areaSetare',
        stageNumber: 2,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'subGerente',
        stageNumber: 3,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'gerente',
        stageNumber: 4,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'archivo',
        stageNumber: 5,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
    ]
  },
  {
    _id: 'asdf122sd23423',
    company: 'idCompany1',
    procedureType: 'SUST',
    currentStage: 0,
    data: {
      // asi el resto de datos de los inputs escritos
      fut: '3', // 00001-2022
      expNum: '1231231',
      ownerDoctype: 'DNI',
      ownerDoc: '12312312',
      ownerName: 'Fernando Alejandro',
      ownerLastName: 'Tuesta Ceballos',
      ownerBirth: new Date(),
      ownerAddress: 'asdfas',
      ownerDistrict: 'asdfas',
      ownerEmail: 'eafsdsa@sape.com',
      ownerPhone: 'asdfasdf',
      ownerCompanyName: 'PoopayeSAC',
      ownerCompanyAdress: 'San Lazaro',
      ownerCompanyDistrict: 'Arequipa',
      ownerCompanyEmail: 'hola@poopaye.com',
      ownerCompanyRepreName: 'Bebo',
      ownerCompanyRepreLastName: 'Pena Sanchez',
      driverDocType: 'DNI',
      driverDoc: '4614816515',
      driverName: 'nombre',
      driverLastName: 'apellido',
      driverBirth: new Date(),
      driverAddress: 'San Poronga',
      driverDistrict: 'Concha de la lora',
      driverEmail: 'shfs@ewww.com',
      driverPhone: '646515561',
      driverLicence: '416468846',
      carBrand: 'TOYOTA',
      carModel: 'Yaris',
      carColor: 'Red',
      carYear: new Date(),
      carEngine: 'VSDIJVPDVS75DV5S',
      carSerie: 'VLD4F8DF4D6F4F',
      carClass: 'C486168',
      carService: 'REMISSE',
      carLicensePlate: 'V2D451',
      carBillQualification: '25656165',
      carBillFeatures: '54165161',
      carTransitoryPermise: 'YES',
      initDate: new Date(),
      aproveDate: null, // fecha de aprobación
      dueDate: null, // fetcha de aprobació mas un año
      // sended: true, // para saber si ya lo mandó, cosa que le deja seguir editando si no // NO ES PRIORIDAD
      companyStatus: 'observed', // status del icono que ve el personal, enviado, observado, vencido, vigente
      canRenew: true, // 
      files: {
        fileArrenda: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileSoat: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '12312312',
          status: '',
        },
        fileBoletaInfo: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileRevTecnica: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '',
          status: '',
        },
        fileReciboHabilit: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboCarater: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboFotos: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileDeclaracionJur: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
      },
      resotion: 'asdfsssdf.pdf'
    },
    stageStatus: 'new',
    stages: [
      {
        name: 'mesapartes',
        stageNumber: 0,
        current: true,
        status: 'new', // status del icono que ve el personal, visto, observado, enviado a la siguiente etapa o nuevo
        reviewed: false, // para que pueda filtrar por los que no estan revisados
        obsMessage: ''
      },
      {
        name: 'subCirc',
        stageNumber: 1,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'areaSetare',
        stageNumber: 2,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'subGerente',
        stageNumber: 3,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'gerente',
        stageNumber: 4,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'archivo',
        stageNumber: 5,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
    ]
  }, {
    _id: 'asdf122sd111111',
    company: 'idCompany1',
    procedureType: 'HAB',
    currentStage: 0,
    data: {
      // asi el resto de datos de los inputs escritos
      fut: '4', // 00001-2022
      expNum: '1231231',
      ownerDoctype: 'DNI',
      ownerDoc: '12312312',
      ownerName: 'Rosa Maria',
      ownerLastName: 'Tito Huamani',
      ownerBirth: new Date(),
      ownerAddress: 'asdfas',
      ownerDistrict: 'asdfas',
      ownerEmail: 'eafsdsa@sape.com',
      ownerPhone: 'asdfasdf',
      ownerCompanyName: 'PoopayeSAC',
      ownerCompanyAdress: 'San Lazaro',
      ownerCompanyDistrict: 'Arequipa',
      ownerCompanyEmail: 'hola@poopaye.com',
      ownerCompanyRepreName: 'Bebo',
      ownerCompanyRepreLastName: 'Pena Sanchez',
      driverDocType: 'DNI',
      driverDoc: '4614816515',
      driverName: 'nombre',
      driverLastName: 'apellido',
      driverBirth: new Date(),
      driverAddress: 'San Poronga',
      driverDistrict: 'Concha de la lora',
      driverEmail: 'shfs@ewww.com',
      driverPhone: '646515561',
      driverLicence: '416468846',
      carBrand: 'TOYOTA',
      carModel: 'Yaris',
      carColor: 'Red',
      carYear: new Date(),
      carEngine: 'VSDIJVPDVS75DV5S',
      carSerie: 'VLD4F8DF4D6F4F',
      carClass: 'C486168',
      carService: 'REMISSE',
      carLicensePlate: 'V2D451',
      carBillQualification: '25656165',
      carBillFeatures: '54165161',
      carTransitoryPermise: 'YES',
      initDate: new Date(),
      aproveDate: null, // fecha de aprobación
      dueDate: null, // fetcha de aprobació mas un año
      // sended: true, // para saber si ya lo mandó, cosa que le deja seguir editando si no // NO ES PRIORIDAD
      companyStatus: 'cancelled', // status del icono que ve el personal, enviado, observado, vencido, vigente
      canRenew: false, // 
      files: {
        fileArrenda: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileSoat: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '12312312',
          status: '',
        },
        fileBoletaInfo: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileRevTecnica: {
          file: null,
          exempt: true,
          id: '',
          status: '',
        },
        fileReciboHabilit: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboCarater: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileReciboFotos: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileDeclaracionJur: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: '',
        },
        fileCertificadoCaract: {
          file: {
            name: 'defaultFile'
          },
          exempt: false,
          id: '1231231231231',
          status: 'approved',
        },
      },
      resotion: 'asdfsssdf.pdf'
    },
    stageStatus: 'new',
    stages: [
      {
        name: 'mesapartes',
        stageNumber: 0,
        current: true,
        status: 'new', // status del icono que ve el personal, visto, observado, enviado a la siguiente etapa o nuevo
        reviewed: false, // para que pueda filtrar por los que no estan revisados
        obsMessage: ''
      },
      {
        name: 'subCirc',
        stageNumber: 1,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'areaSetare',
        stageNumber: 2,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
      {
        name: 'subGerente',
        stageNumber: 3,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'gerente',
        stageNumber: 4,
        current: false,
        reviewed: false,
        signed: false,
        obsMessage: ''
      },
      {
        name: 'archivo',
        stageNumber: 5,
        current: false,
        reviewed: false,
        obsMessage: ''
      },
    ]
  },
  {
    "_id": "620b3c616ed19a280e147feb",
    "company": "user",
    "procedureType": "HAB",
    "currentStage": 5,
    "initDate": "2022-02-15T05:38:41.853Z",
    "aproveDate": null,
    "dueDate": null,
    "companyStatus": "sended",
    "canRenew": false,
    "resoluciones": [],
    "data": {
      "driverAddress": "Urb. Cabaña Maria K-5 Cercado, Arequipa",
      "driverBirth": "2022-02-15T05:37:39.337Z",
      "driverDistrict": "Cayma",
      "driverDoc": "22412312",
      "driverDocType": "DNI",
      "driverEmail": "effrenanthony2704@gmail.com",
      "driverLastName": "Conduce",
      "driverLicence": "123123",
      "driverName": "Conductor",
      "driverPhone": "+51993026178",
      "ownerDoc": "70349480",
      "ownerDoctype": "DNI",
      "ownerAddress": "Urb. cabaña maria k-5 cercado, Arequipa",
      "ownerDistrict": "Arequipa",
      "ownerBirth": "2022-02-15T05:37:39.337Z",
      "ownerEmail": "poopayesac@gmail.com",
      "ownerName": "Effren Anthony",
      "ownerLastName": "Sanchez",
      "ownerPhone": "993026178",
      "ownerCompanyName": "",
      "ownerCompanyAddress": "",
      "ownerCompanyDistrict": "",
      "ownerCompanyEmail": "",
      "ownerCompanyRepreName": "",
      "ownerCompanyRepreLastName": "",
      "carBrand": "TOYOTA",
      "carModel": "asd",
      "carColor": "asd",
      "carYear": "2022-02-15T05:37:39.337Z",
      "carEngine": "asdas",
      "carSerie": "123123",
      "carClass": "12312312",
      "carService": "ESTACION",
      "carLicensePlate": "12312",
      "carBillQualification": "213123",
      "carBillFeatures": "123123",
      "carTransitoryPermise": "",
      "initDate": 1644903521,
      "aproveDate": null,
      "dueDate": 1676439521,
      "companyStatus": "sended",
      "canRenew": false,
      "files": {
        "fileArrenda": {
          "name": "Contrato de Arrendamiento",
          "file": {
            "name": "_pdf-prueba.pdf"
          },
          "exempt": false,
          "id": "1644903494779.pdf",
          "status": "approved"
        },
        "fileBoletaInfo": {
          "name": "Boleta Informativa",
          "file": {
            "name": "_pdf-prueba.pdf"
          },
          "exempt": false,
          "id": "1644903498394.pdf",
          "status": "approved"
        },
        "fileSoat": {
          "name": "SOAT/AFOCAT para uso de taxi",
          "file": {
            "name": "_pdf-prueba.pdf"
          },
          "exempt": false,
          "id": "1644903501225.pdf",
          "status": "approved"
        },
        "fileRevTecnica": {
          "name": "Revisión Técnica",
          "file": null,
          "exempt": true,
          "id": null,
          "status": "approved"
        },
        "fileReciboHabilit": {
          "name": "Recibo por derecho de habilitación",
          "file": {
            "name": "_pdf-prueba.pdf"
          },
          "exempt": false,
          "id": "1644903506496.pdf",
          "status": "approved"
        },
        "fileReciboCarater": {
          "name": "Recibo por certificado de características",
          "file": {
            "name": "_pdf-prueba.pdf"
          },
          "exempt": false,
          "id": "1644903509981.pdf",
          "status": "approved"
        },
        "fileReciboFotos": {
          "name": "Fotografías del vehículo",
          "file": {
            "name": "10757122109-R01-E001-11.pdf"
          },
          "exempt": false,
          "id": "1644904749958.pdf",
          "status": "approved"
        },
        "fileDeclaracionJur": {
          "name": "Declaración Jurada",
          "file": {
            "name": "10757122109-R01-E001-11.pdf"
          },
          "exempt": false,
          "id": "1644904746057.pdf",
          "status": "approved"
        },
        "fileCertificadoCaract": {
          "file": {
            "name": "10757122109-R01-E001-11.pdf"
          },
          "exempt": false,
          "id": "1644905367717.pdf",
          "status": "approved"
        }
      },
      "fut": "00000001-02-2022"
    },
    "stages": [
      {
        "name": "mesapartes",
        "stageNumber": 0,
        "current": false,
        "status": "sended",
        "reviewed": false,
        "obsMessage": "Te faltan cosas causa"
      },
      {
        "name": "subCirc",
        "stageNumber": 1,
        "current": false,
        "status": "new",
        "reviewed": false,
        "obsMessage": ""
      },
      {
        "name": "areaSetare",
        "stageNumber": 2,
        "current": false,
        "status": "new",
        "reviewed": false,
        "obsMessage": ""
      },
      {
        "name": "subGerente",
        "stageNumber": 3,
        "current": false,
        "reviewed": false,
        "status": "new",
        "signed": false,
        "obsMessage": ""
      },
      {
        "name": "gerente",
        "stageNumber": 4,
        "current": false,
        "status": "new",
        "reviewed": false,
        "signed": false,
        "obsMessage": ""
      },
      {
        "name": "archivo",
        "stageNumber": 5,
        "current": true,
        "status": "new",
        "reviewed": false,
        "obsMessage": ""
      }
    ],
    "subGerenteSignature": true,
    "gerenteSignature": true,
    // "setareStatus": 'porVencerse'
  }
];

class ProcedureMock {
  async getProcedure() {
    return Promise.resolve(proceduresMock);
  }
}

module.exports = {
  proceduresMock,
  ProcedureMock
};
