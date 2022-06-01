module.exports = {
  apps : [
    {
      name: "room-backend",
      script: "./index.js",
      watch: true,
      env: {
          "PORT": 8000,
          "NODE_ENV": "development"
      },
      env_production: {
          "PORT": 8000,
          "NODE_ENV": "production",
      }
    }
  ],
};
