# Use an official Golang runtime as a parent image
FROM golang:1.20-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY mock_server.go .

# Build the Go app
RUN go build -o mock_server mock_server.go

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./mock_server"]

