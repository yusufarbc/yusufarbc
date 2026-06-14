Agentic AI Protocols: A New Attack Surface? With the rise of autonomous AI agents, protocols like Model Context Protocol, A2A, Agent Network Protocol, Universal Commerce Protocol, and Agent Payments Protocol form the backbone of the new Agentic Web. In this post, we explore what Agentic AI truly is, map the entire protocol ecosystem layer by layer, and analyze the security vulnerabilities each layer introduces.

Throughout AI history, two great paradigm shifts have occurred: the first was the move from symbolic AI to machine learning. The second — which we are living through right now — is the shift from reactive language models to Agentic AI. This second transformation is not merely a technical evolution; it marks the beginning of an entirely new order in terms of security, trust, and accountability.

The rise of agentic AI has given birth to a new protocol ecosystem: Model Context Protocol or MCP, Agent-to-Agent or A2A, Agent Network Protocol or ANP, Universal Commerce Protocol or UCP, and Agent Payments Protocol or AP2. These protocols don't compete with each other; instead, like TCP IP, HTTP, and TLS, they form a complementary layered stack. And within each of these layers, entirely new attack surfaces hide — surfaces where classical security tools go blind.

Chapter One: Security and Architectural Schema of Agentic Protocols.

The architectural diagram illustrates the trust boundaries and potential attack vectors across the full protocol stack:

A user declares a goal directly to the AI Client and Orchestrator within the Client Trusted Zone, while an attacker attempting a prompt injection could perform an indirect injection to the client. The AI Client and Orchestrator is surrounded by a trust boundary containing Model Context Protocol or MCP for tool and data access, Agent-to-Agent or A2A for collaboration, and Agent Network Protocol or ANP for discovery and identity. The AI Client communicates with the MCP server via JSON-RPC, exchanges A2A messages, and receives discovery configurations from ANP.

Beyond the trust boundary lies the execution zone, containing local systems like files, databases, and terminals, and remote agents. MCP connects to local systems, while A2A connects to remote agents. The primary threat in this setup is the client causing authority abuse or a confused deputy attack on the local systems.

Chapter Two: What Is Agentic AI?

Traditional generative AI is a tool: you ask, it answers. Agentic AI is a colleague: you declare the goal, and it decides independently how to achieve it.

As of 2025, the paradigm shift can be summarized as: You asked a question and the AI responded, changing to, You declared a goal and the AI determined how to accomplish it.

This difference is not just functional; it is fundamentally security-relevant. A reactive model cannot harm its environment; an agentic agent can delete files, send emails, initiate payments, and activate other agents.

Modern autonomous agents are built upon a perception, reasoning, and action loop. Let's look at the core capabilities of autonomous agents and their security impacts:

First, Planning: it decomposes complex goals into sub-tasks and adapts on obstacles. The security impact is the unpredictability of chained actions.

Second, Memory: it maintains short and long-term context and learns from vector databases. The security impact is memory poisoning risks.

Third, Tool Use: it manages API calls, code execution, and browser control. The security impact is tool misuse and remote code execution or RCE risk.

Fourth, Self-Correction: it evaluates its own outputs and revises them if needed. The security impact is an exploitable reflection loop.

Agentic AI systems operate on specific reasoning patterns that define how they think, act, and learn. ReAct, or Reason and Act, is a dynamic thought, tool call, and observation loop that adapts to every piece of incoming information. It is the standard for real-time, dynamic tasks. Chain-of-Thought, or CoT, is the foundational reasoning layer that breaks problems into step-by-step logical segments before committing to an answer. Reflection or Self-Critique is a metacognitive layer where the agent evaluates its own output against quality, accuracy, and constraints. This is critical for reducing hallucinations in production environments. Finally, Tree of Thoughts or ToT explores multiple reasoning branches simultaneously and evaluates each before selecting the most promising direction, making it ideal for complex creative or strategic problems.

For production orchestration frameworks, the main options are: LangGraph, which focuses on graph-based state management and is typically used for complex, cyclical multi-step workflows. AutoGen, focusing on multi-agent collaboration, used in team-based problem solving scenarios. CrewAI, focusing on role-based task management, which is ideal for hierarchical agent teams. And Smolagents, focusing on lightweight, code-based reasoning, used in cost-effective, secure tool execution environments.

Chapter Three: RAG or Retrieval-Augmented Generation.

Retrieval-Augmented Generation or RAG is one of the smartest solutions in the AI space. It was developed to address the core limitations of Large Language Models, specifically outdated knowledge and their tendency to hallucinate.

The end-to-end ingestion, retrieval, and generation flow in a typical RAG system occurs as follows:

First is Ingestion and Embedding: documents such as PDFs, databases, and FAQs are chunked and embedded into mathematical vectors. Second is Storage: these embedded vectors are stored in a Vector Database. Third is Retrieval: when a user query is received, query embedding is performed, followed by a similarity search in the Vector Database, which retrieves relevant chunks as context. Fourth is Generation: the user query and retrieved context are merged into a prompt sent to the Large Language Model or LLM, which generates an accurate answer.

RAG is an architectural pattern that enables an AI model to answer a question by retrieving relevant information from an external data source instead of relying solely on its internal training data. If you ask an LLM to read a five-hundred page company manual and tell you how many days of annual leave John has, the RAG engine locates the specific page in the manual, feeds it to the model, and allows the model to write an accurate answer.

RAG consists of three core phases: Ingestion and Embedding, Retrieval, and Generation. All raw documents are broken down into smaller segments or chunks. These chunks are converted into mathematical vectors representing semantic meaning and stored in a Vector Database. When a user asks a question, the system embeds this query into a vector and performs a similarity search in the Vector DB to locate and retrieve the semantically closest document chunks in seconds. These retrieved chunks are combined with the user's original query to form a rich prompt sent to the LLM. The model then writes a hallucination-free response.

RAG has not lost its importance; in fact, it has become the standard in enterprise AI. However, it has lost its initial magical and flawless hype due to several realities. These include the garbage in, garbage out problem where unstructured or messy raw documentation leads to incorrect retrieved documents, the long context windows of modern models that can process millions of tokens in a single request, and the latency and infrastructure costs of managing vector databases.

Building a RAG system typically involves orchestration frameworks like LangChain and LlamaIndex, vector databases like Pinecone, Chroma, Milvus, or Weaviate, and LLM APIs like OpenAI and Anthropic. Simple search-and-retrieve systems are transitioning into Advanced RAG and Agentic RAG. No matter how large LLM context windows become, uploading a company's entire data footprint on every single query is too slow and cost-prohibitive. Future AI agents doing web research or database querying will always rely on RAG under the hood.

Chapter Four: The Protocol Map of the Agentic Web.

For agents to function, they must answer two fundamental questions: How do I connect to tools? and How do I coordinate with other agents? The answers point to protocol layers that are not competing but complementary.

Two categories are essential for understanding the protocol ecosystem:

Horizontal Protocols or the Operating System Layer, which represents domain-agnostic foundational infrastructure. Regardless of what task an agent performs, these protocols provide the connectivity, communication, and discovery mechanisms every agent needs.

Vertical Protocols or the Application Layer, which represents domain-specific semantics, rules, and workflows. They solve coordination problems specific to particular industries like e-commerce or payments, but are built on top of horizontal foundations.

Looking at the protocol landscape:

MCP, or Model Context Protocol, is a horizontal protocol acting as the agent-to-tool bridge for tool and data access. It is currently in production.

A2A, or Agent-to-Agent protocol, is also horizontal, managing agent-to-agent collaboration. It is in production.

ANP, or Agent Network Protocol, is a horizontal protocol for decentralized identity and rendezvous discovery. It is in early adoption.

UCP, or Universal Commerce Protocol, is a vertical protocol standardizing the e-commerce lifecycle for commerce. It is in early adoption.

AP2, or Agent Payments Protocol, is a vertical protocol for cryptographic transaction authorization in payments. It is in early adoption.

Chapter Five: MCP — The USB-C Port for AI.

Early AI integrations required writing custom glue code for every model and tool pair. Model Context Protocol or MCP, developed by Anthropic and transferred to the Linux Foundation, solves this with a standard JSON-RPC 2.0 interface.

Core limitations of REST APIs in the agent world include rigid schemas that constrain the LLM's flexible reasoning, statelessness where every step in multi-step tasks requires manually managing context, token waste where the entire API documentation must be injected into the context window for every request, and meaningless error codes that do not give the LLM enough semantic information to self-correct.

MCP relies on a clear separation of concerns. In the MCP client-server architecture:

The MCP Host is the application where the agent logic lives, such as VS Code, Claude Desktop, or a custom app. The MCP Client is embedded within the Host, establishing a one-to-one connection with a server. The MCP Server is a lightweight, standalone service exposing tools, resources, and prompts. The transport layers include stdio for local processes and HTTP or SSE for remote servers.

MCP consists of three core primitives:

First, Tools, controlled by the Model, which are executable functions that allow the AI to act, such as send_email or query_db. Second, Resources, controlled by the Application, which are read-only data sources providing context, like file contents or database schemas. Third, Prompts, controlled by the User, which are pre-defined templates for common interactions, such as Analyze this code.

Advanced MCP features include Roots, which represents URI-based scope definition to restrict file operations to specific directories, and Sampling, which is a reverse-flow where the server can request an LLM completion from the Host. This sampling feature creates a vector for Conversation Hijacking attacks, so all sampling requests require Human-in-the-Loop approval as an architectural mandate.

Chapter Six: A2A — The Universal Language Between Agents.

MCP connects an agent to its tools; but it provides no standard for two autonomous agents to delegate tasks to each other, share state, or work in parallel. The Agent-to-Agent or A2A protocol fills this horizontal coordination gap.

Launched by Google in April 2025 and now developed under the Linux Foundation, A2A enables agents from different frameworks or platforms to securely discover each other, authenticate, and collaborate. As an analogy, MCP lets an agent run applications on its desktop, while A2A lets that agent send emails to other specialist agents and request work from them.

In A2A, every agent publishes a JSON-based identity card at well-known slash agent dot json. This card advertises the agent's capabilities, supported data modalities, and authentication requirements. A2A defines a clear state machine for tasks, running from submitted, to working, to input-required, and finally to completed or failed. The communication stack uses HTTPS, JSON-RPC 2.0, and Server-Sent Events.

A2A places enterprise security at the center of its design, using OAuth 2.0, OpenID Connect, and API keys for authentication, mandatory HTTPS for encryption, granular scopes for authorization, and Webhook security for SSRF prevention. However, A2A does not inherently prevent cross-agent prompt injection, and developers are responsible for implementing safety guardrails. In summary, MCP represents vertical integration for agent-to-tool connections, while A2A represents horizontal coordination for agent-to-agent communication.

Chapter Seven: ANP — The HTTP of the Agentic Web.

MCP and A2A assume agents are already acquainted. But in a world where millions of agents are scattered across the internet, how does an agent connect to and trust one it has never met? Agent Network Protocol or ANP answers this question. ANP is an open-source, community-driven protocol that enables secure discovery, communication, and authentication of agents without depending on central authorities.

ANP's three-layer architecture includes:

First, the Identity and Encrypted Communication Layer, which uses W3C Decentralized Identifiers or DIDs and end-to-end encryption to give every agent a verifiable identity without a central registry. Second, the Meta-Protocol Layer, which facilitates negotiation between agents to determine the best communication format and protocol version. Third, the Application Protocol Layer, which uses JSON-LD for rich semantic discovery, capability descriptions, and service endpoints. Discovery methods include active discovery using well-known URI paths and passive discovery where agents register profiles with search services.

Comparing ANP, MCP, and A2A:

For Focus: MCP focuses on tool access, A2A on agent coordination, and ANP on discovery and identity.

For Model: MCP uses client-server, A2A uses peer-to-peer, and ANP uses decentralized.

For Scope: MCP and A2A are corporate or enterprise-focused, while ANP covers the open internet.

For Identity: MCP uses OAuth 2.1, A2A uses OAuth 2.0 or OpenID Connect, and ANP uses W3C Decentralized Identifiers or DIDs.

Chapter Eight: UCP and AP2 — The Autonomous Flow of Money.

In ecosystems where agents make financial decisions and execute payments, UCP and AP2 demand a paradigm shift in fraud detection systems. UCP provides a common language for the entire commerce lifecycle, enabling agents to discover merchants, browse product catalogs, manage carts, and complete checkouts. AP2 addresses the security and authorization layer of agent-led transactions, shifting from click-to-buy to a contract conversation model.

AP2's core security mechanism uses Mandates, which are cryptographically signed digital contracts based on W3C Verifiable Credentials:

First, Intent Mandate: captures the user's initial instructions and sets rules for the agent. Second, Cart Mandate: created upon final approval, binding specific items and prices to the transaction. Third, Payment Mandate: authorizes payment against the Cart Mandate. The agent never touches raw payment credentials, maintaining PCI-DSS compliance. Merchants use double signature verification to cryptographically verify both purchase details and user authorization.

Threat scenarios in autonomous commerce include the collapse of traditional verification like 3D Secure since there is no human behind the agent, infinite loop orders where price-arbitrage and inventory-optimization agents order and cancel continuously, and the legal gray areas of liability for erroneous purchases.

Chapter Nine: MCP Vulnerability Analysis at the Connection Point.

In MCP architecture, the client or LLM pulls the tool list offered by the server, but decides through its own internal reasoning when and with what parameters to invoke a tool, making input filtering difficult.

Indirect Prompt Injection or IPI is the most vulnerable point in MCP security. When an agent processes a web page or email, it may encounter a malicious command hidden in the data source, such as instructions to run terminal commands. IPI bypasses traditional defenses because the malicious data comes from a source the system considers trusted, causing a confused deputy vulnerability where the attacker abuses the agent's high privileges to damage the system.

Let's explore the MCP attack vector map:

Threat 1, Tool Description Poisoning: malicious instructions are embedded directly in the JSON schema's description field. The LLM executes the hidden command as part of the task when reading the tool's definition.

Threat 2, Rug Pulls or Delayed Malice: an initially harmless MCP server is published to gain community trust, and is later swapped with a malicious update containing data exfiltration code.

Threat 3, Cross-Server Shadowing: a malicious server defines a tool with the same name as a legitimate one, tricking the LLM into calling its harmful version instead.

Threat 4, Sampling Conversation Hijacking: a malicious server abuses the sampling/createMessage feature to steal conversation history or inject persistent instructions into the LLM.

When autonomous agents interact with the real world, three critical risk factors converge: Data Access, Untrusted Content Exposure, and External Action Capability. This combination forms a lethal trifecta where a single poisoned prompt can produce real-world consequences.

Chapter Ten: Multi-Agent Security — A New Dimension.

Recognizing that agentic systems require a distinct security framework, OWASP published the Agentic Security Initiative or ASI risk taxonomy specifically for autonomous agents:

ASI01, Agent Goal Hijack: prompt injection manipulates an agent's objectives; it serves the attacker while believing it's following its original instructions. ASI02, Tool Misuse and Exploitation: agent is tricked into misusing authorized tools like APIs or code execution for data exfiltration. ASI03, Identity and Privilege Abuse: excessive agency or improper identity scoping leads to privilege escalation. ASI04, Agentic Supply Chain Vulnerabilities: compromised third-party agents, plugins, models, or dependencies. ASI05, Unexpected Code Execution: agents are manipulated to execute arbitrary code within or beyond sandboxed environments. ASI06, Memory and Context Poisoning: false information is seeded into RAG indexes or logs for long-term stealthy behavior manipulation.

The compromise of a single agent can trigger cascading failures in multi-agent systems. An external attacker uses indirect prompt injection to compromise an outer agent with low privilege. This outer agent performs trust exploitation to communicate with an inner agent that has high privilege, which then performs privilege escalation to compromise the critical system. This is enabled by implicit peer trust, where agents communicate autonomously withoutZero Trust boundaries.

Comparing traditional LLM security versus agentic or multi-agent security:

For Primary Concern: traditional LLM security focuses on input and output sanitization, while agentic security focuses on goal alignment and behavior control.

For State: traditional LLMs are stateless, while agentic systems are persistent with memory and long-term state.

For Execution: traditional models use passive generation, while agentic systems use active tool use and autonomy.

For Scope: traditional security deals with single model interaction, while agentic security handles interconnected agent chains or swarms.

For Trust Model: traditional security is mostly perimeter-based, while agentic security applies Zero Trust for agent-to-agent and agent-to-tool connections.

Chapter Eleven: Empirical Findings and Ecosystem Analysis.

Benchmark tests proved that MCP integration causes an average 9.5% performance drop across commercial LLMs. In LiveMCP-101 and MCP-Universe platforms, even advanced agents showed under 60% success rates on multi-step tasks.

For benchmark performance data: In Finance, GPT-4o achieved a 72.0% score using the AST Score metric. In File System, Qwen 2.5 max reached 88.7% using the Pass@1 metric. In Search, Claude 3.7 Sonnet scored 62.0% on Pass@1. In Financial Analysis, the OpenAI Agent SDK achieved a 60.0% Success Rate. In 3D Design, the OpenAI Agent SDK got a 36.84% Success Rate.

Analysis of GitHub repositories shows that only 5% of MCP-tagged repositories contain a functional server, the median code size of functional projects is 920 lines, and 5.5% of open-source MCP servers present tool poisoning risks. Furthermore, Sequential Tool Attack Chaining or STAC attacks combine innocent-looking steps like reading files and pinging external IPs to exfiltrate data.

To solve the context bloat problem where token consumption increases drastically, developers use the code execution paradigm in a sandbox. Direct Tool Calling consumes around 150 thousand tokens as raw data is sent to the LLM, whereas Code Execution or Code Mode consumes only about 2 thousand tokens, representing a 98.7% reduction by processing data locally and returning only the result.

Chapter Twelve: Real-World Application Domains.

In software development and DevOps, MCP enables the vibe coding paradigm where developers describe goals and agents write, test, and refactor code. Key examples include the lsp-mcp server bridging agent systems and code intelligence, and AWS or Kubernetes MCP servers for cloud infrastructure management.

In enterprise automation: Recruiting ATS data is analyzed to create data-driven shortlists. Supplier Negotiation emails and contracts are evaluated to build stronger negotiation positions. Compliance Auditing systems connect to SIEM for automated checks. Customer Support uses real-time access to CRM and databases for accurate responses.

In cybersecurity, dual-use technology is prominent. In the GTG-1002 Incident, recognized as the first documented autonomous AI cyberattack, attackers jailbroke Claude Code and used it in multi-stage penetration operations. On the defensive side, AI SOC agents aggregate telemetry for threat hunting, while on the offensive side, red teams use agents to run penetration testing tools.

Chapter Thirteen: Defensive Architecture.

Defending agentic systems requires a deep-in-defense model. The Multi-Layer Defense details include:

The Zero Trust Boundary layer isolates execution environments using gVisor, Firecracker micro-VMs, or restricted Docker containers. The ACM or Agentic Contract Model layer performs declarative auditing by passing tool calls through static, rules-based validation before execution. The Semantic WAF or LLM Guard layer provides prompt injection defense using systems like MCP-Guard or Llama Guard, achieving 96% detection accuracy. The Principle of Least Privilege layer restricts identity management using task-specific, time-limited, and scoped tokens.

For MCP-Guard performance: SQL Injection is detected with 96.31% accuracy, Shell Injection with 94.32% accuracy, and Shadow Takeover with 86.83% accuracy.

Information Flow Control and Taint Tracking tag incoming data as tainted and block critical actions without human approval. Enforcing OAuth 2.1 Resource Indicators prevents token forwarding abuse. Proactive Red Teaming using AutoMalTool shows that generated tools achieve over 86% evasion rates against static analysis tools, highlighting that current detection mechanisms are insufficient. Enterprise governance standards should rely on NIST AI RMF, ISO/IEC 42001, OWASP LLM Top 10, and OWASP ASI Top 10.

Chapter Fourteen: Conclusion — Security Standards for the Agentic Web.

The protocol ecosystem of agentic AI is maturing rapidly. MCP, A2A, ANP, UCP, and AP2 are together building the infrastructure of the Agentic Web.

In this ecosystem, security must be a foundational principle baked in from day one — Secure by Design. Cryptographic signing, built-in RBAC layers, SBOM validation, and standardized sandbox schemas developed by the Linux Foundation alongside Google, Anthropic, and Microsoft will form the cornerstones of safety.

As cybercriminals begin using AI agents for attack automation, defense mechanisms must operate at machine speed. Agentic SOCs running autonomous defense agents are the inevitable building blocks of this future.

Thanks for listening!
