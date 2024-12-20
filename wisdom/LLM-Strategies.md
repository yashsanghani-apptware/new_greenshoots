## How can we mitigate LLM limitations?
Mitigating these limitations includes techniques like:

- Retrieval augmentation: This technique accesses knowledge bases to supplement an LLM’s outdated training data, providing external context and reducing hallucination risk.
- Chaining: This technique integrates actions like searches and calculations.
- Prompt engineering: This involves the careful crafting of prompts by providing critical context that guides appropriate responses.
- Monitoring, filtering, and reviews: This involves ongoing and effective oversight of emerging issues regarding the application’s input and output to detect issues. Both manual reviews and automated filters then correct potential problems with the output. This includes the following:
  - Filters, like block lists, sensitivity classifiers, and banned word filters, can automatically flag issues.
  - Constitutional principles monitor and filter unethical or inappropriate content.
  - Human reviews provide insight into model behavior and output.
- Memory: Retains conversation context by persisting conversation data and context across interactions.
- Fine-tuning: Training and tuning the LLM on more appropriate data for the application domain and principles. This adapts the model’s behavior for its specific purpose.

To re-emphasize what we previously mentioned, raw model scale alone cannot impart compositional reasoning or other missing capabilities. Explicit techniques like elicit prompting and chain-of-thought reasoning are needed to overcome the compositionality gap. Approaches like self-ask prompting mitigate these flaws by encouraging models to methodically decompose problems.

Integrating such tools into training pipelines provides the otherwise lacking faculties. Prompting supplies context, chaining enables inference steps, and retrieval incorporates facts. Together, these transform stochastic parrots into reasoning engines.

Thoughtful prompt engineering and fine-tuning prepare models for real-world use. Ongoing monitoring then catches any emerging issues, both through automation and human review. Filters act as a first line of defense. Adopting constitutional AI principles also encourages building models capable of behaving ethically. This comprehensive approach combines preparation, vigilance, and inherently beneficial design.

Connecting LLMs to external data further reduces hallucination risks and enhances responses with accurate, up-to-date information. However, securely integrating sources like databases adds complexity. Frameworks like LangChain simplify this while providing structure and oversight for responsible LLM use. They allow composing prompted model queries and data sources to surmount standalone LLM deficits. With diligent augmentation, we can create AI systems previously not viable due to innate model limitations. This brings us to our next topic of discussion.

an LLM app is an application that utilizes an LLM to understand natural language prompts and generate responsive text outputs. LLM apps typically have the following components:

A client layer to collect user input as text queries or decisions.
A prompt engineering layer to construct prompts that guide the LLM.
An LLM backend to analyze prompts and produce relevant text responses.
An output parsing layer to interpret LLM responses for the application interface.
Optional integration with external services via function APIs, knowledge bases, and reasoning algorithms to augment the LLM’s capabilities.
In the simplest possible cases, the frontend, parsing, and knowledge base parts are sometimes not explicitly defined, leaving us with just the client, the prompt, and the LLM:

![B21269_02_06](https://github.com/coretical/greenshoots/assets/954883/e59c461d-c960-4c76-9fdc-e9169bb755a9)

Figure 2.6: A simple LLM application

LLM apps can integrate external services via:

Function APIs to access web tools and databases.
Advanced reasoning algorithms for complex logic chains.
Retrieval augmented generation via knowledge bases.
Retrieval augmented generation (RAG), which we will discuss in Chapter 5, Building a Chatbot like ChatGPT, enhances the LLM with external knowledge. These extensions expand the capabilities of LLM apps beyond the LLM’s knowledge alone. For instance:

Function calling allows parameterized API requests.
SQL functions enable conversational database queries.
Reasoning algorithms like chain-of-thought facilitate multi-step logic.
This is illustrated here:

![B21269_02_07](https://github.com/coretical/greenshoots/assets/954883/6c4395bc-bfca-4e2e-b044-83f9c745326a)


Figure 2.7: An advanced LLM application

As can be seen in the preceding figure, the client layer collects user text queries and decisions. Prompt engineering constructs guide the LLM, considering external knowledge or capability (or earlier interactions) without changes to the model itself. The LLM backend dynamically understands and responds to the prompts based on its training. Output parsing interprets the LLM text for the frontend. A knowledge base can enhance the LLM’s information, and optionally, like a database backend in a traditional app, information can be written to it.

LLM applications are important for several reasons:

The LLM backend handles language in a nuanced, human-like way without hardcoded rules.
Responses can be personalized and contextualized based on past interactions.
Advanced reasoning algorithms enable complex, multi-step inference chains.
Dynamic responses based on the LLM or on up-to-date information retrieved in real time.
The key capability LLM apps use is the ability to understand nuanced language in prompts and generate coherent, human-like text responses. This facilitates more natural interactions and workflows compared to traditional code.

The LLM provides human-like language capabilities without manual coding. Therefore, there is no need to manually anticipate and code every language scenario in advance. The integration of LLMs with external services, knowledge, and reasoning algorithms eases the development of innovative applications.

But responsible data practices are critical – PII should be kept off public platforms and models should be fine-tuned in-house when needed. Both the frontend and the output parser could include moderation and enforcing rules about behavior, privacy, and security. Future research must address concerns around potential misuse, biases, and limitations.

We will see a lot of examples of LLM apps throughout this book; here are a few that we’ll encounter:

- Chatbots and virtual assistants: These apps use LLMs like ChatGPT to have natural conversations with users and assist with tasks like scheduling, customer service, and information lookup.
- Intelligent search engines: LLM apps can parse search queries written in natural language and generate relevant results.
- Automated content creation: Apps can leverage LLMs to generate content like articles, emails, code, and more based on a text prompt.
- Question answering: Users can ask an LLM app questions in plain language and receive informative answers that are quickly sourced from the model’s knowledge.
- Sentiment analysis: You can analyze customer feedback, reviews, and social posts using an LLM app to summarize sentiment and extract key themes.
- Text summarization: You can automatically generate concise summaries of longer text documents and articles using an LLM backend.
- Data analysis: You can use LLMs for automated data analysis and visualization to extract insights.
- Code generation: You can set up software pair-programming assistants that can help solve business problems.

The true power of LLMs lies not in LLMs being used in isolation but in LLMs being combined with other sources of knowledge and computation. The LangChain framework aims to enable precisely this kind of integration, facilitating the development of context-aware, reasoning-based applications. LangChain addresses pain points associated with LLMs and provides an intuitive framework for creating customized NLP solutions.

What is LangChain?
Created in 2022 by Harrison Chase, LangChain is an open-source Python framework for building LLM-powered applications. It provides developers with modular, easy-to-use components for connecting language models with external data sources and services. The project has attracted millions in venture capital funding from the likes of Sequoia Capital and Benchmark, who supplied funding to Apple, Cisco, Google, WeWork, Dropbox, and many other successful companies.

LangChain simplifies the development of sophisticated LLM applications by providing reusable components and pre-assembled chains. Its modular architecture abstracts access to LLMs and external services into a unified interface. Developers can combine these building blocks to carry out complex workflows.

Building impactful LLM apps involves challenges like prompt engineering, bias mitigation, productionizing, and integrating external data. LangChain reduces this learning curve through its abstractions and composable structure.

Beyond basic LLM API usage, LangChain facilitates advanced interactions like conversational context and persistence through agents and memory. This allows for chatbots, gathering external data, and more.

In particular, LangChain’s support for chains, agents, tools, and memory allows developers to build applications that can interact with their environment in a more sophisticated way and store and reuse information over time. Its modular design makes it easy to build complex applications that can be adapted to a variety of domains. Support for action plans and strategies improves the performance and robustness of applications. The support for memory and access to external information reduces hallucinations, thus enhancing reliability.

The key benefits LangChain offers developers are:

- Modular architecture for flexible and adaptable LLM integrations.
- Chaining together multiple services beyond just LLMs.
- Goal-driven agent interactions instead of isolated calls.
- Memory and persistence for statefulness across executions.
- Open-source access and community support.

As mentioned, LangChain is open source and written in Python, although companion projects exist that are implemented in JavaScript or – more precisely – TypeScript (LangChain.js), and the fledgling Langchain.rb project for Ruby, which comes with a Ruby interpreter for code execution. In this book, we focus on the Python flavor of the framework.

While resources like documentation, courses, and communities help accelerate the learning process, developing expertise in applying LLMs takes dedicated time and effort. For many developers, the learning curve can be a blocking factor to impactfully leveraging LLMs.

## Exploring key components of LangChain
Chains, agents, memory, and tools enable the creation of sophisticated LLM applications that go beyond basic API calls to a single LLM. In the following dedicated subsections on these key concepts, we’ll consider how they enable the development of capable systems by combining language models with external data and services.

We won’t dive into implementation patterns in this chapter; however, we will discuss in more detail what some of these components are good for. By the end, you should have the level of understanding that’s required to architect systems with LangChain. Let’s start with chains!

### What are chains?
Chains are a critical concept in LangChain for composing modular components into reusable pipelines. For example, developers can put together multiple LLM calls and other components in a sequence to create complex applications for things like chatbot-like social interactions, data extraction, and data analysis. In the most generic terms, a chain is a sequence of calls to components, which can include other chains. The most innocuous example of a chain is probably the PromptTemplate, which passes a formatted response to a language model.

Prompt chaining is a technique that can be used to improve the performance of LangChain applications, which involves chaining together multiple prompts to autocomplete a more complex response. More complex chains integrate models with tools like LLMMath, for math-related queries, or SQLDatabaseChain, for querying databases. These are called utility chains, because they combine language models with specific tools.

Chains can even enforce policies, like moderating toxic outputs or aligning with ethical principles. LangChain implements chains to make sure the content of the output is not toxic, does not otherwise violate OpenAI’s moderation rules (OpenAIModerationChain), or that it conforms to ethical, legal, or custom principles (ConstitutionalChain).

An LLMCheckerChain verifies statements to reduce inaccurate responses using a technique called self-reflection. The LLMCheckerChain can prevent hallucinations and reduce inaccurate responses by verifying the assumptions underlying the provided statements and questions. In a paper by researchers at Carnegie Mellon, Allen Institute, University of Washington, NVIDIA, UC San Diego, and Google Research in May 2023 (SELF-REFINE: Iterative Refinement with Self-Feedback), this strategy has been found to improve task performance by about 20% on average across a benchmark including dialogue responses, math reasoning, and code reasoning.

A few chains can make autonomous decisions. Like agents, router chains can decide which tool to use based on their descriptions. A RouterChain can dynamically select which retrieval system, such as prompts or indexes, to use.

Chains deliver several key benefits:

- Modularity: Logic is divided into reusable components.
- Composability: Components can be sequenced flexibly.
- Readability: Each step in a pipeline is clear.
- Maintainability: Steps can be added, removed, and swapped.
- Reusability: Common pipelines become configurable chains.
- Tool integration: Easily incorporate LLMs, databases, APIs, etc.
- Productivity: Quickly build prototypes of configurable chains.

Together, these benefits enable the encapsulation of complex workflows into easy-to-understand and adaptable chained pipelines.

Typically, developing a LangChain chain involves breaking down a workflow into logical steps, like data loading, processing, model querying, and so on. Well-designed chains embrace single-responsibility components being pipelined together. Steps should be stateless functions to maximize reusability. Configurations should be made customizable. Robust error handling with exceptions and errors is critical for reliability. Monitoring and logging can be enabled with different mechanisms, including callbacks.

Let’s discuss agents next and how they make their decisions!

### What are agents?
Agents are a key concept in LangChain for creating systems that interact dynamically with users and environments over time. An agent is an autonomous software entity that is capable of taking actions to accomplish goals and tasks.

Chains and agents are similar concepts and it’s worth unpicking their differences. The core idea in LangChain is the compositionality of LLMs and other components to work together. Both chains and agents do that, but in different ways. Both extend LLMs, but agents do so by orchestrating chains while chains compose lower-level modules. While chains define reusable logic by sequencing components, agents leverage chains to take goal-driven actions. Agents combine and orchestrate chains. The agent observes the environment, decides which chain to execute based on that observation, takes the chain’s specified action, and repeats.

Agents decide which actions to take using LLMs as reasoning engines. The LLM is prompted with available tools, user input, and previous steps. It then selects the next action or final response.

Tools (discussed later in this chapter) are functions the agent calls to take real-world actions. Providing the right tools and effectively describing them is critical for agents to accomplish goals.

The agent executor runtime orchestrates the loop of querying the agent, executing tool actions, and feeding observations back. This handles lower-level complexities like error handling, logging, and parsing.

Agents provide several key benefits:

- Goal-oriented execution: Agents can plan chains of logic targeting specific goals.
- Dynamic responses: Observing environment changes lets agents react and adapt.
- Statefulness: Agents can maintain memory and context across interactions.
- Robustness: Errors can be handled by catching exceptions and trying alternate chains.
- Composition: Agent logic combines reusable component chains.

Together, this enables agents to handle complex, multi-step workflows and continuously interactive applications like chatbots.

In the section about the limitations of LLMs, we’ve seen that for calculations, a simple calculator outperforms a model consisting of billions of parameters. In this case, an agent can decide to pass the calculation to a calculator or to a Python interpreter. We can see a simple app here, where an agent is connected to both an OpenAI model and a Python function:

chapter2/langflow_python_function.png
Figure 2.10: A simple LLM app with a Python function visualized in LangFlow

Based on the input, the agent can decide to run a Python function. Each agent also decides which tool to use and when. We’ll look more at the mechanics of how this works in Chapter 4, Building Capable Assistants.

A key limitation of agents and chains is their statelessness – each execution occurs in isolation without retaining prior context. This is where the concept of memory becomes critical. Memory in LangChain refers to persisting information across chain executions to enable statefulness.

### What is memory?
In LangChain, memory refers to the persisting state between executions of a chain or agent. Robust memory approaches unlock key benefits for developers building conversational and interactive applications. For example, storing chat history context in memory improves the coherence and relevance of LLM responses over time.

Rather than treating each user input as an isolated prompt, chains can pass conversational memory to models on each call to provide consistency. Agents can also persist facts, relationships, and deductions about the world in memory. This knowledge remains available even as real-world conditions change, keeping the agent contextually informed. Memory of objectives and completed tasks allows agents to track progress on multi-step goals across conversations. In addition, retaining information in memory reduces the number of calls to LLMs for repetitive information. This lowers API usage and costs, while still providing the agent or chain with the needed context.

LangChain provides a standard interface for memory, integrations with storage options like databases, and design patterns for effectively incorporating memory into chains and agents.

Several memory options exist – for example:

- ConversationBufferMemory stores all messages in model history. This increases latency and costs.
- ConversationBufferWindowMemory retains only recent messages.
- ConversationKGMemory summarizes exchanges as a knowledge graph for integration into prompts.
- EntityMemory backed by a database persists agent state and facts.

Moreover, LangChain integrates many database options for durable storage:

- SQL options like Postgres and SQLite enable relational data modeling.
- NoSQL choices like MongoDB and Cassandra facilitate scalable unstructured data.
- Redis provides an in-memory database for high-performance caching.
- Managed cloud services like AWS DynamoDB remove infrastructure burdens.
- Beyond databases, purpose-built memory servers like Remembrall and Motörhead offer optimized conversational context. The right memory approach depends on factors like persistence needs, data relationships, scale, and resources, but robustly retaining state is key for conversational and interactive applications.

LangChain’s memory integrations, from short-term caching to long-term databases, enable the building of stateful, context-aware agents. Architecting effective memory patterns unlocks the next generation of capable and reliable AI systems. LangChain comes with a long list of tools that we can use in applications. A short section will not be able to do this justice; however, I’ll attempt to give a brief overview.

### What are tools?
Tools provide modular interfaces for agents to integrate external services like databases and APIs. Toolkits group tools that share resources. Tools can be combined with models to extend their capability. LangChain offers tools like document loaders, indexes, and vector stores, which facilitate the retrieval and storage of data for augmenting data retrieval in LLMs.

There are many tools available, and here are just a few examples:

- Machine translator: A language model can use a machine translator to better comprehend and process text in multiple languages. This tool enables non-translation-dedicated language models to understand and answer questions in different languages.
- Calculator: Language models can utilize a simple calculator tool to solve math problems. The calculator supports basic arithmetic operations, allowing the model to accurately solve mathematical queries in datasets specifically designed for math problem-solving.
- Maps: By connecting with the Bing Map API or similar services, language models can retrieve location information, assist with route planning, provide driving distance calculations, and offer details about nearby points of interest.
- Weather: Weather APIs provide language models with real-time weather information for cities worldwide. Models can answer queries about current weather conditions or forecast the weather for specific locations within varying time periods.
- Stocks: Connecting with stock market APIs like Alpha Vantage allows language models to query specific stock market information such as opening and closing prices, highest and lowest prices, and more.
- Slides: Language models equipped with slide-making tools can create slides using high-level semantics provided by APIs such as the python-pptx library or image retrieval from the internet based on given topics. These tools facilitate tasks related to slide creation that are required in various professional fields.
- Table processing: APIs built with pandas DataFrames enable language models to perform data analysis and visualization tasks on tables. By connecting to these tools, models can provide users with a more streamlined and natural experience for handling tabular data.
- Knowledge graphs: Language models can query knowledge graphs using APIs that mimic human querying processes, such as finding candidate entities or relations, sending SPARQL queries, and retrieving results. These tools assist in answering questions based on factual knowledge stored in knowledge graphs.
- Search engine: By utilizing search engine APIs like Bing Search, language models can interact with search engines to extract information and provide answers to real-time queries. These tools enhance the model’s ability to gather information from the web and deliver accurate responses.
- Wikipedia: Language models equipped with Wikipedia search tools can search for specific entities on Wikipedia pages, look up keywords within a page, or disambiguate entities with similar names. These tools facilitate question-answering tasks using content retrieved from Wikipedia.
- Online shopping: Connecting language models with online shopping tools allows them to perform actions like searching for items, loading detailed information about products, selecting item features, going through shopping pages, and making purchase decisions based on specific user instructions.
- Additional tools include AI Painting, which allows language models to generate images using AI image generation models; 3D Model Construction, enabling language models to create 3D models using a sophisticated 3D rendering engine; Chemical Properties, assisting in resolving scientific inquiries about chemical properties using APIs like PubChem; and database tools that facilitate natural language access to database data for executing SQL queries and retrieving results.

These various tools provide language models with additional functionalities and capabilities to perform tasks beyond text processing. By connecting with these tools via APIs, language models can enhance their abilities in areas such as translation, math problem-solving, location-based queries, weather forecasting, stock market analysis, slide creation, table processing and analysis, image generation, text-to-speech conversion, and many more specialized tasks.

All these tools can give us advanced AI functionality, and there’s virtually no limit to the tools available. We can easily build custom tools to extend the capability of LLMs, as we’ll see in the next chapter. The use of different tools expands the scope of applications for language models and enables them to handle various real-world tasks more efficiently and effectively.

After discussing chains, agents, memory, and tools, let’s put this all together to get a picture of how LangChain fits all of them together as moving parts.

## How does LangChain work?
The LangChain framework simplifies building sophisticated LLM applications by providing modular components that facilitate connecting language models with other data and services. The framework organizes capabilities into modules spanning from basic LLM interaction to complex reasoning and persistence.

These components can be combined into pipelines also called chains that sequence the following actions:

- Loading documents
- Embedding for retrieval
- Querying LLMs
- Parsing outputs
- Writing memory

Chains match modules to application goals, while agents leverage chains for goal-directed interactions with users. They repeatedly execute actions based on observations, plan optimal logic chains, and persist memory across conversations.

The modules, ranging from simple to advanced, are:

- LLMs and chat models: Provide interfaces to connect and query language models like GPT-3. Support async, streaming, and batch requests.
- Document loaders: Ingest data from sources into documents with text and metadata. Enable loading files, webpages, videos, etc.
- Document transformers: Manipulate documents via splitting, combining, filtering, translating, etc. Help adapt data for models.
- Text embeddings: Create vector representations of text for semantic search. Different methods for embedding documents vs. queries.
- Vector stores: Store embedded document vectors for efficient similarity search and retrieval.
- Retrievers: General interface to return documents based on a query. Can leverage vector stores.
- Tools: Interfaces that agents use to interact with external systems.
- Agents: Goal-driven systems that use LLMs to plan actions based on environment observations.
- Toolkits: Initialize groups of tools that share resources like databases.
- Memory: Persist information across conversations and workflows by reading/writing session data.
- Callbacks: Hook into pipeline stages for logging, monitoring, streaming, and others. Callbacks enable monitoring chains.

Together, the preceding capabilities facilitate the building of robust, efficient, and capable LLM applications with LangChain. Each of them has its own complexity and importance, so it’s important to explain a bit more.

LangChain offers interfaces to connect with and query LLMs like GPT-3 and chat models. These interfaces support asynchronous requests, streaming responses, and batch queries. This provides a flexible API for integrating different language models.

Although LangChain doesn’t supply models itself, it supports integration through LLM wrappers with various language model providers, enabling the app to interact with chat models as well as text embedding model providers. Supported providers include OpenAI, HuggingFace, Azure, and Anthropic. Providing a standardized interface means being able to effortlessly swap out models to save money and energy or get better performance. We’ll go into some of these options in Chapter 3, Getting Started with LangChain.

A core building block of LangChain is the prompt class, which allows users to interact with LLMs by providing concise instructions or examples. Prompt engineering helps optimize prompts for optimal model performance. Templates give flexibility in terms of input and the available collection of prompts is battle-tested in a range of applications. We’ll discuss prompts starting in Chapter 3, Getting Started with LangChain, and prompt engineering is the topic of Chapter 8, Customizing LLMs and Their Output.

Document loaders allow ingesting data from various sources into documents containing text and metadata. This data can then be manipulated via document transformers – splitting, combining, filtering, translating, etc. These tools adapt external data for use in LLMs.

Data loaders include modules for storing data and utilities for interacting with external systems, like web searches or databases, and most importantly data retrieval. Examples are Microsoft Word documents (.docx), HyperText Markup Language (HTML), and other common formats such as PDF, text files, JSON, and CSV. Other tools will send emails to prospective customers, post funny puns for your followers, or send Slack messages to your coworkers. We’ll look at these in Chapter 5, Building a Chatbot like ChatGPT.

Text embedding models create vector representations of text that capture semantic meaning. This enables semantic search by finding text with the most similar vector representations. Vector stores build on this by indexing embedded document vectors for efficient similarity-based retrieval.

Vector stores come in when working with large documents, where the document needs to be chunked up in order to be passed to the LLM. These parts of the document would be stored as embeddings, which means that they are vector representations of the information. All these tools enhance the LLMs’ knowledge and improve their performance in applications like question answering and summarization.

There are numerous integrations for vector storage. These include Alibaba Cloud OpenSearch, AnalyticDB for PostgreSQL, Meta AI’s Annoy library for Approximate Nearest Neighbor (ANN) search, Cassandra, Chroma, Elasticsearch, Facebook AI Similarity Search (Faiss), MongoDB Atlas Vector Search, PGVector as a vector similarity search for Postgres, Pinecone, scikit-learn (SKLearnVectorStore for k-nearest neighbor search), and many more. We’ll explore these in Chapter 5, Building a Chatbot like ChatGPT.
