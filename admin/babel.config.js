module.exports = {
  presets: ["@vue/app"],
  plugins: [
    "vue-jsx-sync",
    "jsx-v-model",
    [
      "import",
      {
        libraryName: "muse-ui",
        libraryDirectory: "lib",
        camel2DashComponentName: false
      }
    ]
  ]
};
