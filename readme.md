# BoilerPlate basico con Handlebars y Webpack
Compila html css javascript e imagenes de varios formatos  

Listo para fincionar  
Use:
- clonar
- npm install //instala las dependencias
- cambiar el remoto de GutHub (importante)
- npm start //for dev server
- npm run build //para compilar

La estrucutra de directorios esta orientada a facilitar la division de codigo usando HTML,JavaScript y CSS  
Dentro de la carpeta **partials** se deben crear los distinos componentes a utilizar en el desarrollo,  
creando dentro una carpeta que contenga un archivo HTML con **ejemplo.handlebars**, tambien puede contener sus propios CSS y jS. 

> Cada archivo JS debe importarse en archivo **index.js** de la carpeta **src** para que los mismo se incluyan al realizarce el build.   

> Dicho archivo debe importarse en el **index.handlebars** de la carpeta **src.** de la siguiente manera  
**{{ > ejemplo.handlebars}}**. 

**Pasos seguidos para la creacion desde cero**  

## Ejecutar en linea de comandos  
```
- npm init
- git init
- crear archivo .gitignore
```
##instalar las siguientes librerias
- npm i webpack (empaquetador de objetos)
- npm i webpack-cli (lo usa webpack)
- npm i webpack-dev-server
- crear archivo: webpack.config.js (contiene la info para el build de la aplicacion)

**Instalar plugins**  
npm i html-webpack-plugins (incluye los html en el build)

**Instalar loaders:** 
- npm i style-loader (incluye las hojas de estilos en el build, este loader no es compatible con - mini-css-webpack-loader)
- npm i css-loader (incluye lo css en el build)
- npm i mini-css-extract-plugin (separa los css)
- npm i file-loader (carga las imagenes)
- npm i image-webpack-loader (reduce imagenes y otras opciones)

**Ejecutar:**  
- npx webpack (crea el build unicamente)  
- npx webpack-serve (puede ser tambien webpack s) (crea un servidor en memoria que ejecuta la app en cada cambio de codigo, este metodo no crea el build)  

## **Este el codigo que debe contener el archivo webpack.config.js**
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),/* name of build folder */
        filename: 'bundle.js',/* name of output file on build */
    },
    devServer: {
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,/* css file extract in build */
                    'css-loader',
                    'sass-loader'/* sass files */
                    /* 'style-loader', */
                ]
            },

            {
                test:/\.handlebars/,
                loader: 'handlebars-loader'
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,/* photo parser and include in build */
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/images',
                            useRelativePath: true
                        }
                    },
                    {
                        loader: 'image-webpack-loader',/* photo quality reducer */
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.handlebars',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'bundle.css',

        })
    ]
}
```

