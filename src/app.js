import "./styles/styles.scss";
import {Router} from "./router"; // импортируем роутер

// import {Router} from "./router.js";

class App{
    constructor() {
        new Router();
    }
}
(new App());