// ============================================================
// api/create-checkout-session.js
// Función serverless (Vercel) — crea una sesión de pago con Stripe.
//
// REQUIERE: variable de entorno STRIPE_SECRET_KEY configurada en Vercel
// (Project Settings → Environment Variables). Sin esa clave, esta
// función responderá con error y el sitio usará automáticamente
// el flujo de WhatsApp como respaldo.
// ============================================================

const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    res.status(500).json({ error: "Stripe no está configurado (falta STRIPE_SECRET_KEY)" });
    return;
  }

  const stripe = Stripe(secretKey);

  try {
    const { items, customer } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ error: "Carrito vacío" });
      return;
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.detalle ? `${item.nombre} (${item.detalle})` : item.nombre,
        },
        unit_amount: Math.round(item.precio * 100), // centavos
      },
      quantity: item.cantidad,
    }));

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/?pago=exitoso`,
      cancel_url: `${origin}/?pago=cancelado`,
      phone_number_collection: { enabled: true },
      shipping_address_collection:
        customer.entrega === "Domicilio" ? { allowed_countries: ["SV"] } : undefined,
      metadata: {
        cliente: customer.nombre,
        telefono: customer.telefono,
        entrega: customer.entrega,
        direccion: customer.direccion || "",
        notas: customer.notas || "",
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
