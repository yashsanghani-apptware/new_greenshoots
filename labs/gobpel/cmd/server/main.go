package main

import (
    "log"
    "net"

    "google.golang.org/grpc"
    "google.golang.org/grpc/reflection"
    "go.uber.org/zap"

    "gobpel/api"
    "gobpel/pkg/bpel"
    "gobpel/pkg/db"
)

func main() {
    // Initialize MongoDB
    mongoURI := "mongodb://mongodb:27017"
    err := db.InitMongoDB(mongoURI)
    if err != nil {
        log.Fatalf("failed to connect to MongoDB: %v", err)
    }

    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    grpcServer := grpc.NewServer()
    server := bpel.NewServer()

    api.RegisterBPELProcessServiceServer(grpcServer, server)
    reflection.Register(grpcServer)

    logger, _ := zap.NewProduction()
    logger.Info("Server listening at", zap.String("address", lis.Addr().String()))

    if err := grpcServer.Serve(lis); err != nil {
        logger.Fatal("failed to serve", zap.Error(err))
    }
}

