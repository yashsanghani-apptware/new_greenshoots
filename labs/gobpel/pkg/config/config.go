package config

import (
    "log"
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    Server struct {
        Port string
    }
    MongoDB struct {
        URI string
    }
}

var config *Config

func LoadConfig() *Config {
    if config == nil {
        err := godotenv.Load()
        if err != nil {
            log.Fatalf("Error loading .env file: %v", err)
        }

        config = &Config{}
        config.Server.Port = os.Getenv("SERVER_PORT")
        config.MongoDB.URI = os.Getenv("MONGO_URI")

        if config.Server.Port == "" || config.MongoDB.URI == "" {
            log.Fatalf("Missing required environment variables")
        }
    }
    return config
}

