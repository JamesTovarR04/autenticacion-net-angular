## Requiere

- SDK .NET 9
- Visual Studio 2022
- Node 18+
- SQLServer

## Configurar e iniciar Backend

1. Abrir `backend-net/IdentityAPI.sln` con **Visual Studio 2022**
2. Cambia las cadenas de conexión a la base de datos en el archivo `backend-net/IdentityAPI/appsettings.json`

```json
...
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AppTest;Trusted_Connection=False;User ID=sa;Password=Desarrollador2050;MultipleActiveResultSets=true;TrustServerCertificate=true"
}
...
```

3. Ejecuta las migraciones desde la **Consola de Administración de Paquetes**:

```bash
PM> Update-Database
```

1. Abrir `backend-net/IdentityAPI.sln` con **Visual Studio 2022**
2. Inciar la ejeución del proyecto **IdentityAPI**

## Configurar e iniciar Frontend

1. Abre una consola en la carpeta `frontend-angular/`
2. Instala las dependencias ejecutando:

```bash
npm install
```

3. Corre el servidor ejecutando:

```bash
npm start
```
