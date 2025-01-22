const TALKS_QUERY = `
{
  TalkItems {
    items {
      id
      slug
      content {
        title
        description
        youtube_id
        speaker {
          id
        }
      }
    }
  }
}
`

const PEOPLE_QUERY = `
{
  PersonItems {
    items {
      id
      slug
      content {
        name
        pronouns
        headshot {
          alt
          filename
        }
        organizer
        short_bio
        website
        bluesky
        linkedin
        mastodon
      }
    }
  }
}
`

const EVENTS_QUERY = `
{
  EventItems {
    items {
      id
      slug
      content {
        title
        overview
        start_time
        join_link
        talks {
          id
        }
      }
    }
  }
}
`

module.exports = {
  TALKS_QUERY,
  PEOPLE_QUERY,
  EVENTS_QUERY,
}
