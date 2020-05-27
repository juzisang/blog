module.exports = {
  apps : [{
    name: 'blog-server',
    script: './dist/main.js',
    instances: 1,
    autorestart: false,
    watch: false,
  }]
};
