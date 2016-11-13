/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors'; // eslint-disable-line no-unused-vars

// assures the babel dev config for hot reloading doesn't apply
var proc = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';
process.env.ENGINE_HOST = webpackConfig.devHost;

console.log('generating minified bundle for production '.blue +
  'via webpack. This will take a moment. . .'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    // a fatal error occured. Stop here
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    return jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded
  console.log('Your app has been compiled in production'.green +
  ' mode and written to /dist. Roll'.green);

  return 0;
});
// process.env.NODE_ENV = proc;
