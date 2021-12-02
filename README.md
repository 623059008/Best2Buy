# Best2buy Backend and Frontend

Best2buy Website

powered by eggjs + mysql and jquery/html/css3


## Demo

Best2buy: [http://storygame.top:7001/index.html]


## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

- Frontend part: /app/Best2BuyFrontend
- Backend part: /app/controller & /app/service
- Backend router: /app/router.js
- Database: Best2buy.sql

### mysql connection
change mysql setting in config/config.default.js


### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/index.htmls
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
