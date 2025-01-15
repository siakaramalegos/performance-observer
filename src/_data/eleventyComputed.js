const getTalks = (data, eventTalks) => {
  if (!eventTalks || eventTalks.length === 0) {
    return null
  }

  return eventTalks.map(talk => {
    const rawTalk = data.talks.find(t => t.id === talk.id)
    const speakers = getSpeakers(data, rawTalk.content.speaker)

    return {
      ...rawTalk,
      speakers,
    }
  })
}

const getSpeakers = (data, talkSpeakers) => {
  if (!talkSpeakers || talkSpeakers.length === 0) {
    return null
  }

  return talkSpeakers.map(speaker => {
    return data.people.find(person => person.id === speaker.id)
  })
}

const getHoursOffsetUTC = (timeZone) => {
  const timeZoneName = Intl.DateTimeFormat("ia", {
    timeZoneName: "short",
    timeZone,
  })
    .formatToParts()
    .find((i) => i.type === "timeZoneName").value;
  const offset = timeZoneName.slice(3);
  if (!offset) return 0;

  const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/);
  if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`;

  const [, sign, hour, minute] = matchData;

  return hour;
};
const hoursOffsetUTC = getHoursOffsetUTC("US/Eastern")
console.log(hoursOffsetUTC);


module.exports = {
	events: (data) => {
    const publishedEvents = data.rawEvents.filter(event => event.content.published)

    const mungedEvents = publishedEvents.map(event => {
      const talks = getTalks(data, event.content.talks)

      // Need to force UTC time parsing for the event start time
      // "2025-01-17 12:00"
      const dateComponents = event.content.start_time.split(' ')
      const [year, month, day] = dateComponents[0].split('-').map(e => parseInt(e))
      const [hours, minutes] = dateComponents[1].split(':').map(e => parseInt(e))

      // Date.UTC(year, monthIndex, day, hours, minutes)
      // const date = new Date(Date.UTC(year, month - 1, day, hours, minutes))
      const date = new Date(event.content.start_time + 'Z')
      // .toLocaleString([],{
      //   day: '2-digit',
      //   month: "short",
      //   year: "numeric",
      //   hour: "numeric",
      //   minute: "numeric",
      //   timeZoneName: "short",
      // })
      // console.log(event.content.start_time);
      // console.log({date});

      return {
        ...event,
        startTimeUTC: date,
        talks,
      }
    })

    return mungedEvents
	},
};
