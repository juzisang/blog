module.exports = {
  apps: [{
    name: 'blog-dev-server',
    script: './dist/main.js',
    max_memory_restart: '300M',
    autorestart: false,
    watch: false
  }]
};
