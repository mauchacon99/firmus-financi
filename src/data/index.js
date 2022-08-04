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
    icon: "\uf007",
    id: 1,
  },
  {
    label: "Persona Juridica",
    icon: "\uf1ad",
    id: 2,
  },
  {
    label: "Cuenta Custodia",
    icon: "\uf0d6",
    id: 3,
  },
  {
    label: "Contrato",
    icon: "\uf1c1",
    id: 4,
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
