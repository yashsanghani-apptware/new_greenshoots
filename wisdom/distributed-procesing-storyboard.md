# Design Specification for Scalable URL Processing System
## Overview
This design aims to process tens of thousands of URLs for information extraction and organization into contextually relevant sections, which can then be refined and used by conversational AI systems. The system will be built using Python, leveraging Celery for distributed task management, RabbitMQ for message brokering, and a combination of other services and tools to handle various formats like PDFs, images, and documents.

## Components
- Initializer Task: Validates and initializes the request, generates execution ID.
- Site Mapping Task: Generates a sitemap of URLs.
- Batching Task: Divides URLs into manageable batches.
- Extraction Task: Extracts content from each URL.
- Post-Processing Task: Organizes extracted content into context blocks.
- Factorization and Classification Task: Uses OpenAI to refine and classify content.
- CSV Writing Task: Writes processed data into CSV files.
- Auditing Task: Reports on successful and failed extractions.
- Finalization Task: Provides processed results for download or integration.

## High-Level Workflow
- Client Request: Client sends a request to start processing.
- Initializer Task: Validates request and sends acknowledgment.
- Site Mapping Task: Generates sitemap and uses webhooks for communication.
- Batching Task: Creates URL batches for processing.
- Extraction Task: Extracts content from URLs and organizes into sections.
- Post-Processing Task: Organizes content into context blocks.
- Factorization and Classification Task: Uses OpenAI for classification.
- CSV Writing Task: Writes results into CSV files.
- Auditing Task: Audits the process and reports failures.
- Finalization Task: Finalizes results and provides download options.

## Detailed Implementation

### Initializer Task

```
# tasks.py
from celery import Celery
import requests
import uuid

app = Celery('url_processor', broker='pyamqp://guest@localhost//')

@app.task
def initializer_task(request_data):
    # Validate request
    urls = request_data.get('urls')
    inclusion_rules = request_data.get('inclusion_rules')
    exclusion_rules = request_data.get('exclusion_rules')
    
    if not urls or not inclusion_rules or not exclusion_rules:
        return {"status": "error", "message": "Invalid request parameters"}
    
    execution_id = str(uuid.uuid4())
    # Acknowledge the request
    return {"status": "success", "execution_id": execution_id, "message": "Request accepted"}

@app.task
def site_mapping_task(execution_id, urls, inclusion_rules, exclusion_rules):
    # Generate sitemap (dummy implementation)
    sitemap = [url for url in urls if 'include' in inclusion_rules and 'exclude' not in exclusion_rules]
    # Simulate webhook callback to Ingestor
    callback_url = "http://localhost:5000/ingestor/sitemap_callback"
    response = requests.post(callback_url, json={"execution_id": execution_id, "sitemap": sitemap})
    return response.status_code
```

### Batching Task

```
@app.task
def batching_task(execution_id, sitemap):
    batch_size = 100
    batches = [sitemap[i:i + batch_size] for i in range(0, len(sitemap), batch_size)]
    for batch in batches:
        extractor_task.delay(execution_id, batch)
    return {"status": "success", "message": f"{len(batches)} batches created and sent for extraction"}
```
### Extraction Task

```
@app.task
def extractor_task(execution_id, batch):
    extracted_data = []
    for url in batch:
        # Dummy extraction logic
        extracted_data.append({"url": url, "content": "Extracted content"})
    # Simulate webhook callback to Ingestor
    callback_url = "http://localhost:5000/ingestor/extraction_callback"
    response = requests.post(callback_url, json={"execution_id": execution_id, "extracted_data": extracted_data})
    return response.status_code
```

### Post-Processing Task

```
@app.task
def post_processing_task(execution_id, extracted_data):
    context_blocks = []
    for data in extracted_data:
        context_blocks.append({"url": data["url"], "context": "Processed context"})
    factorization_task.delay(execution_id, context_blocks)
    return {"status": "success", "message": "Post-processing completed"}
```

### Factorization and Classification Task

```
@app.task
def factorization_task(execution_id, context_blocks):
    classified_data = []
    for block in context_blocks:
        # Call to OpenAI (dummy implementation)
        classified_data.append({"url": block["url"], "facts": "Classified facts"})
    csv_writer_task.delay(execution_id, classified_data)
    return {"status": "success", "message": "Factorization and classification completed"}
```

### CSV Writing Task

```
@app.task
def csv_writer_task(execution_id, classified_data):
    csv_file = f"{execution_id}.csv"
    with open(csv_file, 'w') as f:
        for data in classified_data:
            f.write(f'{data["url"]},{data["facts"]}\n')
    auditing_task.delay(execution_id, classified_data)
    return {"status": "success", "message": "CSV writing completed"}
```
### Auditing Task

```
@app.task
def auditing_task(execution_id, classified_data):
    failed_urls = [data["url"] for data in classified_data if "error" in data]
    audit_report = {
        "execution_id": execution_id,
        "total_urls": len(classified_data),
        "failed_urls": failed_urls,
        "failure_rate": len(failed_urls) / len(classified_data) * 100
    }
    # Save audit report or send it back to the client
    finalization_task.delay(execution_id, audit_report)
    return {"status": "success", "message": "Auditing completed"}
```
### Finalization Task

```
@app.task
def finalization_task(execution_id, audit_report):
    # Finalize and provide download link or integration points
    download_link = f"http://localhost:5000/download/{execution_id}.csv"
    return {"status": "success", "message": "Processing completed", "download_link": download_link}
```

### Web Server to Handle Webhooks and Downloads

```
# web_server.py
from flask import Flask, request, send_from_directory

app = Flask(__name__)

@app.route('/ingestor/sitemap_callback', methods=['POST'])
def sitemap_callback():
    data = request.json
    execution_id = data['execution_id']
    sitemap = data['sitemap']
    # Trigger next task
    batching_task.delay(execution_id, sitemap)
    return {"status": "success"}, 200

@app.route('/ingestor/extraction_callback', methods=['POST'])
def extraction_callback():
    data = request.json
    execution_id = data['execution_id']
    extracted_data = data['extracted_data']
    # Trigger next task
    post_processing_task.delay(execution_id, extracted_data)
    return {"status": "success"}, 200

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(directory='.', path=filename)

if __name__ == '__main__':
    app.run(port=5000)
```

## Running the System
- Start RabbitMQ: Ensure RabbitMQ is running using Docker Compose.
- Start Celery Worker: Run celery -A tasks worker --loglevel=info.
- Start Web Server: Run python web_server.py.
- Send Requests: Use initializer_task.delay(request_data) to start the process.

This solution scales to handle tens of thousands of URLs by leveraging Celery's distributed task queue, RabbitMQ's message brokering capabilities, and a series of well-defined tasks to manage the complex processing pipeline.
