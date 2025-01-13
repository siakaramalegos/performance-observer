const CleanCSS = require('clean-css');
const markdownIt = require("markdown-it");
const md = new markdownIt({
  html: true,
});

const upcomingEvents = (events) => {
  return events.filter(event => {
    return new Date(event.content.start_time) > new Date()
  }).reverse()
}

module.exports = {
  cssmin: code => {
    return new CleanCSS({}).minify(code).styles;
  },
  joinSpeakerNames: speakers => {
    if (!speakers || speakers.length === 0) { return '' }
    console.log(speakers);

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
      return new Date(event.content.start_time) < new Date()
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
  getTalkById: (talks, talkId) => {
    return talks.find( talk => talk.id === talkId)
  },
  upcomingEvents,
}
