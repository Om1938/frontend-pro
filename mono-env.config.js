const { GITHUB_REPOSITORY = "placeholder/dist" } = process.env;
module.exports = {
  "sortable-list-component": {
    name: "sortable-list-component",
    base: `/${GITHUB_REPOSITORY.split("/")[1]}/sortable-list-component`,
    port: 4001,
    path: "./src/components/sortable-list-component",
  },
  //   Add more projects here if you want to build them all at once
};
