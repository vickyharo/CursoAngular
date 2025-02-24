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
