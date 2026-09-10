// ============================================================
// DATOS DEL MENÚ — PIZZA MASTER SONZACATE
// Edita aquí precios, sabores o combos. El sitio se actualiza solo.
// ============================================================

const SABORES_PIZZA = [
  "Chile verde y cebolla",
  "Champiñones",
  "Chorizo",
  "Solo piña",
  "Solo queso",
  "Salchicha",
  "Jalapeño",
  "Jamón",
  "Peperoni",
  "Salami",
];

const TAMANOS_ESPECIALIDAD = [
  { nombre: "Personal", precio: 3.75 },
  { nombre: "Grande", precio: 8.25 },
  { nombre: "Familiar", precio: 9.50 },
  { nombre: "Gigante", precio: 10.25 },
  { nombre: "Cuadrada", precio: 12.00 },
];

// Promoción fija por día (lunes -> domingo). index 0 = domingo (igual que JS Date.getDay())
const PROMOS_DIA = [
  { dia: "Domingo", nombre: "Promo Domingo", descripcion: "Pizza de 8 porciones de 1 ingrediente + palitroque + bebida 1.5 L", precio: 8.75 },
  { dia: "Lunes", nombre: "Promo Lunes", descripcion: "Pizza de 8 porciones de 1 ingrediente + bebida 1.5 L", precio: 6.50 },
  { dia: "Martes", nombre: "Promo Martes", descripcion: "Pizza de 10 porciones de 1 ingrediente + bebida 1.5 L", precio: 8.50 },
  { dia: "Miércoles", nombre: "Promo Miércoles", descripcion: "2 pizzas de 10 porciones de 1 ingrediente + palitroque + bebida 1.5 L", precio: 15.75 },
  { dia: "Jueves", nombre: "Promo Jueves", descripcion: "Pizza de 10 porciones de 1 ingrediente + palitroque + bebida 1.5 L", precio: 9.75 },
  { dia: "Viernes", nombre: "Promo Viernes", descripcion: "2 pizzas de 8 porciones de 1 ingrediente + palitroque + bebida 1.5 L", precio: 13.75 },
  { dia: "Sábado", nombre: "Promo Sábado", descripcion: "2 pizzas de 8 porciones c/u + bebida 1.5 L", precio: 11.50 },
];

const MENU = [
  // ---------------- PIZZAS INDIVIDUALES $5 ----------------
  {
    id: "pizza-individual",
    categoria: "Pizzas de 8 porciones ($5 c/u)",
    nombre: "Pizza individual (elige tu sabor)",
    precioBase: 5.00,
    tipo: "sabor-unico",
    opciones: SABORES_PIZZA,
  },
  {
    id: "pizza-doble-sabor",
    categoria: "Pizzas de 8 porciones ($5 c/u)",
    nombre: "Pizza doble sabor (8 porciones, 2 ingredientes)",
    precioBase: 5.00,
    tipo: "sabor-doble",
    opciones: SABORES_PIZZA,
  },
  {
    id: "calzone",
    categoria: "Pizzas de 8 porciones ($5 c/u)",
    nombre: "Pizza Calzone Master",
    precioBase: 3.75,
    tipo: "sabor-unico",
    opciones: SABORES_PIZZA,
  },

  // ---------------- ESPECIALIDADES ----------------
  {
    id: "seis-carnes",
    categoria: "Pizzas de especialidad",
    nombre: "Pizza de Seis Carnes (jamón, salami, peperoni, tocino, salchicha y carne)",
    tipo: "tamano",
    tamanos: TAMANOS_ESPECIALIDAD,
  },
  {
    id: "hawaiana",
    categoria: "Pizzas de especialidad",
    nombre: "Pizza Hawaiana",
    tipo: "tamano",
    tamanos: TAMANOS_ESPECIALIDAD,
  },

  // ---------------- ENTRADAS ----------------
  {
    id: "nuditos",
    categoria: "Entradas",
    nombre: "Nuditos",
    tipo: "tamano",
    tamanos: [
      { nombre: "8 unidades", precio: 2.00 },
      { nombre: "12 unidades", precio: 2.75 },
    ],
  },
  {
    id: "palitroques",
    categoria: "Entradas",
    nombre: "Palitroques",
    tipo: "tamano",
    tamanos: [
      { nombre: "6 unidades", precio: 2.25 },
      { nombre: "12 unidades", precio: 3.50 },
    ],
  },
  {
    id: "pan-ajo",
    categoria: "Entradas",
    nombre: "Pan con ajo y queso",
    tipo: "tamano",
    tamanos: [
      { nombre: "4 unidades", precio: 3.00 },
      { nombre: "6 unidades", precio: 3.50 },
    ],
  },

  // ---------------- BEBIDAS ----------------
  {
    id: "soda-normal",
    categoria: "Bebidas",
    nombre: "Soda normal",
    tipo: "simple",
    precioBase: 0.60,
  },
  {
    id: "soda-lata",
    categoria: "Bebidas",
    nombre: "Soda en lata",
    tipo: "simple",
    precioBase: 0.75,
  },
  {
    id: "soda-1.5",
    categoria: "Bebidas",
    nombre: "Soda de 1.5 LT",
    tipo: "simple",
    precioBase: 1.50,
  },
  {
    id: "pichel",
    categoria: "Bebidas",
    nombre: "Pichel de soda",
    tipo: "simple",
    precioBase: 1.99,
  },

  // ---------------- COMBOS Y PROMOCIONES ----------------
  {
    id: "combo-gigante-pan",
    categoria: "Combos y promociones",
    nombre: "Pizza gigante 12 porciones + pan con ajo y queso + bebida 1.5 L",
    tipo: "simple",
    precioBase: 12.50,
  },
  {
    id: "combo-8p-pan",
    categoria: "Combos y promociones",
    nombre: "Pizza de 8 porciones de 1 ingrediente + 4 pan con ajo y queso + bebida 1.25 L",
    tipo: "simple",
    precioBase: 9.50,
  },
  {
    id: "full-master-1",
    categoria: "Combos y promociones",
    nombre: "Full Master: pizza de 12 porciones + bebida 1.25 L",
    tipo: "simple",
    precioBase: 10.50,
  },
  {
    id: "combo-2-pizzas-pan",
    categoria: "Combos y promociones",
    nombre: "2 pizzas de 10 porciones c/u + 4 pan con ajo y queso + bebida 1.25 L",
    tipo: "simple",
    precioBase: 17.50,
  },
  {
    id: "super-promo-12",
    categoria: "Combos y promociones",
    nombre: "2 pizzas de 10 porciones de 1 ingrediente c/u",
    tipo: "simple",
    precioBase: 12.00,
  },
  {
    id: "super-promo-1499",
    categoria: "Combos y promociones",
    nombre: "2 pizzas de 10 porciones (champiñones + peperoni) + soda 1.5 L",
    tipo: "simple",
    precioBase: 14.99,
  },
  {
    id: "champinones-899",
    categoria: "Combos y promociones",
    nombre: "Pizza de 10 porciones de champiñones + bebida 1.5 L",
    tipo: "simple",
    precioBase: 8.99,
  },
  {
    id: "picante-850",
    categoria: "Combos y promociones",
    nombre: "Pizza picante: 10 porciones de jalapeño y peperoni + bebida 1.5 L",
    tipo: "simple",
    precioBase: 8.50,
  },
  {
    id: "restaurante-1450",
    categoria: "Combos y promociones",
    nombre: "Pizza de 10 porciones + bebida + 8 alitas + papas, aderezo y vegetales",
    tipo: "simple",
    precioBase: 14.50,
  },
  {
    id: "gigante-alitas-1850",
    categoria: "Combos y promociones",
    nombre: "Pizza gigante 12 porciones + 8 alitas BBQ + papas, vegetales, aderezo + pan con ajo y bebida 1.5 L",
    tipo: "simple",
    precioBase: 18.50,
  },
  {
    id: "full-master-2050",
    categoria: "Combos y promociones",
    nombre: "Full Master: 2 pizzas de 8 porciones c/u + 4 pan con ajo y queso + 8 alitas + bebida 1.25 L",
    tipo: "simple",
    precioBase: 20.50,
  },
  {
    id: "promo-alitas-1100",
    categoria: "Combos y promociones",
    nombre: "Pizza de 8 porciones + orden de alitas (8 unidades)",
    tipo: "simple",
    precioBase: 11.00,
  },
  {
    id: "combo-alitas-600",
    categoria: "Combos y promociones",
    nombre: "Super combo de alitas: 8 alitas + papas + aderezo + vegetales",
    tipo: "simple",
    precioBase: 6.00,
  },
  {
    id: "lasagna-500",
    categoria: "Combos y promociones",
    nombre: "Lasaña de pollo + pan con ajo + bebida",
    tipo: "simple",
    precioBase: 5.00,
  },
];

// Info del negocio
const NEGOCIO = {
  nombre: "Pizza Master Sonzacate",
  telefono: "2442-4897",
  whatsapp: "50370164623", // con código de país 503 (El Salvador), sin espacios ni +
  facebook: "Pizza Master Sonzacate",
  moneda: "USD",
};
