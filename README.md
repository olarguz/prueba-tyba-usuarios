# Apicacion de registro de usuarios.

Esta aplicacion se hace como una prueba de backend para Tyba.

## Uso.

La aplicacion permite realizar las siguientes funcionalidades.

En el directorio postman se ha agregado una colección cuya finalidad es facilitar el uso de los comandos.

### Registro de usuarios

Este endpoint es creado para que se puedan crear usuarios nuevos para la aplicación.
La firma del endpoint se presenta a continuación:

```
http://{url}:{port}/user/create
```

Este método se consume por POST y en el body tiene la siguiente estructura:

```
{
    "username": "juruga",
    "name": "Juanita Rupertina Garay",
    "pass": "passJuruga"
}
```

En donde **username** es un valor único en la base de datos, por esta razón si trata de crear
un segundo usuario con el mismo username, la aplicación responderá con un error,  **name** es un nombre
corriente de una persona y **pass** corresponde a la contraseña que use el usuario para logearse al sistema.

### Login de usuario.

Este endpoint es usado para que un usuario se pueda logear en el sistema.
La firma del endpoint se presenta a continuacion:

```
http://{url}:{port}/user/login
```

Este método se consume por POST y en el body tiene la siguiente estructura:

```
{
    "username": "juruga",
    "pass": "passJuruga"
}
```

El valor de **username** y **pass** deben estar registrados en el sistema para permitir que el usuario se
pueda logear, además la aplicación verifica si el usuario no está logeado previamente evitando que el usuario se
logee en multiples ocaciones. Si el usuario se loguea en forma adecuada, el servicio responde de la siguiente manera:

{
    "status": "OK",
    "data": {
        "token": "58395a58-5b4a-4846-96a1-ae11b4f6b8cf",
        "value": "User juruga logged in now."
    }
}

Donde el valor del token es necesario, para que el servicio permita realizar otras operaciones.

### Logout de usuario.

Este endpoint es usado para que un usuario se pueda deslogear del sistema.
La firma del endpoint se presenta a continuacion:

```
http://{url}:{port}/user/logout
```

Este método se consume por POST y en el body tiene la siguiente estructura:

{
    "username": "juruga",
    "pass": "passJuruga",
    "token": "58395a58-5b4a-4846-96a1-ae11b4f6b8cf"
}

Donde el valor de **username**, **pass** deben estar registrados previamente en la base de datos, el valor de **token** debe corresponder al que el servicio respondió en el momento de logearse, sin este valor el servicio responderá un error, en caso contrario el usuairo será correctamente deslogeado y quedará bloqueado para realizar mas operaciones en el servicio.

### Consulta de restaurantes por ciudad.

```
http://[url]:[port]/user/restaurants
```

Este método se consume por POST y en el body se

### Consulta de registro historico de usuario.

Este endpoint es usado para que se pueda ver el histórico de operaciones realizadas por un usuario en el sistema.
La firma del endpoint se presenta a continuacion:

```
http://[url]:[port]/user/history/:username
```

Este método se consume por **GET**, la variable **username** debe ser reempladad por un usuario válido, en caso que se pase un usuario no valido la respuesta obtenida contendrá un valor de un arreglo vació en el campo data.

## Developers
* [Olmedo Arcila Guzmán](https://github.com/olarguz)