## Curso de Angular

# Angular CLI

# Crear una aplicación de Angular 
ng new proyecto001

--Crear un nuevo proyecto con rutas
ng new proyecto001 --routing

--Especificar el prefijo a los selectores generados mediante el parámetro --prefix:
ng new proyecto001 --prefix 

# Ejecutar una aplicación Angular en forma local
ng serve -o

# Ejecutar una aplicación Angular en forma productiva
ng serve -o --configuration production

# Crear componentes
ng generate component dado
--force (alias: -f) Forzar la sobrescritura de los archivos existentes (se borra la componente anterior que tiene el mismo nombre)

# Crear módulos
ng generate module elementos

# Crear servicios
ng generate service articulos

# Crear tuberías
ng generate pipe letras

# Crear clases
ng generate class articulo

# Crear interfaces
 ng generate interface venta

 # Crear enum
  ng generate enum operaciones

# Desplegar aplicaciones en producción
ng build
--Luego de este proceso se genera una carpeta llamada 'dist' que contiene todos los archivos que debemos subir a nuestro servidor de Internet
# Subir una aplicación Angular a una subcarpeta de nuestro servidor.
--Si nuestra aplicación Angular no se ejecutará en la raíz de nuestro servidor de Internet, el proceso de compilación es diferente.
ng build --base-href=/angular/proyecto016/
