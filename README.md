# MegaElixir - Bot

[![time tracker](https://wakatime.com/badge/github/DavichoStar/megaelixir.svg)](https://wakatime.com/badge/github/DavichoStar/megaelixir)

Bot privado de tickets para el servidor de Discord MegaElixir.

## Pre-requisitos de instalación

- Node.JS 15.x o superior instalado
- Git (cualquier versión) instalado.
- Bash o Powershell para ejecucion de comandos al SO.

## Instalacion

- Clona este repositorio:

```bash
git clone https://github.com/DavichoStar/megaelixir.git
```

- Estando en la raiz del proyecto, instala las dependencias mediante npm:

```bash
npm install
```

### En Desarrollo

- Crea un archivo .env en la raiz del proyecto y completalo con las variables de entorno.
- Corre el comando de desarrollo `npm run dev`
- Puedes correrlo con nodemom `npm run dev:wath`

### En Produción

- Agrega las variables de entorno a tu sistema operativo con los comandos corespondiente.
- Compila con `npm run build`
- Ejecuta `npm start` para iniciar el bot.
- Puedes instalar pm2 con `npm install -g pm2`
- Agrega a producción con `pm2 start ./dist/Main.js --name "MegaElixir"`

## Variables de Entorno

- \* **TOKEN_BOT**: Se obtiene desde el [Portal de Desarrolladores](https://discord.com/developers/applications/) de Discord.
- \* **PREFIX_BOT**: El prefijo con el cual se ejecutarán los comandos.
- **CHANNEL_ANNOUNCEMENT**: Canal donde se encuentra el mensaje con reacción del paquete: Anuncio.
- **CHANNEL_SERVER**: Canal donde se encuentra el mensaje con reacción del paquete: Servidor
- **CHANNEL_BOT**: Canal donde se encuentra el mensaje con reacción del paquete: Bot
- **EMOJI_ANNOUNCEMENT**: Emoji que escuchará del mensaje del paquete: Anuncio.
- **EMOJI_SERVER**: Emoji que escuchará del mensaje del paquete: Servidor
- **EMOJI_BOT**: Emoji que escuchará del mensaje del paquete: Bot

___* Significa que es una variable obligatoria___
