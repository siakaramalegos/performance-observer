const fetchAPI = require("../_11ty/storyblok");

module.exports = async function getTalks () {
  const data = await fetchAPI(`
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
  `);
  return data?.TalkItems.items;
}
