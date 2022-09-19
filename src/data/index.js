import assets from "../config/img/assets-storage.ts";

const listColor = [
  {
    color: "Rojo",
    code: "#ff0000",
  },
  {
    color: "Verde",
    code: "#92d050",
  },
  {
    color: "Amarillo",
    code: "#ffff00",
  },
];

const listEntity = [
  {
    label: "Persona Natural",
    src: "\uf007",
    id: 1,
    shape: "icon",
  },
  {
    label: "Persona Juridica",
    src: "\uf1ad",
    id: 2,
    shape: "icon",
  },
  {
    label: "Cuenta Custodia",
    src: assets.public.svg.iconTest,
    id: 3,
    shape: "image",
  },
  {
    label: "Contrato",
    src: "\uf1c1",
    id: 4,
    shape: "icon",
  },
];

const listTypeRelationship = [
  {
    label: "es accionista de",
    id: 1,
  },
  {
    label: "titular de la cuenta",
    id: 2,
  },
  {
    label: "tiene acesso a la information de",
    id: 3,
  },
  {
    label: "es el trustee de",
    id: 4,
  },
  {
    label: "es protector de",
    id: 5,
  },
  {
    label: "es director de",
    id: 6,
  },
];

export { listTypeRelationship, listColor, listEntity };
