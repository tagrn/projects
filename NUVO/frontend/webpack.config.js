// webpack.config.js
{
  [
    new webpack.ProvidePlugin({
      // other modules
      introJs: ["intro.js"]
    })
  ];
}

// attach CSS
// SomeComponent.vue
import "intro.js/introjs.css";
