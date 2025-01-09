const fetchAPI = require("../_11ty/storyblok");

module.exports = async function getEvents () {
  fetchAPI
  const data = await fetchAPI(`
  {
    EventItems {
      items {
        id
        slug
        content {
          title
          overview
          published
          start_time
          talks {
            id
          }
        }
      }
    }
  }
  `);
  return data?.EventItems.items;
}
