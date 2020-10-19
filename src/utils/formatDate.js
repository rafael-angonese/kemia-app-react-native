/*
  Formata uma data no formato indicado
  Exemplo:
  * formatDate(2020-09-21) => '21/09/2020' // default
  * formatDate(2020-09-21, 'yyyy-MM-dd') =>  '21/09/2020'
*/
// import { format } from 'date-fns';
import { format } from 'date-fns-tz';
// import { zonedTimeToUtc } from 'date-fns-tz';

const formatDate = (date, dateFormat = 'dd/MM/yyyy') => {
  if (date) {
    const data = new Date(date);
    date = format(data, dateFormat, {
        timeZone: 'America/Sao_Paulo',
      });
  }

  return date;
};

export default formatDate;