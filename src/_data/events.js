const fetchAPI = require("../utils/storyblok.js");

module.exports = async function getEvents () {
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