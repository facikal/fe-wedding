const { dayIdString, monthIdString } = require('../utilities/FormatDateId');

const attendDate = new Date("Oct 12, 2022 12:20:00");

const hour = String(attendDate.getHours()).padStart(2, "0")
const minute = String(attendDate.getMinutes()).padStart(2, "0")
const day = attendDate.getDay()
const date = attendDate.getDate()
const month = attendDate.getMonth()
const year = attendDate.getFullYear()

const dayId = dayIdString(day)
const monthId = monthIdString(month)

module.exports = {
  attendDate,
  dayId,
  monthId,
  hour,
  minute,
  date,
  year
}