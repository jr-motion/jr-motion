# ikasi-feedback

Servicio que recibe los avisos de la app (botón «Akatsa?» e «Ideiak eta iruzkinak»)
y los reenvía por Telegram con @feedback_ikasi_bot. Node sin dependencias.

- Cloud Run: servicio `ikasi-feedback`, proyecto `andrea-colas-bot`, región `europe-southwest1`.
- Dirección: https://ikasi-feedback-kphk77lsva-no.a.run.app (POST `/feedback`).
- Variables de entorno: `TG_TOKEN` (token del bot) y `TG_CHAT`. El token **no** va en este repositorio.

Desplegar un cambio de código (desde esta carpeta, en Cloud Shell), sin tocar las variables:

    gcloud run deploy ikasi-feedback --source . --region europe-southwest1

Cambiar el token del bot:

    gcloud run services update ikasi-feedback --region europe-southwest1 --update-env-vars TG_TOKEN=<token nuevo>
