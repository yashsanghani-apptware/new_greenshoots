# Use a base image that includes the required GLIBC version
FROM debian:bullseye-slim AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Install Go
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://golang.org/dl/go1.20.6.linux-amd64.tar.gz && \
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
RUN go build -o promptingservice promptingservice.go

# Use a minimal image to run the service
FROM debian:bullseye-slim

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/promptingservice /promptingservice

# Expose port 808x to the outside world (replace 808x with the appropriate port)
EXPOSE 8086

# Command to run the executable
CMD ["/promptingservice"]
