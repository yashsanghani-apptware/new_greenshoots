# Building Celery Application in Docker
In this article, we will walk through the process of setting up a standalone Celery application and then containerizing it with Docker. Whether you are new to Celery or looking to enhance your knowledge, this step-by-step guide will help you get started on building and deploying your Celery-powered application.

Let’s start with setting up a standalone Celery application. To begin, ensure that you have Python and pip installed on your system.

Follow these steps:

Create a new project directory: Start by creating a new directory for your Celery application.
```
$ mkdir my-celery-app
$ cd my-celery-app
```
Create a virtual environment: It’s always a good practice to work within a virtual environment to manage dependencies

```
$ python -m venv venv
$ source venv/bin/activate
```

Create a requirements.txt file and add your dependencies there

```
celery==5.3.1
kombu===5.3.1
```

Let’s install them using the following command pip install -r requirements.txt

Create a file called `app.py` and start adding celery configuration in the file


from celery import Celery
```
app = Celery(
  'my_celery_app',
  broker='amqp://guest:guest@localhost:5672/'
)
```

In this tutorial we are using Rabbitmq as a broker, you can see a list of brokers that can be configured with celery here.

Let’s add default exchange and queues in our celery app.

```
from celery import Celery
from kombu import Exchange, Queue 

app = Celery(
  'my_celery_app',
  broker='amqp://guest:guest@localhost:5672/'
)

# Registering an exchange and two queues
default_exchange = Exchange('default', type='topic')

app.conf.task_queues = (
    Queue('default', default_exchange, routing_key='default.#'),
    Queue('periodic', default_exchange, routing_key='periodic.#'),
)
```

In this code block, we have added one exchange and two queues, one to handle normal tasks and the other for periodic tasks. The routing key helps Celery identify which tasks belong to which queue and # in the routing key specify that all tasks in this queue will have default. a prefix in the task name.

```
from celery import Celery
from kombu import Exchange, Queue 

app = Celery(
  'my_celery_app',
  broker='amqp://guest:guest@localhost:5672/'
)

# Registering an exchange and two queues
default_exchange = Exchange('default', type='topic')

app.conf.task_queues = (
    Queue('default', default_exchange, routing_key='default.#'),
    Queue('periodic', default_exchange, routing_key='periodic.#'),
)

# ----------

# Configuring default queue, exchange and routing key
app.conf.task_default_queue = 'default'
app.conf.task_default_exchange = 'default'
app.conf.task_default_routing_key = 'default'

# Configuring tasks routes
CELERY_TASK_ROUTES = {
    'default.*': {
        'queue': 'default',
        'routing_key': 'default.#',
    },
    'periodic.*': {
        'queue': 'periodic',
        'routing_key': 'periodic.#',
    }
}

```

Now we are letting Celery know which queue, exchange, and routing key is going to be used as a default for this app and have also configured routes of tasks manually, all tasks having names starting with defult. will be directed toward default queue and default.#will be used as a routing key for these tasks. You can read further about exchange and queue here

Let’s add tasks to our celery app

```
from celery import Celery
from kombu import Exchange, Queue 

app = Celery(
    'my_celery_app',
    broker='amqp://guest:guest@localhost:5672/'
)

# Registering an exchange and two queues
default_exchange = Exchange('default', type='topic')

app.conf.task_queues = (
    Queue('default', default_exchange, routing_key='default.#'),
    Queue('periodic', default_exchange, routing_key='periodic.#'),
)

# Configuring default queue, exchange and routing key
app.conf.task_default_queue = 'default'
app.conf.task_default_exchange = 'default'
app.conf.task_default_routing_key = 'default'

app.autodiscover_tasks()

# Configuring tasks routes
CELERY_TASK_ROUTES = {
    'default.*': {
        'queue': 'default',
        'routing_key': 'default.#',
    },
    'periodic.*': {
        'queue': 'periodic',
        'routing_key': 'periodic.#',
    }
}

# ----------

# Tasks
@app.task(name="default.add", bind=True)
def add(self, x, y)
    return x + y
```

Since we have added tasks in the same file Celery will pick them up automatically but if we have tasks in a separate file then will have to manually register them with our app as mentioned below.

```
from .tasks import add

app.register_task(add)
```

Our Celery app has been configured so let’s create a dockerfile to run our Celery app using Docker. Make sure you name it as Dockerfile

```
# Dockerfile
FROM python:3.9

RUN mkdir /app
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . /app

CMD celery -A app worker --loglevel=info

```
Build the Docker image: Open a terminal window, navigate to your project directory, and build the Docker image using the following command.

```
$ docker build -t my-celery-app .
```
Run the Docker container: Start a new Docker container using the image you built

```
$ docker run -d my-celery-app
```

You have successfully set up a standalone Celery application using RabbitMQ as the message broker and containerized it with Docker. By following this step-by-step guide, you now have the knowledge to leverage the power of Celery for asynchronous task processing and utilize RabbitMQ as a reliable messaging system.

Remember to explore the Celery and RabbitMQ documentation for further configuration options and advanced features. With Celery and Docker, you can efficiently build scalable and distributed applications. Enjoy harnessing the capabilities of Celery and RabbitMQ to develop robust and responsive systems.