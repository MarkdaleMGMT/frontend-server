const dateFormat = require('dateformat');
const { user_stats_model } = require('../../models')
const { getDates } = require('../../util/common')
const moment = require("moment");


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


    //get all logs for daily registered users
    let daily_registered_users = await user_stats_model.get_registered_users(start_date, end_date);
    let cumulative_sum = daily_registered_users[0]['count'];

    for(let i=0; i<daily_registered_users.length; i++){

      if(i!=0)
        cumulative_sum += daily_registered_users[i]['count'];

      daily_registered_users[i]['cumulative_sum'] = cumulative_sum;

    }

    console.log("daily_registered_users: ",daily_registered_users);

    let dates = getDates(start_date,end_date);

    //initialized to the number of users registered as of that date
    let user_count = await user_stats_model.get_registered_users_by_date(start_date);
    let stats = [];
    //iterate over the dates

    for(let i=0; i<dates.length; i++){

      // console.log("date: ",moment(dates[i],'yyyy-mm-dd'));
      // console.log("date: ",moment(daily_registered_users[0]['registered_on'],'yyyy-mm-dd'));

      //entries of current date
      let entry = daily_registered_users.filter(function (el) {
        // console.log(el.date,dates[i]);
        console.log(dateFormat(el.registered_on,'yyyy-mm-dd') == dates[i]);
        return dateFormat(el.registered_on,'yyyy-mm-dd') == dates[i]
      });

      if(entry.length > 0){
        user_count += entry[0].cumulative_sum;
      }

      stats.push({
        'date' : dates[i],
        'count': user_count
      });

      //remove the found entires
      if(daily_registered_users.length>0)
        daily_registered_users = daily_registered_users.splice(1);
    }//end for



	  res.send({code: "Success", stats})
 	}
 	catch(err){
    console.error(err);
 		res.status(400).send({msg: 'Failed to fetch registered users', err:err.message});
 	}
 }


//create a view that groups the date and count of the records
//
