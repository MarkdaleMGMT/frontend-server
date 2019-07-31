const dateFormat = require('dateformat');
const { user_stats_model } = require('../../models')
const { getDates } = require('../../util/common')


module.exports = async function get_registered_users_api(req, res) {
	try{


    let time_period_days = req.body.time_period_days;

    let dateOffset = (24*60*60*1000) * time_period_days;
    let end_date = new Date();
    let start_date = new Date();
    start_date.setTime(start_date.getTime() - dateOffset);

    //convert the date to mysql format
    start_date = dateFormat(start_date,'yyyy-mm-dd');
    end_date = dateFormat(end_date,'yyyy-mm-dd');


    let daily_registered_users = await user_stats_model.get_registered_users(start_date, end_date);
    let cumulative_sum = daily_registered_users[0]['count'];

    for(let i=0; i<daily_registered_users.length; i++){

      if(i!=0)
        cumulative_sum += daily_registered_users[i]['count'];

      daily_registered_users[i]['cumulative_sum'] = cumulative_sum;

    }

    let dates = getDates(start_date,end_date);
    let user_count = 0;
    let stats = [];
    //iterate over the dates

    for(let i=0; i<dates.length; i++){

      //entries of current date
      let entry = daily_registered_users.filter(function (el) {
        // console.log(el.date,dates[i]);
        return el.registered_on == dateFormat(dates[i],'yyyy-mm-dd');
      });

      if(entry.length > 0){
        user_count += entry.count
      }

      stats.push({
        'date' : dates[i],
        'count': user_count
      });

      //remove the found entires
      daily_registered_users = daily_registered_users.splice(1)
    }//end for



	  res.send({code: "Success", stats})
 	}
 	catch(err){
 		res.status(400).send({msg: 'Failed to fetch registered users', err});
 	}
 }


//create a view that groups the date and count of the records
//
