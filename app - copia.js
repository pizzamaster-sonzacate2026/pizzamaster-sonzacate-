// ============================================================
// APP.JS — Pizza Master Sonzacate
// ============================================================

let cart = []; // { key, nombre, detalle, precio, cantidad }

// ---------- Formateo ----------
const fmt = (n) => `$${n.toFixed(2)}`;

// ---------- Render del menú ----------
function renderMenu() {
  const container = document.getElementById("menu-container");
  const categorias = [...new Set(MENU.map((p) => p.categoria))];

  container.innerHTML = categorias
    .map((cat) => {
      const items = MENU.filter((p) => p.categoria === cat);
      return `
        <section class="menu-category">
          <h3>${cat}</h3>
          <div class="menu-grid">
            ${items.map(renderMenuItem).join("")}
          </div>
        </section>
      `;
    })
    .join("");

  // listeners
  document.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleAddToCart(btn.dataset.id));
  });
}

function renderMenuItem(item) {
  let controlsHtml = "";
  let priceHtml = "";

  if (item.tipo === "sabor-unico") {
    controlsHtml = `
      <select data-role="sabor1">
        ${item.opciones.map((o) => `<option value="${o}">${o}</option>`).join("")}
      </select>`;
    priceHtml = fmt(item.precioBase);
  } else if (item.tipo === "sabor-doble") {
    controlsHtml = `
      <select data-role="sabor1">
        ${item.opciones.map((o) => `<option value="${o}">${o}</option>`).join("")}
      </select>
      <select data-role="sabor2">
        ${item.opciones.map((o, i) => `<option value="${o}" ${i === 1 ? "selected" : ""}>${o}</option>`).join("")}
      </select>`;
    priceHtml = fmt(item.precioBase);
  } else if (item.tipo === "tamano") {
    controlsHtml = `
      <select data-role="tamano">
        ${item.tamanos.map((t) => `<option value="${t.nombre}" data-precio="${t.precio}">${t.nombre} — ${fmt(t.precio)}</option>`).join("")}
      </select>`;
    priceHtml = fmt(item.tamanos[0].precio);
  } else {
    priceHtml = fmt(item.precioBase);
  }

  return `
    <div class="menu-item" data-id="${item.id}">
      <h4>${item.nombre}</h4>
      ${controlsHtml}
      <div class="item-bottom">
        <span class="item-price">${priceHtml}</span>
        <button class="add-btn" data-id="${item.id}">Agregar</button>
      </div>
    </div>
  `;
}

// Actualiza el precio mostrado cuando cambian selects de tamaño
document.addEventListener("change", (e) => {
  if (e.target.dataset.role === "tamano") {
    const card = e.target.closest(".menu-item");
    const selected = e.target.selectedOptions[0];
    card.querySelector(".item-price").textContent = fmt(parseFloat(selected.dataset.precio));
  }
});

function handleAddToCart(id) {
  const item = MENU.find((p) => p.id === id);
  const card = document.querySelector(`.menu-item[data-id="${id}"]`);
  let nombre = item.nombre;
  let detalle = "";
  let precio = item.precioBase || 0;

  if (item.tipo === "sabor-unico") {
    const sabor = card.querySelector('[data-role="sabor1"]').value;
    detalle = sabor;
  } else if (item.tipo === "sabor-doble") {
    const s1 = card.querySelector('[data-role="sabor1"]').value;
    const s2 = card.querySelector('[data-role="sabor2"]').value;
    detalle = `${s1} + ${s2}`;
  } else if (item.tipo === "tamano") {
    const select = card.querySelector('[data-role="tamano"]');
    const selected = select.selectedOptions[0];
    detalle = selected.value;
    precio = parseFloat(selected.dataset.precio);
  }

  const key = `${id}|${detalle}`;
  const existing = cart.find((c) => c.key === key);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ key, nombre, detalle, precio, cantidad: 1 });
  }
  renderCart();
  openCart();
}

// ---------- Carrito ----------
function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (cart.length === 0) {
    itemsEl.innerHTML = `<p style="text-align:center;color:#999;margin-top:30px;">Tu carrito está vacío</p>`;
  } else {
    itemsEl.innerHTML = cart
      .map(
        (c, i) => `
        <div class="cart-line">
          <div>
            <div class="line-name">${c.cantidad} × ${c.nombre}</div>
            ${c.detalle ? `<div class="line-detail">${c.detalle}</div>` : ""}
            <button class="remove-line" data-i="${i}">Quitar</button>
          </div>
          <div class="line-price">${fmt(c.precio * c.cantidad)}</div>
        </div>
      `
      )
      .join("");
  }

  const total = cart.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
  const count = cart.reduce((sum, c) => sum + c.cantidad, 0);
  totalEl.textContent = fmt(total);
  countEl.textContent = count;
  checkoutBtn.disabled = cart.length === 0;

  document.querySelectorAll(".remove-line").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.splice(parseInt(btn.dataset.i), 1);
      renderCart();
    });
  });
}

function openCart() {
  document.getElementById("cart-panel").classList.add("open");
  document.getElementById("cart-overlay").classList.add("show");
}
function closeCart() {
  document.getElementById("cart-panel").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("show");
}

document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

// ---------- Promo del día ----------
function renderPromoHoy() {
  const hoy = new Date().getDay(); // 0 = domingo
  const promo = PROMOS_DIA[hoy];
  const el = document.getElementById("promo-hoy");
  el.innerHTML = `
    <div class="promo-day">PROMO DE HOY · ${promo.dia.toUpperCase()}</div>
    <div class="promo-desc">${promo.descripcion}</div>
    <div class="promo-price">${fmt(promo.precio)}</div>
    <button id="add-promo-hoy">Agregar al pedido</button>
  `;
  document.getElementById("add-promo-hoy").addEventListener("click", () => {
    const key = `promo-dia|${promo.nombre}`;
    const existing = cart.find((c) => c.key === key);
    if (existing) existing.cantidad += 1;
    else cart.push({ key, nombre: promo.nombre, detalle: promo.descripcion, precio: promo.precio, cantidad: 1 });
    renderCart();
    openCart();
  });
}

// ---------- Checkout ----------
const checkoutModal = document.getElementById("checkout-modal");
const checkoutOverlay = document.getElementById("checkout-overlay");

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  openCheckout();
});
document.getElementById("close-checkout").addEventListener("click", closeCheckout);
checkoutOverlay.addEventListener("click", closeCheckout);

function openCheckout() {
  renderCheckoutSummary();
  checkoutModal.classList.add("show");
  checkoutOverlay.classList.add("show");
}
function closeCheckout() {
  checkoutModal.classList.remove("show");
  checkoutOverlay.classList.remove("show");
}

function renderCheckoutSummary() {
  const summaryEl = document.getElementById("checkout-items-summary");
  const totalEl = document.getElementById("checkout-total");
  summaryEl.innerHTML = cart
    .map((c) => `<div>${c.cantidad} × ${c.nombre}${c.detalle ? " (" + c.detalle + ")" : ""} — ${fmt(c.precio * c.cantidad)}</div>`)
    .join("");
  const total = cart.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
  totalEl.textContent = fmt(total);
}

// Mostrar/ocultar campo de dirección según método de entrega
document.querySelectorAll('input[name="entrega"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    document.getElementById("direccion-wrap").style.display =
      e.target.value === "Domicilio" ? "flex" : "none";
  });
});

// Cambiar texto del botón según método de pago
document.querySelectorAll('input[name="pago"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const btn = document.getElementById("submit-order-btn");
    btn.textContent =
      e.target.value === "tarjeta" ? "Pagar con tarjeta" : "Enviar pedido por WhatsApp";
  });
});

// ---------- Envío del pedido ----------
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const errorEl = document.getElementById("checkout-error");
  errorEl.textContent = "";

  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const entrega = form.entrega.value;
  const direccion = form.direccion.value.trim();
  const notas = form.notas.value.trim();
  const pago = form.pago.value;

  if (!nombre || !telefono) {
    errorEl.textContent = "Completa tu nombre y teléfono.";
    return;
  }
  if (entrega === "Domicilio" && !direccion) {
    errorEl.textContent = "Ingresa la dirección de entrega.";
    return;
  }
  if (cart.length === 0) {
    errorEl.textContent = "Tu carrito está vacío.";
    return;
  }

  const total = cart.reduce((sum, c) => sum + c.precio * c.cantidad, 0);

  if (pago === "whatsapp") {
    enviarPorWhatsApp({ nombre, telefono, entrega, direccion, notas, total });
  } else {
    await pagarConTarjeta({ nombre, telefono, entrega, direccion, notas, total });
  }
});

function enviarPorWhatsApp({ nombre, telefono, entrega, direccion, notas, total }) {
  let msg = `*NUEVO PEDIDO — PIZZA MASTER SONZACATE*\n\n`;
  msg += `*Cliente:* ${nombre}\n*Teléfono:* ${telefono}\n`;
  msg += `*Entrega:* ${entrega}\n`;
  if (entrega === "Domicilio") msg += `*Dirección:* ${direccion}\n`;
  msg += `\n*Pedido:*\n`;
  cart.forEach((c) => {
    msg += `- ${c.cantidad} × ${c.nombre}${c.detalle ? " (" + c.detalle + ")" : ""} — ${fmt(c.precio * c.cantidad)}\n`;
  });
  msg += `\n*Total: ${fmt(total)}*\n`;
  if (notas) msg += `\n*Notas:* ${notas}\n`;
  msg += `\n*Pago:* Efectivo / a confirmar por WhatsApp`;

  const url = `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  cart = [];
  renderCart();
  closeCheckout();
}

async function pagarConTarjeta({ nombre, telefono, entrega, direccion, notas, total }) {
  const btn = document.getElementById("submit-order-btn");
  const errorEl = document.getElementById("checkout-error");
  btn.disabled = true;
  btn.textContent = "Redirigiendo a pago seguro...";

  try {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        customer: { nombre, telefono, entrega, direccion, notas },
      }),
    });

    if (!res.ok) throw new Error("No se pudo crear la sesión de pago");
    const data = await res.json();
    window.location = data.url; // redirige a Stripe Checkout
  } catch (err) {
    errorEl.textContent =
      "El pago con tarjeta aún no está activado en este sitio. Usa 'Efectivo / WhatsApp' por ahora.";
    btn.disabled = false;
    btn.textContent = "Pagar con tarjeta";
  }
}

// ---------- Init ----------
renderMenu();
renderCart();
renderPromoHoy();
