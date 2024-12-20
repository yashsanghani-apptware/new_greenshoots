package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {
    http.HandleFunc("/notify", notifyHandler)
    http.HandleFunc("/results", resultsHandler)

    fmt.Println("Mock server is running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}

func notifyHandler(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Unable to read request body", http.StatusBadRequest)
        return
    }
    fmt.Printf("Received notification: %s\n", string(body))
    w.WriteHeader(http.StatusOK)
}

func resultsHandler(w http.ResponseWriter, r *http.Request) {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Unable to read request body", http.StatusBadRequest)
        return
    }
    fmt.Printf("Received results: %s\n", string(body))
    w.WriteHeader(http.StatusOK)
}

