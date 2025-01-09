const fetchAPI = require("../utils/storyblok.js");


module.exports = async function getPeople () {
  const data = await fetchAPI(`
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
  `);
  return data?.PersonItems.items;
}