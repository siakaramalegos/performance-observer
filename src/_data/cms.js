const { EVENTS_QUERY, TALKS_QUERY, PEOPLE_QUERY } = require("../_11ty/queries");
const fetchAPI = require("../_11ty/storyblok");

const getTalks = (talks, eventTalks, people) => {
  if (!eventTalks || eventTalks.length === 0) {
    return null
  }

  return eventTalks.map(talk => {
    const rawTalk = talks.find(t => t.id === talk.id)
    const speakers = getSpeakers(people, rawTalk.content.speaker)

    return {
      ...rawTalk,
      speakers,
    }
  })
}

const getSpeakers = (people, talkSpeakers) => {
  if (!talkSpeakers || talkSpeakers.length === 0) {
    return null
  }

  return talkSpeakers.map(speaker => {
    return people.find(person => person.id === speaker.id)
  })
}

module.exports = async function getEvents () {
  fetchAPI

  const [eventData, talksData, peopleData] = await Promise.all([fetchAPI(EVENTS_QUERY), fetchAPI(TALKS_QUERY), fetchAPI(PEOPLE_QUERY)]);

  const rawEvents = eventData?.EventItems.items;
  const rawTalks = talksData?.TalkItems.items;
  const people = peopleData?.PersonItems.items;

  const mungedEvents = rawEvents.map(event => {
    const eventTalks = getTalks(rawTalks, event.content.talks, people)

    // Need to force UTC time parsing for the event start time
    const date = new Date(event.content.start_time + 'Z')

    return {
      ...event,
      startTimeUTC: date,
      startTimeEST: date.toLocaleString("en-US", {timeZone: "America/New_York"}),
      talks: eventTalks,
    }
  })

  const talks = []

  mungedEvents.forEach(event => {
    event.talks.forEach(talk => {
      talks.push({
        ...talk,
        event: {
          slug: event.slug,
          startTimeUTC: event.startTimeUTC,
          startTimeEST: event.startTimeEST,
          title: event.content.title,
        }
      })
    })
  });

  return {
    events: mungedEvents.sort((a, b) => b.startTimeUTC - a.startTimeUTC),
    talks,
    people,
  }
}
