module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
      config.node = {
        __dirname: true,
      };
    }

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
    loader: "akamai",
    path: "",
  },
};
