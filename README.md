# CursoAngular
Some exercises with angular




#Comandos basicos angular

##Crear una nueva aplicacion con el archivo app.module.ts
ng new proyecto001 --standalone=false
or
ng new proyecto001 --no-standalone --routing --ssr=false

##Creacion de componentes
ng generate component nombre_componente

##Creacion de modulos
ng generate module elementos

##Crear un componente almacenado en algun modulo
ng generate component nombre_modulo/nombre_componente

##Crear un proyecto con rutas 
ng new proyecto011 --routing

##Crear un servicio
ng generate service nombre_servicio

##Crear un pipe
ng generate pipe nombre_pipe

##Iniciar aplicacion
ng serve -o

##parar depuracion
presionar la combinación de teclas Ctrl + C

##Error:I can't install any node packages with npm install
npm install -g npm
npm cache clean
npm update
npm install

#-----------
##Compilacion y despliegue de una aplicacion angular en un servidor de internet
ng build 
#Luego de este proceso se genera una carpeta llamada 'dist'
#----------
#Subir una aplicación Angular a una subcarpeta de nuestro servidor.
#Ejemplo: http://ejerciciosAngular.com/angular/proyecto01/
C:\ejerciciosAngular\proyecto01>ng build --base-href=/ejerciciosAngular/proyecto01/

#-----------
## Angular Material
#Instalar angular material
ng add @angular/material

#Crear la barra lateral
ng generate @angular/material:material-nav --name barraLateral

## T E M A S
#Proyecto 016 --> TypeScript
#Proyecto 018 --> Angular Material