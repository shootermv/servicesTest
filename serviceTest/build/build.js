({
  appDir: '../',
  baseUrl: 'js',
  dir: '../../dist',
  name: 'config',
  skipDirOptimize:true,
  fileExclusionRegExp: /^(r|build)\.js$/,
  excludeShallow: ['settings'],
  mainConfigFile: '../js/config.js',
  optimizeCss: 'standard',
  removeCombined: true,
  deps:["config","app"]
})