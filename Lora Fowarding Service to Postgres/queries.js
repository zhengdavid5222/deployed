const Pool = require('pg').Pool
var atob = require('atob')


const pool = new Pool({
  user: 'postgres',
  host: '10.1.9.32',
  database: 'zkmtest',
  password: 'zltd:admin',
  port: 5432,
})

// get first 100 rows from DataSamples table
const getDataSamples = (request, response) => {
  pool.query('SELECT * FROM datasamples ORDER BY datasampleid ASC LIMIT 100', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// get first 100 rows from Alarms table
const getAlarms = (request, response) => {
  pool.query('SELECT * FROM alarms ORDER BY alarmid ASC LIMIT 100', (error, results) => {
    response.status(200).json(results.rows)
  })
}

// get first 100 rows from nodes table
const getNodes = (request, response) => {
  pool.query('SELECT * FROM alarms ORDER BY nodeid ASC LIMIT 100', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// POST reading to the correct tables
const Reading = (request, response) => {
	const decrypted = request.body.data.raw.decrypted
	const ownernumber = request.body.data.ownernumber
	const fport = request.body.data.lora.fport
	
	var objectNumber1 = ownernumber.slice(10, 16)
	var objectNumber = parseInt(objectNumber1, 16)
	var a = []
	a[0] = 0

	function myFunction0(){
		
		return new Promise(resolve => {
		setTimeout(() => {
		// see if node already existed	
		(pool.query('SELECT COUNT(*) FROM nodes WHERE nodeid = $1',[objectNumber],(error, results) => {
		resolve(a[0] = results.rows[0].count)
		}));
		}, 3000);
		});

	}
	
	function myFunction2(){
    try{		
	var x = atob(decrypted)
	
	var y = x.slice(0,8)

	
    var z = parseInt(y,16)
	debugger
	var c = Date.now()
	c = c/1000
	var date2 = new Date(0)
	date2.setUTCSeconds(c)
	date2 = date2.getUTCFullYear() +"/"+ (date2.getUTCMonth()+1) +"/"+ date2.getUTCDate() + " " + date2.getUTCHours() + ":" + date2.getUTCMinutes() + ":" + date2.getUTCSeconds()


	return new Promise(resolve => {
		setTimeout(() => {
		resolve(pool.query('SELECT COUNT(*) FROM alarms WHERE nodeid = $1 and tstamp = $2',[objectNumber, date2],(error, results) => {		
			// if no dupe insert into alarms table
			if(results.rows[0].count == 0){
			try{
			(pool.query('INSERT INTO alarms (nodeid, gateway, alarms, hardwarealarms, tstamp) VALUES ($1, 1, $2, $2, $3)', [objectNumber, z, date2], (error, results) => {
			
		
			}))}catch(error){}}
		}));
		}, 3000);
    });
	}
	catch(error){
	}
	
	}
	

	
	function myFunction3(){
    try{		
	var x = atob(decrypted)
    	
    var y = x.slice(8,16)	
	var a = x.slice(0,8)	
	
    var z = parseInt(y,16)
	debugger
	var b = parseInt(a,16)
	debugger
	var date1 = new Date(0)
	date1.setUTCSeconds(b)
	date1 = date1.getUTCFullYear() +"/"+ (date1.getUTCMonth()+1) +"/"+ date1.getUTCDate() + " " + date1.getUTCHours() + ":" + date1.getUTCMinutes() + ":" + date1.getUTCSeconds()

	debugger


	
	return new Promise(resolve => {
	setTimeout(() => {
		resolve(pool.query('SELECT COUNT(*) FROM datasamples WHERE nodeid = $1 and tstamp = $2',[objectNumber, date1],(error, results) => {
		debugger
			//if(results.rows[0].count == 0){
			try{
			// insert into datasamples table
			debugger
			(pool.query('INSERT INTO datasamples (nodeid, gateway, data0, tstamp, reporttype) VALUES ($1, 1, $2, $3, 0)', [objectNumber, z, date1], (error, results) => {
		debugger		
			}))}catch(error){}
			//}	
		}));
		}, 3000);
	});
	}
	catch(error){
	}
	
	}	
	
	function myFunction4(){	
        // insert into nodes table	
	    pool.query('INSERT INTO nodes (nodeid, gatewayid, nodetype, nodesubtype) VALUES ($1, 1, 20, 151)', [objectNumber], (error, results) => {

		})	
	}
	
	function myFunction6(){
		
	return new Promise(resolve => {
		setTimeout(() => {	
	(async() => {
		resolve(await myFunction0())
		if(a[0] > 0){
		    // do nothing
	}else{
			// insert into nodes table
			myFunction4();
	}
	})();
	}, 3000);
	});
	}
    // any port that's not 0, 9 or 2
	if ([fport] != 0 && [fport] != 9 && [fport] != 2){	
		
		myFunction6();
		
		response.status(201).send(`device added with ID: ${1}`)
	}
	
	// port 2 
	if ([fport] == 2){

	(async() => {	
		await myFunction6();
		myFunction3();
		response.status(201).send(`device added with ID: ${1}`)
	})();

	}
	
	// port 9
	if ([fport] == 9){
	
	(async() => {	
		await myFunction6();
		myFunction2();
		response.status(201).send(`device added with ID: ${1}`)
	})();
	
	}
	}



module.exports = {
  getDataSamples,
  getAlarms,
  getNodes,
  Reading,
}