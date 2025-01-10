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
    const publishedEvents = data.rawEvents.filter(event => event.content.published)

    const mungedEvents = publishedEvents.map(event => {
      const talks = getTalks(data, event.content.talks)

      return {
        ...event,
        talks,
      }
    })
    console.log(mungedEvents[0]);


    return mungedEvents
	},
};
