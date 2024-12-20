package main

import (
    "encoding/json"
    "net/http"
    "log"
)

func trainModel(w http.ResponseWriter, r *http.Request) {
    var input map[string]string
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Simulate model training
    output := map[string]string{
        "model": "trained model",
    }

    response, err := json.Marshal(output)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(response)
}

func main() {
    http.HandleFunc("/trainModel", trainModel)
    log.Fatal(http.ListenAndServe(":8083", nil))
}

