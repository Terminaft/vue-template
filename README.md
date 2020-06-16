# VKMix Chrome extension

## Начало работы

Необходимо создать файлы конфига `secrets.development.js` и `secrets.production.js` с содержимым:

```js
export default {
    domain: 'PROTOCOL://DOMAIN.ZONE'
}
```

## Установка
1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Run `npm run start` - для разработки
5. Run `npm run production` - для сборки

## Установка расширения
1. Access `chrome://extensions/`
2. Check `Developer mode`
3. Click on `Load unpacked extension`
4. Select the `build` folder.