---
name: managing-notebooklm
description: Automates interaction with Google NotebookLM via MCP. Use this skill when the user wants to research topics, manage notebooks, generate content (audio/video overviews, reports), or query existing sources using NotebookLM.
---

# Managing NotebookLM

This skill provides a comprehensive interface for interacting with Google NotebookLM through the Model Context Protocol (MCP). It enables deep research, content generation, and knowledge base management.

## When to use this skill
- **Deep Research**: When the user needs to investigate a topic thoroughly using web search or Drive documents.
- **Content Generation**: When the user wants to turn notes into Audio Overviews, Video Overviews, Study Guides, FAQs, or Briefing Docs.
- **Knowledge Management**: When the user needs to organize, query, or synthesize information from multiple sources (PDFs, URLs, etc.).
- **Notebook Administration**: When creating, renaming, or cleaning up notebooks and sources.

## Workflows

### 1. Deep Research Flow (Finding New Information)
Use this flow when the user wants to learn about a **new** topic or find **new** sources.

1.  **Start Research**: Use `research_start` with `mode="deep"` (web only) or `mode="fast"`.
    *   *Tip*: Specify `notebook_id` if adding to an existing notebook, otherwise a new one is created.
2.  **Poll Status**: Loop `research_status` until `status="completed"`.
    *   *Note*: This tool blocks by default up to `max_wait` seconds, so a single call might be enough.
3.  **Import Sources**: Use `research_import` to add the discovered sources to the notebook.
    *   *Tip*: You can filter sources using `source_indices` if the research found irrelevant items.

### 2. Knowledge Query Flow (Q&A on Existing Sources)
Use this flow when the user asks questions about documents **already added** to a notebook.

1.  **List Notebooks** (Optional): Use `notebook_list` to find the correct `notebook_id`.
2.  **Verify Sources** (Optional): Use `notebook_get` or `source_list_drive` to ensure the relevant documents are present.
    *   *Tip*: Use `source_sync_drive` if Drive documents might be stale.
3.  **Query**: Use `notebook_query` to ask specific questions.
    *   *Note*: This uses RAG (Retrieval-Augmented Generation) on the notebook's sources.

### 3. Content Studio Flow (Generating Artifacts)
Use this flow to create consumable media from the notebook's content.

1.  **Select Format**: Choose the appropriate tool based on user request:
    *   **Audio/Podcasts**: `audio_overview_create` (formats: `deep_dive`, `brief`, etc.)
    *   **Video**: `video_overview_create` (formats: `explainer`, `brief`; styles: `whiteboard`, `anime`, etc.)
    *   **Visuals**: `infographic_create`, `slide_deck_create`, `mind_map_create`
    *   **Study Aids**: `flashcards_create`, `quiz_create`, `data_table_create`
    *   **Documents**: `report_create`
2.  **Confirm**: All creation tools require `confirm=True` after explicit user approval.
3.  **Check Status**: Use `studio_status` to retrieve the URLs of generated assets (Audio/Video).

### 4. Authentication Management
The primary authentication source is the file `/Users/ccachero/.notebooklm-mcp/auth.json`.

**When encountering 401/403 errors or initial setup:**
1.  **Load Credentials**: View the content of `/Users/ccachero/.notebooklm-mcp/auth.json`.
2.  **Inject Session**: Use the `save_auth_tokens` tool.
    *   Map JSON `cookie` -> tool arg `cookies`
    *   Map JSON `csrf_token` (or `X-Chrzd`) -> tool arg `csrf_token`
3.  **Refresh**: Call `refresh_auth` to finalize the session restore.
4.  **Emergency Fallback**: If the file is missing or checks fail, ask the user to run `notebooklm-mcp-auth` in their terminal to regenerate the JSON.

## Tool Reference Guide

### Core Management
- `notebook_create(title)`: Create a new workspace.
- `notebook_list()`: See all available notebooks.
- `notebook_delete(id, confirm)`: Remove a notebook (Irreversible).
- `notebook_rename(id, title)`: Change title.
- `chat_configure(id, goal, prompt)`: Customize the system prompt/persona for the notebook chat.

### Source Management
- `notebook_add_url(id, url)`: Add web pages or YouTube videos.
- `notebook_add_text(id, text)`: Add raw text / copy-paste.
- `notebook_add_drive(id, doc_id)`: Add Google Docs/Slides/PDFs from Drive.
- `source_get_content(id)`: Retrieve raw text of a specific source.
- `source_delete(id)`: Remove a source.

### Advanced Features
- `research_start`: The entry point for the "Deep Research" agentic capability.
- `studio_status`: The dashboard for checking generation progress of Audio/Video.
