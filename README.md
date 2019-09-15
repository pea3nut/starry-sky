# starry-sky
:night_with_stars: :star::star: Draw a starry sky for you~ :heart:

![view](docs/view.png)

> It's dynamic!

## Import

Import in html:

```html
<script src="starry-sky.js"></script>
<script>
    new StarrySky(...);
</script>
```

Import in CommonJS:

```bash
npm install --save starry-sky
```

```js
const StarrySky = require('starry-sky');
new StarrySky(...);
```

## Props

```
new StarrySky(el, {
   starRatio = 1 / 800,
   starSize = 1.2,
   maxStarNumber = 10000,
   flickerBaseDuration = 2,
   flickerRandomDurationRange = 5,
   minStarOpacity = 0.1,
   maxStarOpacity = 0.75,
});
```