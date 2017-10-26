/* eslint-disable no-unused-vars */
let async = require('asyncawait/async');
let await = require('asyncawait/await');
var axios = require('axios');
var fs = require('fs');
var path = require('path');
var db = '../DBConnection/db.json';
var file = require(db);
var _ = require('lodash');
var dbapi = [];

// if (file.mongo.dbdefault == 'true') {
//     console.log('***************inside mongo api****************');
//     var api = require('../DBConnection/mongoapi')
//     dbapi.push({db: 'mongo',api: api});
//      // console.log('api',dbapi);
// }
// if (file.rethink.dbdefault == 'true') {
//     console.log('***************inside rethink api**************');
//     var api = require('../DBConnection/rethinkapi')
//     dbapi.push({db: 'rethink',api: api});
//     // console.log('api',dbapi);
// }
// if (file.elastic.dbdefault == 'true') {
//   console.log('***************inside elastic api**************');
//   var api = require('../DBConnection/elasticapi')
//   dbapi.push({db: 'elastic',api: api});
// }
// if (file.nedb.dbdefault == 'true') {
//   console.log('***************inside nedb api**************');
//   var api = require('../DBConnection/nedbapi')
//   dbapi.push({db: 'nedb',api: api});
// }

_.forEach(file, function (dbs, i) {
  // console.log('dbs', dbs)
  var flag = false
  _.forEach(dbs.dbinstance, function(instance) {
    // console.log(instance)
    if (instance.isenable) {
      flag = true
      // console.log('qqqq', instance.connection_name)
    }
  })
  if(flag) {
    var api = require('../DBConnection/' + i + 'api')
    dbapi.push({ db: i, api: api });
    api.choose()
  }
})

var chokidar = require('chokidar');

let readfile = async(function () {
  fs.readFile(path.join(__dirname, '../DBConnection/db.json'), function (err, data) {
    if (err) return console.log(err);
    // console.log('reading file' + data)
    if (data == '') {
      console.log('BLANCK DATA');
      return 'nodata';
    }
    file = JSON.parse(data);
    dbapi = [];
    _.forEach(file, function (dbs, i) {
      var flag = false
      _.forEach(dbs.dbinstance, function(instance) {
        if (instance.isenable) {
          flag = true
        }
      })
      if(flag) {
        var api = require('../DBConnection/' + i + 'api')
        dbapi.push({ db: i, api: api });
        api.choose()
      }
    })
  });
})

chokidar.watch(path.join(__dirname, '../DBConnection/db.json'), { ignored: /(^|[\/\\])\../ }).on('change', async(function (path) {
  // console.log('File', path, 'has been changed');
  delete require.cache[require.resolve('../DBConnection/db')];
  delete require.cache[require.resolve('../DBConnection/mongoapi')];
  delete require.cache[require.resolve('../DBConnection/rethinkapi')];
  delete require.cache[require.resolve('../DBConnection/elasticapi')];
  delete require.cache[require.resolve('../DBConnection/mysqlapi')];  
  
  var checking = await (readfile);
  // console.log('checking',checking);
  if (checking === 'nodata') {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
    await (readfile);
  }
}))


class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    console.log('find feathers...', params);
    if (params.query.dbname == undefined) {
      if(params.query.name !== undefined ){
        console.log('000000000000000000000000000000000000000000000', params.query.name)
        var instance = []
        dbapi.forEach(function (db) {
            let _promise = new Promise((resolve, reject) => {
              db.api.getSchemaName(params.query.name).then((data) => {
                resolve(data);
              })
            });
            instance.push(_promise)
        });    
        var _data = Promise.all(instance).then(function (response) {
          console.log('response...................22',response)
          // return response[0]
          var Extract = []
          response.forEach(function (item) {
            item.forEach(function (result) {
              Extract.push(result)
            })
          })
          // console.log('Extract', Extract)
          return Extract
        })
        return _data   
      }
      else{
        var instance = []
        dbapi.forEach(function (db) {
          let _promise = new Promise((resolve, reject) => {
            db.api.getSchema().then((data) => {
              resolve(data);
            })
          });
          instance.push(_promise)
        });

        var _data = Promise.all(instance).then(function (response) {
          // console.log('response', response.length)
            // _.map(response,function(d){ 
            //   console.log('d',d)
            // });
          var Extract = []
          response.forEach(function (item) {
            item.forEach(function (result) {
              Extract.push(result)
            })
          })
          // console.log('Extract', Extract)
          return Extract
            // for(var res in response){
            //   console.log('res',response[res])
            // }
            // return _.union(response);
        })
        return _data
      }
    }
    if(params.query.dbname !== undefined) {
      if (params.query.dbid == undefined) {
        var instance = []
        dbapi.forEach(function (db) {
          // console.log('here.......................................')
          if(db.db == params.query.dbname) {
            let _promise = new Promise((resolve, reject) => {
              db.api.getSchema().then((data) => {
                resolve(data);
              })
            });
            instance.push(_promise)
          }
        });    
        var _data = Promise.all(instance).then(function (response) {
          return response[0]
        })
        return _data
      }
      if (params.query.dbid !== undefined) {
        var instance = []
        dbapi.forEach(function (db) {
          if(db.db == params.query.dbname) {
            let _promise = new Promise((resolve, reject) => {
              db.api.getSchemaByDbid(params.query.dbid).then((data) => {
                resolve(data);
              })
            });
            instance.push(_promise)
          }
        });    
        var _data = Promise.all(instance).then(function (response) {
          return response[0]
        })
        return _data   
      }
    }

    // var dbdata = []
    // if(params.query.name == undefined ){
    //   console.log(111)
    //   for(var i=0;i<dbapi.length;i++){
    //     console.log(222)
    //     var data = dbapi[i].api.getSchema();
    //     for(var j=0;j<data.length;j++){
    //       console.log(333)
    //       dbdata.push(data[j]);
    //     }
    //     console.log(444)
    //   }
    //   console.log('dbdata', dbdata)
    //   // var dbdata = dbapi.getSchema();
    // }
    // if(params.query.name !== undefined ){
    //   console.log("@@@@@@@@")
    //   var dbdata = dbapi.getSchemaName(params.query.name);
    // }
  }

  get(id, params) {
    console.log('Get feathers...');
    // var instance = []
    if (params.query.type !== undefined) {
      var instance = []
      console.log("234")
      dbapi.forEach(function (db) {
        let _promise = new Promise((resolve, reject) => {
          db.api.getThisSchemaType(id, params.query.type).then((data) => {
            resolve(data);
          })
        });
        instance.push(_promise)
      });
      var _data = Promise.all(instance).then(function (response) {
        console.log('_data...type..............................\n', response)
        var Extract = []
            response.forEach(function (item) {
              item.forEach(function (result) {
                Extract.push(result)
              })
            })
            // console.log('Extract', Extract)
        return Extract
      })
      return _data;
      // var dbdata = dbapi.getThisSchemaType(id, params.query.type)
    } else if (params.query.fieldname !== undefined) {
      var instance = []
      dbapi.forEach(function (db) {
        let _promise = new Promise((resolve, reject) => {
          db.api.getThisSchemaFieldName(id, params.query.fieldname).then((data) => {
            resolve(data);
          })
        });
        instance.push(_promise)
      });
  
      var _data = Promise.all(instance).then(function (response) {
        console.log('_data.................', response)
        var Extract = []
            response.forEach(function (item) {
              item.forEach(function (result) {
                Extract.push(result)
              })
            })
            // console.log('Extract', Extract)
        return Extract
      })
      return _data;
      // var dbdata = dbapi.getThisSchemaFieldName(id, params.query.fieldname)
    } else {
      var instance = []
      console.log("12")
      dbapi.forEach(function (db) {
        let _promise = new Promise((resolve, reject) => {
          db.api.getThisSchema(id).then((data) => {
            resolve(data);
          })
        });
      instance.push(_promise)
      });
      var _data = Promise.all(instance).then(function (response) {
            // var Extract = []
            // response.forEach(function (item) {
            //   item.forEach(function (result) {
            //     Extract.push(result)
            //   })
            // })
            // console.log('Extract', Extract)
        // return Extract
        var obj;
        response.forEach(function (i) {
          if (i[0] != undefined) {
            obj = i[0]
          }
        })
        console.log('_data.................', obj)
        return obj
      })
      return _data;
  
      // var _data = Promise.all(instance).then(function (response) {
      //   console.log('_data.................', response)
      //   var Extract = []
      //       response.forEach(function (item) {
      //         item.forEach(function (result) {
      //           Extract.push(result)
      //         })
      //       })
      //       // console.log('Extract', Extract)
      //   return Extract
      //   // var obj;
      //   // response.forEach(function (item) {
      //   //   if (item[0] != undefined) {
      //   //     obj = item[0]
      //   //   }
      //   // })
      //   // return obj
      // })
      // return _data;
    }
    var _data = Promise.all(instance).then(function (response) {
      console.log('_data.................', response)
      var Extract = []
          response.forEach(function (item) {
            item.forEach(function (result) {
              Extract.push(result)
            })
          })
          // console.log('Extract', Extract)
      return Extract
      // var obj;
      // response.forEach(function (item) {
      //   if (item[0] != undefined) {
      //     obj = item[0]
      //   }
      // })
      // return obj
    })
    return _data;
    // if(params.query.type !== undefined ){
    //   var dbdata = dbapi.getThisSchemaType(id, params.query.type)
    // }
    // else if(params.query.fieldname !== undefined ){
    //   var dbdata = dbapi.getThisSchemaFieldName(id, params.query.fieldname)
    // }
    // else {
    //   // var dbdata = dbapi.getThisSchema(id);
    // }
    // return Promise.resolve(dbdata);
  }

  create(data, params) {
    console.log('create feathers...');
    var _dbindex = _.findIndex(dbapi, { 'db': data.database[0] });
    var dbdata = dbapi[_dbindex].api.postSchema(data);
    return Promise.resolve(dbdata);
  }

  update(id, data, params) {
    console.log('Update feathers...');
    var _dbindex = _.findIndex(dbapi, { 'db': data.database[0] });
    var dbdata = dbapi[_dbindex].api.putSchema(data, id);
    return Promise.resolve(dbdata);
  }

  patch(id, data, params) {
    // var dbdata = dbapi.putSchema(data, id);
    return Promise.resolve(data);
  }

  remove(id, params) {
    console.log('Delete feathers...', params.query.type)
      var instance = []
      dbapi.forEach(function (db) {
        let _promise = new Promise((resolve, reject) => {
          db.api.deleteThisSchema(id, params.query.type).then((data) => {
            resolve(data);
          })
        });
        instance.push(_promise)
      });
      var _data = Promise.all(instance).then(function (response) {
        // console.log('response', response)
        return response
      })
      return _data;
    }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
