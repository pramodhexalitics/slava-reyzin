import AboutPage from "./containers/AboutPage";
import ContactPage from "./containers/ContactPage";
import DatenschutzPage from "./containers/Datenschutz";
import FrontPage from "./containers/FrontPage";
import Galerien from "./containers/Galerien";
import Home from "./containers/Home";
import ImpressumPage from "./containers/Impressum";
import PaintingDetails from "./containers/PaintingDetails";
import PaintingPage from "./containers/PaintingPage";
import Videokunst from "./containers/Videokunst";

export const publicRoutes = [
  {
    path: "/",
    component: FrontPage,
  },
];

export const privateRoutes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/galerien",
    component: Galerien,
  },
  {
    path: "/videokunst",
    component: Videokunst,
  },
  {
    path: "/painting/:id",
    component: PaintingPage,
  },
  {
    path: "/painting-Details/:id",
    component: PaintingDetails,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/Kontakt",
    component: ContactPage,
  },
  {
    path: "/impressum",
    component: ImpressumPage,
  },
  {
    path: "/datenschutz",
    component: DatenschutzPage,
  }
];