# Use a base image that includes the required GLIBC version
FROM ubuntu:22.04 AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y wget build-essential

# Install Go
RUN wget https://golang.org/dl/go1.20.6.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.20.6.linux-amd64.tar.gz

# Set Go environment variables
ENV PATH="/usr/local/go/bin:${PATH}"

# Copy go mod and sum files
COPY go.mod .
COPY go.sum .

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o gobpel cmd/server/main.go

# Use a minimal image to run the service
FROM ubuntu:22.04

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/gobpel /gobpel

# Expose port 50051 to the outside world
EXPOSE 50051

# Command to run the executable
CMD ["/gobpel"]

