module.exports = {
  apps: [{
    name: 'blog-server',
    script: '../dist/main.js',
    max_memory_restart: '300M',
    autorestart: false,
    watch: false
  }]
};
