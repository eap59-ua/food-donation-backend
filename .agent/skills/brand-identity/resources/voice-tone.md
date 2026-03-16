# Voice & Tone Specification — Generic Project Template

## 1) Purpose
Define a single, consistent voice and situational tone for **any text generated in the app** (UI labels, help text, errors, notifications, news, incident flows, survey copy, admin panels). This spec aims to remove ambiguity and ensure a coherent, accessible experience across contexts and UI states.

## 2) Brand Voice (Always-On Traits)
These traits apply **everywhere**, regardless of screen or feature:

- **Clear and functional**: states *what happened*, *what it means*, and *what to do next* (no fluff).
- **Warm and respectful**: friendly and polite, never patronizing.
- **Neutral and objective**: especially in “informational” communications (notices, status updates).
- **Privacy-rigorous**: avoid exposing personal data; do not “assume” identities or intentions.
- **Accessible**: simple, direct language; avoid unnecessary jargon; do not rely on color alone to communicate status.

## 3) Default Tone (Baseline)
- **Register:** professional-friendly (not cold corporate, not overly casual).
- **Grammatical person:** second person (“you”) for general UI.
- **Exceptions:**
  - Legal/consent texts: formal and impersonal tone.
  - Institutional announcements: use “the Institution” as the subject (“The Institution informs…”).

## 4) Language & Style Rules

### 4.1 Language and variants
- **Spanish (Spain)** by default.
- Avoid localisms that not everyone in the community will understand.

### 4.2 Clarity and length
- Short sentences (ideal: 8–18 words).
- One message = one main idea + one clear action.
- Avoid vague adjectives (“quick”, “easy”, “soon”) unless you can be specific.

### 4.3 Approved terminology (consistency)
- Use consistent terms: “Institution”, “community”, “members”, “administration/management”.
- Avoid: “customers”, “end users”, “ticket” (use “incident” or “request”).
- Keep section names exactly as they appear in the app (Home, News, Incidents, Events, Surveys, Useful information).

### 4.4 Capitalization and punctuation
- Titles: sentence case (capitalize only the first word, except acronyms/proper names).
- Buttons: imperative verb (“Save”, “Send”, “Publish”, “Close”).
- Avoid ALL CAPS (reads like shouting).
- Avoid emojis in UI; allow them only in news/notices if editorial style approves and they do not replace information.

### 4.5 Dates, times, numbers
- Date: `dd/mm/yyyy`.
- Time: 24h (`18:30`).
- Currency: `€` (optionally with a thin space: `10 €`).

## 5) Tone by UI State (State-Aware Copy)
Align tone with the component/flow state. Never hide what matters.

### 5.1 Default (rest)
- Neutral and direct.
- Example: “Save changes”, “View details”, “Add incident”.

### 5.2 Hover / Tooltip (if applicable)
- Micro-explanation, 1 sentence.
- Example: “Visible only to the administration.”

### 5.3 Focus / Keyboard navigation
- Avoid essential information that depends on hover.
- If there is contextual help, keep it readable and non-intrusive.

### 5.4 Disabled
- “Disabled” is not enough: explain why and how to enable it.
- Recommended format: **Reason + action**
- Example: “Add a title to be able to publish.”

### 5.5 Loading / Latency
- Reassuring, without time promises.
- Example: “Loading news…”, “Saving changes…”.

### 5.6 Success
- Confirm the outcome + optional next step.
- Example: “Incident submitted. You can view it in ‘My incidents’.”

### 5.7 Error
- Calm, no blame.
- Structure: **What happened + why (if known) + what to do**
- Example: “Couldn’t save. Check your connection and try again.”
- If support exists: add a short identifier (“Code: INC-1042”).

## 6) Content-Type Guidelines

### 6.1 News (informational editorial)
- Objective, verifiable, non-sensational.
- Include: **what, who (institution), when, where, impact/what it implies**.
- If it is opinion/call-to-action: label it clearly (“Call”, “Notice”, “Information note”).
- Avoid: rumors, accusations, polarizing language.

**Short template:**
- “The Institution informs: [fact]. [Date/time]. [Location]. [Action or link].”

### 6.2 Incidents (reporting)
- *Operational* empathy (acknowledge, then guide toward resolution).
- Do not assume blame or intent.
- Reinforce privacy: “Your data is used only to manage the incident.”
- If it is an emergency: clear escalation message.
  - Example: “If there is immediate risk, call 112.”

### 6.3 Events
- Clear and logistical: date, time, place, requirements, capacity if relevant.
- Explicit CTA: “Confirm attendance”, “Add to calendar”.

### 6.4 Surveys / Consultations
- Strict neutrality.
- Explain data use in 1–2 sentences: aggregated/anonymized if applicable.
- Avoid leading or biased framing in the intro text.

### 6.5 Administration (admin panel)
- Technical-operational tone, no embellishment.
- Prefer action verbs: “Approve”, “Reject”, “Archive”, “Export CSV”.
- For high-impact actions: state the consequence.
  - Example: “Deleting will also remove associated responses.”

## 7) Accessibility & Inclusion Rules (Non-negotiable)
- Do not rely on color alone to convey meaning: always text + (if needed) icon + aria-label.
- Avoid metaphors, irony, and sarcasm (harder to understand).
- Avoid stigmatizing or blaming language.
- Error messages must suggest a solution; never “Unknown error” without an alternative action.

## 8) Privacy & Safety Copy
- Do not display unnecessary personal data.
- In public lists: use initials or an alias when appropriate.
- For sensitive actions: confirm with a second step (“Are you sure you want to delete…?”).

## 9) Quality Checklist (Before publishing any text)
- Is it understandable at a glance?
- Is it specific (no vagueness)?
- Does it indicate the next action?
- Does it respect terminology consistency?
- Does it work for error/loading/disabled states?
- Does it avoid blame and protect privacy?
- Is it accessible (not color-dependent / no ALL CAPS)?

## 10) Examples Library (Ready-to-use)
- Empty state (News): “No news has been published yet. Check back later.”
- Empty state (Incidents): “You have no open incidents. Want to create a new one?”
- Auth required: “Sign in to view this section.”
- Permission denied: “You don’t have permission to perform this action.”
- Network error: “No connection. Check your network and try again.”
- Success publish: “Published successfully.”
- Confirm delete: “Delete this incident? This action can’t be undone.”
