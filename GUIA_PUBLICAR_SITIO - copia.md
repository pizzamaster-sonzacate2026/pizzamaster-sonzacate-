# Guía para publicar el sitio de Pizza Master Sonzacate

Este sitio ya funciona para recibir pedidos por WhatsApp sin ningún paso
adicional. Para publicarlo en internet (con dominio propio) y activar los
pagos con tarjeta, sigue esta guía en orden. No necesitas saber programar.

---

## PARTE 1 — Publicar el sitio en internet (gratis)

Usaremos **Vercel**, un servicio gratuito para publicar sitios como este.

1. Crea una cuenta en https://vercel.com (puedes usar tu correo o GitHub).
2. Crea una cuenta gratuita en https://github.com si no tienes una.
3. Sube la carpeta de este proyecto a un repositorio nuevo en GitHub:
   - Entra a github.com → "New repository" → nómbralo `pizza-master-sonzacate`.
   - Sube todos los archivos de esta carpeta (botón "uploading an existing file").
4. En Vercel, haz clic en "Add New Project" → "Import" y selecciona el
   repositorio que acabas de crear.
5. Deja la configuración por defecto y haz clic en "Deploy".
6. En unos 30-60 segundos tendrás una URL como:
   `https://pizza-master-sonzacate.vercel.app`

¡Ya está en línea! Cualquier persona puede entrar y hacer un pedido por
WhatsApp desde esa dirección.

---

## PARTE 2 — Comprar un dominio propio (ej: pizzamastersonzacate.com)

1. Compra el dominio en un sitio como https://www.namecheap.com o
   https://domains.google (cuesta aprox. $10-15 al año).
2. En Vercel, entra a tu proyecto → pestaña "Settings" → "Domains".
3. Escribe tu dominio nuevo y sigue las instrucciones: Vercel te dará
   1-2 registros DNS (CNAME o A) que debes copiar dentro del panel de
   tu proveedor de dominio (Namecheap/Google Domains).
4. Espera de 10 minutos a un par de horas a que el dominio conecte.

---

## PARTE 3 — Activar pagos con tarjeta (Stripe)

Mientras no completes esta parte, el sitio funciona perfectamente con la
opción **"Efectivo / confirmar por WhatsApp"**. Los pagos con tarjeta son
opcionales y se activan así:

1. Crea una cuenta gratuita en https://dashboard.stripe.com/register
2. Completa los datos de tu negocio (te pedirán datos personales/DUI y
   una cuenta bancaria donde recibir el dinero — esto es normal, Stripe
   lo pide para poder pagarte).
3. Una vez dentro, ve a **Developers → API keys**.
4. Copia la clave que empieza con `sk_live_...` (o `sk_test_...` para
   hacer pruebas antes de cobrar de verdad).
5. En Vercel, entra a tu proyecto → **Settings → Environment Variables**.
6. Agrega una variable:
   - Nombre: `STRIPE_SECRET_KEY`
   - Valor: la clave que copiaste de Stripe
7. Vuelve a la pestaña "Deployments" y haz clic en "Redeploy" para que
   el sitio tome la nueva configuración.

Desde ese momento, la opción **"Pagar ahora con tarjeta"** en el sitio
funcionará de verdad: al cliente lo llevará a una pantalla segura de
Stripe para pagar, y el dinero llegará a tu cuenta bancaria en unos días
(Stripe cobra una pequeña comisión por transacción, alrededor de 2.9% +
$0.30, estándar en la industria).

> Nota: revisa los requisitos de Stripe para negocios en El Salvador —
> en algunos países Stripe aún no soporta pagos directos y puede requerir
> una entidad intermediaria o usar PayPal Business como alternativa. Si
> Stripe no está disponible para tu país, dímelo y adapto el sitio para
> usar **PayPal Checkout** en su lugar, que funciona de forma similar.

---

## PARTE 4 — Cómo recibirás los pedidos

- **Pedidos por WhatsApp:** el cliente completa su pedido y el sitio abre
  WhatsApp automáticamente con un mensaje ya redactado (productos,
  cantidades, total, dirección). Solo debes tocar "Enviar".
- **Pedidos pagados con tarjeta:** aparecerán en tu panel de Stripe
  (dashboard.stripe.com → Pagos), con el nombre, teléfono y notas del
  cliente. Te recomiendo revisar el panel de Stripe periódicamente o
  activar las notificaciones por correo de Stripe (vienen activadas por
  defecto).

---

## PARTE 5 — Cómo editar el menú o los precios

Todo el menú vive en el archivo `menu-data.js`. Puedes abrirlo y cambiar
nombres, precios o agregar productos siguiendo el mismo formato de los
que ya existen. Después de editar, sube el cambio a GitHub y Vercel
publicará la actualización automáticamente en 1-2 minutos.

---

## ¿Dudas o quieres que te ayude a hacer algún paso?

Puedo ayudarte a:
- Revisar que Stripe funcione en El Salvador y, si no, integrar PayPal.
- Agregar más fotos reales de las pizzas al sitio.
- Conectar notificaciones automáticas por WhatsApp cuando llega un pago
  con tarjeta (requiere un paso técnico adicional con Twilio).
- Hacer los cambios de menú por ti cuando lo necesites.

Solo dime qué necesitas.
