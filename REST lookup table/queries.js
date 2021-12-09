const http = require('http')
const url = require('url')
const Pool = require('pg').Pool
var atob = require('atob')
const axios = require('axios')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Lookup',
  password: 'Dragon123!',
  port: 5433,
})

const getMIULookup = (request, response) => {
  const parameters = url.parse(request.url,true).query
  var miuid = parameters.miuid
  debugger
  pool.query('SELECT * FROM miulookup WHERE miuid = $1',[miuid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postCustomerLookup = (request, response) => {
  const parameters = url.parse(request.url,true).query
  var miuid = parameters.miuid
  var customerid = parameters.customerid
  debugger
  return new Promise(resolve => {
		setTimeout(() => {
		resolve(pool.query('SELECT COUNT(*) FROM customerlookup WHERE miuid = $1',[miuid],(error, results) => {		
			// if no dupe insert into alarms table
			if(results.rows[0].count == 0){
			try{
			(pool.query('INSERT INTO customerlookup (miuid, customerid) VALUES ($1, $2)', [miuid, customerid], (error, results) => {
			}))}catch(error){}}
			else{
			try{
			(pool.query('UPDATE customerlookup SET customerid = $2 WHERE miuid = $1', [miuid, customerid], (error, results) => {
			}))}catch(error){}
			}
		}));
		}, 3000);
    });
}

const postProviderLookup = (request, response) => {
  const parameters = url.parse(request.url,true).query
  var miuid = parameters.miuid
  var providerid = parameters.providerid
  debugger
   return new Promise(resolve => {
		setTimeout(() => {
		resolve(pool.query('SELECT COUNT(*) FROM providerlookup WHERE miuid = $1',[miuid],(error, results) => {		
			// if no dupe insert into alarms table
			if(results.rows[0].count == 0){
			try{
			(pool.query('INSERT INTO providerlookup (miuid, providerid) VALUES ($1, $2)', [miuid, providerid], (error, results) => {
			}))}catch(error){}}
			else{
			try{
			(pool.query('UPDATE providerlookup SET providerid = $2 WHERE miuid = $1', [miuid, providerid], (error, results) => {
			}))}catch(error){}
			}
		}));
		}, 3000);
    });
}

const postProvision = (request, response) => {
  const parameters = url.parse(request.url,true).query
  const CAuthToken = parameters.AuthToken
  const CjoinEUI = parameters.joinEUI
  const CdevEUI = parameters.devEUI
  const CappKey = parameters.appKey
  debugger

  const config = {
    headers: { Authorization: `Bearer ${CAuthToken}` }
};

const bodyParameters = {
    joinEUI:CjoinEUI,
    devEUI:CdevEUI,
    appKey:CappKey,
    rxDelay:"4",
    classC: false
};

axios.post( 
  'https://us.bmz.cloud/lnsadapter/lorasensor/otaa',
  bodyParameters,
  config
)
.then(function ({data}) {
      console.log('Success ' + JSON.stringify(data))
    })
    .catch(function (error) {
      console.log('Error ' + error.message)
    })
}


module.exports = {
  getMIULookup,
  postCustomerLookup,
  postProviderLookup,
  postProvision,
}