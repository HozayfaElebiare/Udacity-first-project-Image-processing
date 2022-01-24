# Udacity project 1 : Image processing API

This is my Code  for Image processing API project
## Outline

 - [Installation](#installation)
 - [APIs | Endpoints](#apis)
 - [Quick Reference](#quick-reference)
 - [Deploying to Heroku](#deploying)

## Libraries

This project is using several libraries and frameworks:

 - [express ^4.17.2](https://expressjs.com/) - Nodejs Framework
 - [sharp ^0.29.3](https://sharp.pixelplumbing.com/) - Image processing lib


## Installation

### Dependencies

Make sure you have node and Git installed. Type into the terminal:

```bash
$ clone HozayfaElebiare/Udacity-first-project-Image-processing
```

Then type into the terminal:

```bash
$ npm i
```




### GitHub

This is my  [github repo](HozayfaElebiare/Udacity-first-project-Image-processing)



### Running

Once you are setup the project you can check these :
```json
"scripts": {
        "dev": "nodemon  --exec ts-node ./src/index.ts",
        "build": "npx tsc",
        "start:prod": "npm run build && node build/index.js",
        "lint": "eslint . --ext .ts",
        "lint:fix": "eslint --fix",
        "format": "prettier --write './src/index.ts'",
        "jasmine": "jasmine",
        "test": "npm run build && npm run jasmine",
        "prettier": "prettier --config .prettierrc {,!(node_modules)/**/}*.ts --write"
    },
```

1. Format Code 

```bash
$ npm run prettier
```
OR
```bash
$ npm run prettier
```



2. Check error in syntacs 
```bash
$ npm run lint
```
Or Fix By 
```bash
$ npm run lint:fix
```


3. Run the app
```bash
$ npm run dev
```

This starts your API application at <http://localhost:3000> so you
can try it locally. Try going to <http://localhost:3000/api/v1/sessions>.



5. run jasmin and supertest
```bash
$ npm run test
```


## APIs

### Root

http://localhost:3000/

 - return Json about my project and about me 
``` javascript
res.status(200).json({
    Project: 'Udacity first project',
    projectName: 'Image processing',
    author: 'Mahmoud Elebiare',
    authorEmail: 'mahmoudelebiare@gmail.com',
  })
```

### API entry point
http://localhost:3000/api
``` javascript
res.status(200).send('api working navigate to /api/images/ to start')
```



### image processing api
http://localhost:3000/api/images?filename=fjord&width=350&height=300

``` ruby
router.get('/', imageProcess)
```

#### There are 3 Parameters (filename, width, height )
``` javascript
  const { filename, width, height } = query
  const widthInt = parseInt(width as string)
  const heightInt = parseInt(height as string)
```

### Define function use
you can use this api by at least one valid param (filename)
and the others parameters are optional if you want to resize one of stored images 

