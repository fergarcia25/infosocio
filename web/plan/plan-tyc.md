 Deep reseraching: https://baehost.com/ servicios de Hosting y Dominio.
 
 necesito subir el proyecto infosocio a un servidor de hosting de Baehost. debemos hacer y chequear todas las
 configuraciones disponible para que funcione perfecto sin errres. T
  ┃
  En Baehost disponemos de un dominio "infosocio.com" al cual debemos configurar sus Server Name, DNS, generar y activar un Certificado SSL desde el Cpanel de forma gratuita. 
  Configurar htacces, verificar ENV, datos de coneccion de api/config/database.php con los de la nueva base de datos (datos a definir).
ejec

Estado actual, el dominio no tiene los DNS configurados correctamente y logrande que apunte Baehost ya que actulamente apunta a otro Servidor de Hositng (HOSTINGER).

Por otro lado debemos configurar las rutas y url de la web. www.infosocio.com/ debe apuntar a la carpeta /web/ con la excepcion del slug "/infosocioadmin/ debe apuantar a la carpeta /admin.
Dentro de cada carpeta habra otro .htacces con las configuraciones requeridas por el framework de cada una.


 Busco, aplicando buenas practicas, opciones y sugerencias para hacerlo sin errores.