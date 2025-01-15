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

module.exports = {
	events: (data) => {
    const mungedEvents = data.rawEvents.map(event => {
      const talks = getTalks(data, event.content.talks)

      // Need to force UTC time parsing for the event start time
      const date = new Date(event.content.start_time + 'Z')

      return {
        ...event,
        startTimeUTC: date,
        startTimeEST: date.toLocaleString("en-US", {timeZone: "America/New_York"}),
        talks,
      }
    })

    return mungedEvents.sort((a, b) => b.startTimeUTC - a.startTimeUTC)
	},
};
