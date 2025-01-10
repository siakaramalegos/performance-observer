const fetchAPI = require("../_11ty/storyblok");

// Example event (notice start time does not have a time zone - let's always use US Eastern for this):
// {
//   id: 606867900,
//   slug: 'inaugural-meetup-bob-and-use-talk',
//   content: {
//     title: 'Inaugural meetup: bob and use talk published',
//     overview: "This month, we're coming live from APAC and Europe for two talks.",
//     published: true,
//     start_time: '2025-01-17 12:00',
//     talks: [Array]
//   }
// },
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
