import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://antondedyaev.github.io/todo_list/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
