const CleanCSS = require('clean-css');
const markdownIt = require("markdown-it");
const md = new markdownIt({
  html: true,
});

const encodeForUrl = string => encodeURIComponent(string)

const upcomingEvents = (events) => {
  return events.filter(event => {
    return new Date(event.startTimeUTC) > new Date()
  }).reverse()
}

const getMostRecentlyUpdatedDate = (events) => {
  if (events.length === 1) {
    return new Date(events[0].published_at)
  }

  const lastUpdated = [...events].sort((a, b) => {
    return new Date(a.published_at) - new Date(b.published_at)
  })[0]

  return new Date(lastUpdated.published_at)
}

module.exports = {
  calendarDescription: description => {
    const text = `${description} See https://performanceobserver.dev for the full details! If the zoom meeting is full, check our YouTube channel for a simultaneous livestream: https://www.youtube.com/@PerformanceObserver`
    return encodeForUrl(text)
  },
  cssmin: code => {
    return new CleanCSS({}).minify(code).styles;
  },
  dateIsUpcoming: date => new Date(date) > new Date(),
  encodeForUrl,
  getMostRecentlyUpdatedDate,
  getOrganizers: people => people.filter(person => person.content.organizer),
  getTalkById: (talks, talkId) => {
    return talks.find( talk => talk.id === talkId)
  },
  joinSpeakerNames: speakers => {
    if (!speakers || speakers.length === 0) { return '' }
    return speakers.map(speaker => speaker.content.name).join(' and ')
  },
  markdown: content => {
    return md.render(content);
  },
  nextEvent: events => {
    const filteredEvents = upcomingEvents(events)
    return filteredEvents.length > 0 ? filteredEvents[0].data.event : null
  },
  pastEvents: events => {
    return events.filter(event => {
      return new Date(event.startTimeUTC) < new Date()
    })
  },
  readableDate: dateObj => {
    return new Date(dateObj).toDateString()
  },
  readableDateTime: dateObj => {
    // "Jun 25, 2021, 12:00:00 PM CDT"  <--wanted time zone
    return new Date(dateObj).toLocaleString([],{
      day: '2-digit',
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    })
  },
  toDate: dateString => new Date(dateString),
  upcomingEvents,
}
