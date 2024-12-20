package db

import (
    "context"
    "errors"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "gobpel/api"
)

var client *mongo.Client

// Initialize the MongoDB client
func InitMongoDB(uri string) error {
    var err error
    client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
    if err != nil {
        return err
    }
    return client.Ping(context.TODO(), nil)
}

func CreateProcess(process *api.Process) error {
    collection := client.Database("gobpel").Collection("processes")
    _, err := collection.InsertOne(context.Background(), process)
    return err
}

func GetProcess(processId string) (*api.Process, error) {
    collection := client.Database("gobpel").Collection("processes")
    filter := bson.M{"name": processId}
    var process api.Process
    err := collection.FindOne(context.Background(), filter).Decode(&process)
    if err != nil {
        if err == mongo.ErrNoDocuments {
            return nil, errors.New("no documents found")
        }
        return nil, err
    }
    return &process, nil
}

func UpdateProcess(process *api.Process) (*api.Process, error) {
    collection := client.Database("gobpel").Collection("processes")
    filter := bson.M{"name": process.Name}
    update := bson.M{"$set": process}
    _, err := collection.UpdateOne(context.Background(), filter, update)
    if err != nil {
        return nil, err
    }
    return process, nil
}

func DeleteProcess(processId string) (bool, error) {
    collection := client.Database("gobpel").Collection("processes")
    filter := bson.M{"name": processId}
    result, err := collection.DeleteOne(context.Background(), filter)
    if err != nil {
        return false, err
    }
    if result.DeletedCount == 0 {
        return false, errors.New("no documents deleted")
    }
    return true, nil
}

func DeleteAllProcesses() error {
    collection := client.Database("gobpel").Collection("processes")
    _, err := collection.DeleteMany(context.Background(), bson.M{})
    return err
}

func GetAllProcesses() ([]*api.Process, error) {
    collection := client.Database("gobpel").Collection("processes")
    cursor, err := collection.Find(context.Background(), bson.M{})
    if err != nil {
        return nil, err
    }
    defer cursor.Close(context.Background())

    var processes []*api.Process
    for cursor.Next(context.Background()) {
        var process api.Process
        if err := cursor.Decode(&process); err != nil {
            return nil, err
        }
        processes = append(processes, &process)
    }
    if err := cursor.Err(); err != nil {
        return nil, err
    }
    return processes, nil
}

