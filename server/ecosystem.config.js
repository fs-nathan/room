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
          "PORT": 80,
          "NODE_ENV": "production",
      }
    }
  ],
};
