# CursoAngular
Some exercises with angular




#Comandos basicos angular

##Crear una nueva aplicacion con el archivo app.module.ts
ng new proyecto001 --standalone=false
or
ng new proyecto001 --no-standalone --routing --ssr=false

##Creacion de componentes
ng generate component nombre_componente

##Iniciar aplicacion
ng serve -o

##parar depuracion
presionar la combinación de teclas Ctrl + C

##Error:I can't install any node packages with npm install
npm install -g npm
npm cache clean
npm update
npm install
