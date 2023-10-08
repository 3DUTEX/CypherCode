import "core-js/stable";
import "regenerator-runtime";

import "./assets/css/styles.css";

//barra de navegação
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => nav.classList.toggle("active"));

import Carrossel from "./assets/modules/Carrossel";

const carrosselProjetos = document.querySelector(".carrossel-projetos");
const carrossel = new Carrossel(carrosselProjetos);

carrossel.comIntervalo(3000);