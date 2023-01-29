import {updateCurrentExchangeRateFile} from './CurrencyExchangeModule/currencyExchange.js';
import {CronJob} from'cron';
import {botStart} from './TelegramBot/telegramBot.js';
import  axios from 'axios';

updateCurrentExchangeRateFile();
var job = new CronJob(
	'*/5 * * * *',
	function() 
    {
		axios.get("https://forecast-currency-exchange-bot.herokuapp.com");
		updateCurrentExchangeRateFile();
	},
);
job.start();
botStart();

