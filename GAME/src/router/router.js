import express from "express";
import mainController from "../controllers/main";
import areaController from "../controllers/area";
//import cursoController from "../controllers/curso";
const router = express.Router();

router.get("/", mainController.index);
router.get("/about", mainController.about);
router.get("/ui", mainController.ui);
router.get("/game", mainController.game);

router.get("/areas", areaController.index);

//router.get('/curso' , cursoController.index);
//router.get('/curso/read/:id' , cursoController.read);
//router.get('/curso/create' , cursoController.create);
//router.post('/curso/create' , cursoController.create);
//router.get('/curso/update/:id' , cursoController.update);
//router.post('/curso/update/:id' , cursoController.update);
//router.post('/curso/remove/:id' , cursoController.remove);

export default router;
