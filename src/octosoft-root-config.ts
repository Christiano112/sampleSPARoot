import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

// setting active to false means that the app will not be loaded initially until it is activated
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

System.import("@octosoft/styleguide")
  .then(() => {
    // console.log("Imported styleguide");
    // Activate the layout engine once the styleguide CSS is loaded
    layoutEngine.activate();
    start();
  })
  .catch((e) => {
    // console.error(e, "Error loading styleguide");
  });
