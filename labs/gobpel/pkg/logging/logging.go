package logging

import (
    "go.uber.org/zap"
)

var logger *zap.Logger

func NewLogger() *zap.Logger {
    if logger == nil {
        var err error
        logger, err = zap.NewProduction()
        if err != nil {
            panic(err)
        }
    }
    return logger
}

func GetLogger() *zap.Logger {
    if logger == nil {
        return NewLogger()
    }
    return logger
}

