# AI MYSTERY ROOM
## Master Specification Document
**Purpose:** Single Source of Truth for Codex  
**Development Methodology:** Spec-Driven Development (SDD)  
**Application Type:** AI-Powered Interactive Mystery Investigation Web Application  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI Provider:** Google Gemini API  
**Primary Language:** English  
**Document Version:** 1.0  
**Status:** Initial Development Specification

---

# 1. PROJECT OVERVIEW

## 1.1 Project Name

**AI Mystery Room**

## 1.2 Project Vision

AI Mystery Room is an interactive web application that allows users to create and solve fictional mystery investigations using artificial intelligence.

Users provide a short story, scenario, or mystery premise. The application uses Google Gemini to transform the user's input into an interactive investigation containing:

- A fictional crime or mysterious incident.
- A collection of suspects.
- A hidden culprit.
- Suspect profiles and statements.
- AI-generated investigation evidence.
- Simulated WhatsApp conversations.
- Images and visual clues.
- CCTV-style investigation footage or representations.
- Timelines and alibis.
- An interactive investigation interface.
- A final culprit-selection mechanism.
- An AI-generated explanation of the solution.

The user examines the evidence, compares suspect statements, identifies contradictions, and selects the person they believe is responsible.

The application then reveals whether the user's selection is correct and explains the reasoning using evidence established in the investigation.

**Core principle:** AI Mystery Room should feel like an interactive detective investigation rather than a simple chatbot or multiple-choice quiz.

## 1.3 Problem Statement

Traditional mystery games frequently rely on predetermined stories, fixed evidence, and limited replayability.

AI Mystery Room addresses this limitation by generating fictional investigation scenarios dynamically from user-provided premises.

The application combines AI-assisted storytelling, structured evidence generation, interactive investigation tools, and logical culprit identification to create a more personalized mystery-solving experience.

## 1.4 Project Objectives

The application must:

1. Allow users to create investigations from short descriptions.
2. Generate coherent fictional mysteries using Gemini.
3. Establish the culprit and underlying solution before generating the evidence.
4. Generate multiple suspects with distinct identities, motives, and alibis.
5. Present evidence through different investigation formats.
6. Allow users to explore evidence before making a decision.
7. Ensure evidence remains consistent with the established solution.
8. Let users select a suspect as the culprit.
9. Evaluate the user's answer against the predetermined culprit.
10. Explain the solution by referencing the available evidence.
11. Save investigations and progress in MongoDB.
12. Provide a responsive, attractive, detective-themed user interface.
13. Handle AI failures, invalid responses, and incomplete evidence gracefully.

---

# 2. TARGET USERS

The application is intended for:

- Mystery and detective-story enthusiasts.
- Casual gamers.
- Students interested in interactive storytelling.
- Users who enjoy solving puzzles and fictional crimes.
- Users who want to create personalized mystery challenges.

The application should be usable by people without technical knowledge.

---

# 3. CORE USER EXPERIENCE

The application follows this primary journey:

**Landing Page → Create Mystery → AI Generation → Investigation Room → Examine Evidence → Select Culprit → Reveal Solution → View Results**

## 3.1 User Journey

### Step 1: Open the Application

The user visits the landing page.

The landing page displays:

- Application name and branding.
- A short description of the experience.
- A prominent "Create a Mystery" button.
- An optional "Continue Investigation" section for saved investigations.
- A section explaining how the game works.

### Step 2: Create a Mystery

The user selects "Create a Mystery."

The application opens a mystery creation form.

Required input:

- Scenario or story description.

Optional inputs:

- Mystery title.
- Mystery genre.
- Difficulty level.
- Preferred setting.
- Number of suspects.

Suggested genres:

- Murder Mystery.
- Theft.
- Missing Person.
- Corporate Espionage.
- Historical Mystery.
- Cybercrime.
- General Detective Mystery.

Difficulty levels:

- Easy.
- Medium.
- Hard.

Suspect count:

- Minimum: 3.
- Default: 4.
- Maximum: 6.

The application should validate the scenario before sending it to Gemini.

### Step 3: Generate the Investigation

When the user submits the form:

1. Validate the input on the frontend.
2. Send the request to the backend.
3. Validate and normalize the request on the backend.
4. Create a generation job or investigation record.
5. Ask Gemini to generate a structured mystery.
6. Validate the generated mystery.
7. Establish and verify the culprit, motives, timeline, and evidence.
8. Generate the investigation evidence.
9. Save the investigation in MongoDB.
10. Return the investigation identifier and status.

Display a progress interface while generation is running.

Example progress messages:

- Creating the case.
- Introducing suspects.
- Establishing the timeline.
- Preparing evidence.
- Organizing the investigation room.

These messages are interface indicators, not claims that a particular AI operation has completed. The application must track actual generation status.

If generation fails, display a useful error message and allow the user to retry.

### Step 4: Enter the Investigation Room

After successful generation, the user enters the investigation interface.

The room should display:

- Case title.
- Case description.
- Incident summary.
- Incident date and time, when relevant.
- Location.
- Suspect list.
- Evidence collection.
- Investigation timeline.
- Case notes.
- Investigation completion status.
- A button to submit the final accusation.

The culprit must remain hidden until the user submits their answer or explicitly abandons the investigation.

### Step 5: Investigate the Evidence

The user opens evidence items individually.

Each item should have:

- Evidence title.
- Evidence category.
- Evidence description.
- Evidence content or media.
- Time and location, when relevant.
- Relevant people or suspects.
- Investigative significance, without automatically revealing the solution.
- Optional connections to other evidence.

Evidence should be presented in an immersive, readable format.

### Step 6: Select the Culprit

Once the user is ready, they select "Submit Accusation."

The application displays the available suspects.

The user selects one suspect and confirms their decision.

The application records the accusation and evaluates it against the stored solution.

### Step 7: Reveal the Solution

After the accusation is submitted, display:

- The actual culprit.
- Whether the user's answer was correct.
- The culprit's motive.
- The method used to commit the fictional incident.
- The sequence of events.
- The decisive clues.
- Contradictions in suspect statements.
- An explanation connecting the evidence to the culprit.
- The user's final result.

The explanation must use the investigation's existing evidence and solution.

It must not invent new evidence after the answer is submitted to justify the result.

### Step 8: Continue Playing

Provide options to:

- Return to the investigation.
- Review all evidence.
- Start a new mystery.
- Replay an investigation, if replay is supported.
- Return to the dashboard.

---

# 4. FUNCTIONAL REQUIREMENTS

## FR-01: Mystery Creation

The system must allow users to create a mystery from a text description.

Acceptance criteria:

- The scenario field cannot be empty.
- The scenario has a configurable maximum length.
- The server validates the scenario independently of frontend validation.
- Invalid submissions receive a clear error message.
- The application supports the specified genres and difficulty levels.
- The system creates a unique investigation ID for each new case.

Recommended initial scenario limit: 2,000 characters.

## FR-02: AI Mystery Generation

Gemini must generate a structured investigation from the submitted scenario.

The generated investigation must contain:

1. Case metadata.
2. Incident description.
3. Suspect profiles.
4. Culprit identity.
5. Motives.
6. Suspect statements.
7. Timeline.
8. Evidence items.
9. Relationships between evidence and suspects.
10. A solution explanation.
11. A logical explanation of why the culprit is responsible.

The backend must validate the generated response before accepting it.

The AI must not be allowed to change the culprit during later evidence generation.

## FR-03: Suspect Generation

Each mystery must contain 3–6 suspects.

Every suspect must have:

- Unique ID.
- Name.
- Age, if appropriate.
- Occupation or role.
- Relationship to the incident.
- Motive or possible motive.
- Alibi.
- Statement.
- Relevant background information.
- Publicly visible profile.
- Optional portrait or avatar.

The culprit must be one of the established suspects.

Suspects should have believable personalities and different levels of apparent suspicion.

The culprit must not be identified through an obvious label or interface element before the solution is revealed.

## FR-04: Evidence Generation

The application must support multiple evidence categories.

### A. Simulated WhatsApp Messages

Display fictional conversations in a chat-style interface.

Each conversation should include:

- Conversation ID.
- Participants.
- Message text.
- Timestamp.
- Optional attachment.
- Relevant suspect references.

Messages should be displayed in chronological order.

The interface may resemble a messaging application, but must identify the conversation as fictional evidence.

The system must not connect to real WhatsApp accounts or access real messages.

### B. Images

Examples:

- A photograph from the fictional crime scene.
- A photograph of an object.
- An image showing a suspicious detail.
- A fictional surveillance still.
- An image of a document or note.

Each image must have:

- Evidence ID.
- Title.
- Description.
- Media URL or storage reference.
- Generation status.
- Associated time and location, if applicable.
- Related suspect IDs.

Images must not contradict the established mystery.

If an image-generation service is unavailable, the system must display a clear placeholder or another supported evidence format instead of pretending that an image was generated.

### C. CCTV-Style Evidence

The application must support surveillance-style evidence.

Possible representations include:

- CCTV still images.
- Timestamped surveillance frames.
- Short generated video clips.
- A sequence of still frames presented as a surveillance review.
- A textual surveillance report.

**Important implementation distinction:** Gemini's text-generation API must not be assumed to generate video files. Video generation requires a separately supported model or service, if available to the project.

For the initial release, CCTV-style evidence may consist of timestamped still images and structured surveillance reports.

If actual video generation is integrated later, it must use a dedicated media-generation adapter.

### D. Documents

Examples:

- Investigation reports.
- Receipts.
- Letters.
- Notes.
- Access logs.
- Transaction records.
- Fictional case documents.

Documents should be readable within the application.

### E. Witness Statements

Each statement should contain:

- Statement ID.
- Witness or suspect ID.
- Statement text.
- Time of statement.
- Optional contradictions.
- Related evidence references.

### F. Physical Evidence

Examples:

- Objects found at the scene.
- Keys.
- Broken items.
- Clothing.
- Tools.
- Footprints.
- Other relevant objects.

Physical evidence should be represented through a description and, when available, an image.

## FR-05: Evidence Consistency

Evidence consistency is a critical system requirement.

The system must establish the solution before generating the final evidence collection.

All subsequent evidence generation must use the same canonical case information.

Requirements:

- The culprit cannot change during evidence generation.
- The incident timeline must remain consistent.
- Suspect identities must remain consistent.
- Evidence timestamps must not contradict established events.
- The same person cannot be in two incompatible locations at the same time unless the story explains it.
- The culprit's motive must be compatible with the case.
- Evidence must support a reasoned solution.
- Contradictions must be intentional and explainable.
- The final explanation must reference existing evidence.

The application should perform deterministic validation wherever possible.

Gemini can assist with semantic consistency checks, but the system must not rely exclusively on an AI-generated statement that the case is consistent.

## FR-06: Investigation Room

The investigation room must provide an interface for exploring the generated case.

Required features:

- Suspect cards.
- Evidence gallery.
- Evidence details.
- Message viewer.
- Image viewer.
- CCTV-style viewer.
- Timeline.
- Case notes.
- Accusation button.
- Case progress indicator.

The user must be able to navigate between evidence items without losing their investigation progress.

## FR-07: Case Notes

Users should be able to record their theories.

Each note should contain:

- Note ID.
- Investigation ID.
- Text.
- Creation timestamp.
- Updated timestamp.

Notes must be associated with the correct investigation.

Users should be able to create, edit, and delete their own notes.

## FR-08: Culprit Selection

The application must allow one final accusation per investigation in the initial release.

The backend must validate:

- The investigation exists.
- The investigation has completed generation.
- The selected suspect belongs to that investigation.
- The user has permission to submit the accusation.
- The investigation has not already been finalized.

The backend must compare the selected suspect ID against the stored culprit ID.

The correctness check must be deterministic.

Gemini must not decide whether the user's answer is correct.

## FR-09: Solution Reveal

After submission, the application reveals the stored solution.

The result must include:

- Selected suspect.
- Actual culprit.
- Correct or incorrect status.
- Explanation.
- Motive.
- Timeline of the incident.
- Decisive evidence.
- Relevant contradictions.

The explanation may be generated or refined by Gemini, but it must be grounded in the canonical solution and evidence.

The application must not expose the hidden solution through ordinary investigation API responses before submission.

## FR-10: Persistence

The system must save:

- Investigation metadata.
- Suspects.
- Canonical solution.
- Evidence.
- Generation status.
- User notes.
- Accusation.
- Final result.
- Timestamps.

A completed investigation should remain available after the page is refreshed.

## FR-11: Error Handling

The system must handle:

- Invalid input.
- Gemini API failures.
- API rate limits.
- Timeouts.
- Malformed AI responses.
- Database errors.
- Media-generation failures.
- Missing evidence files.
- Unauthorized requests.
- Invalid investigation IDs.

Errors must be logged on the backend without exposing sensitive internal details to users.

## FR-12: Fictional Content Disclosure

The application must clearly identify investigations and evidence as fictional, AI-generated, or AI-assisted, as appropriate.

It must not present generated evidence as authentic evidence from a real crime.

Simulated WhatsApp messages and CCTV representations must not be confused with real communications or recordings.

---

# 5. NON-FUNCTIONAL REQUIREMENTS

## NFR-01: Performance

- The interface must remain responsive during AI generation.
- Long-running generation must not block the frontend.
- Use loading states and meaningful progress indicators.
- Paginate or lazily load evidence when necessary.
- Avoid unnecessarily large media downloads.
- Configure API timeouts and retry limits.

AI generation time may vary depending on the model, prompt size, service availability, and number of evidence items.

Do not promise a fixed generation time without measurements.

## NFR-02: Reliability

- Validate every AI-generated object before saving it.
- Use a clear generation-state model.
- Prevent duplicate case creation caused by accidental repeated submissions.
- Store successful generation results before returning success.
- Allow safe recovery from partial failures.
- Do not mark a case as completed until its required data has been validated and saved.

## NFR-03: Security

- Keep Gemini API keys on the backend.
- Never expose API keys through React environment variables intended for browser delivery.
- Validate and sanitize user input.
- Use secure database access patterns.
- Restrict access to private investigation data.
- Apply request rate limits.
- Limit request body sizes.
- Protect authentication endpoints if authentication is implemented.
- Avoid storing unnecessary personal information.

## NFR-04: Usability

- Provide clear navigation.
- Use readable text and accessible contrast.
- Support keyboard navigation.
- Display useful validation messages.
- Provide responsive layouts for desktop, tablet, and mobile.
- Keep the main investigation workflow understandable to first-time users.

## NFR-05: Maintainability

- Separate frontend and backend code.
- Separate API routes, controllers, services, and database models.
- Keep Gemini integration in a dedicated service layer.
- Define shared data contracts.
- Use environment variables for configuration.
- Document setup and execution.
- Avoid large monolithic components and files.

## NFR-06: Testability

- Use deterministic tests for culprit evaluation.
- Test input validation.
- Test AI response validation using fixed fixtures.
- Test evidence consistency rules.
- Test API authorization.
- Test generation failures.
- Test the full investigation workflow.

---

# 6. TECHNOLOGY STACK

## 6.1 Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Frontend development and build tooling |
| React Router | Page navigation |
| Axios or Fetch | Backend communication |
| CSS Modules, Tailwind CSS, or equivalent | Styling |
| Lucide React or equivalent | Icons |

Use TypeScript throughout the frontend.

Select one styling system and use it consistently. Do not install multiple overlapping styling frameworks without a clear requirement.

## 6.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API server |
| TypeScript | Type-safe backend code |
| Mongoose | MongoDB object modeling |
| Google Gemini SDK | AI integration |
| Zod or equivalent | Request and response validation |
| dotenv | Environment configuration |
| Pino or equivalent | Structured logging |

Use the current, supported Google Gemini SDK and model identifiers documented by Google when implementation begins.

Do not hardcode an assumed model name if the configured model may change.

## 6.3 Database

**MongoDB** will store the application's structured data.

Use MongoDB Atlas or a local MongoDB instance.

The database should support:

- Investigations.
- Suspects.
- Evidence.
- Canonical solutions.
- Investigation progress.
- User notes.
- Accusations.
- Generation status.

For the initial implementation, investigation data may be stored as related MongoDB documents or embedded subdocuments.

Choose the simplest design that preserves data integrity and supports the expected evidence volume.

## 6.4 AI Integration

**Google Gemini** will handle:

- Scenario interpretation.
- Mystery generation.
- Suspect creation.
- Evidence generation.
- Narrative consistency assistance.
- Solution explanations.
- Optional hint generation.

The backend must own all AI calls.

The frontend must never call Gemini directly using a private API key.

## 6.5 Optional Media Generation

Actual image and video generation may require capabilities beyond the selected text-generation model.

Implement media generation through a separate service interface.

For example:

- `ImageGenerationProvider`
- `VideoGenerationProvider`

The first implementation may use an available image-generation service, supported generated assets, or placeholders.

Do not introduce a paid media provider without making it an explicit configuration and deployment decision.

---

# 7. SYSTEM ARCHITECTURE

## 7.1 High-Level Architecture

```text
+--------------------------------------+
|             USER                     |
+------------------+-------------------+
                   |
                   v
+--------------------------------------+
|          REACT FRONTEND              |
|                                      |
|  Landing Page                        |
|  Mystery Creation                    |
|  Investigation Room                  |
|  Evidence Viewer                     |
|  Culprit Selection                   |
|  Solution Reveal                     |
+------------------+-------------------+
                   |
                   | HTTPS / REST API
                   v
+--------------------------------------+
|          EXPRESS BACKEND             |
|                                      |
|  API Routes                          |
|  Controllers                         |
|  Input Validation                    |
|  Investigation Service               |
|  Evidence Service                    |
|  Accusation Service                  |
|  Gemini Service                      |
|  Media Provider Adapters             |
+-----------+--------------------------+
            |                 |
            v                 v
+--------------------+  +----------------------+
|      MONGODB       |  |   GOOGLE GEMINI      |
|                    |  |                      |
| Investigations     |  | Mystery Generation   |
| Suspects           |  | Evidence Generation  |
| Evidence           |  | Consistency Review   |
| Notes              |  | Solution Explanation |
| Results            |  |                      |
+--------------------+  +----------------------+
            |
            v
+--------------------------------------+
|       OPTIONAL MEDIA STORAGE         |
|                                      |
| Generated Images                     |
| CCTV-Style Media                     |
| Document Attachments                 |
+--------------------------------------+
```

## 7.2 Architectural Rules

1. React must communicate with the backend through documented APIs.
2. Express must validate all client requests.
3. Gemini requests must originate from the backend.
4. MongoDB must persist the canonical mystery and its solution.
5. Culprit evaluation must be deterministic.
6. AI-generated output must be validated before it is trusted.
7. Media generation must be independent of the core investigation engine.
8. The hidden solution must never be sent to the frontend before reveal.
9. Frontend components must not contain database access logic.
10. API routes must not contain large AI prompts or business logic directly.

---

# 8. RECOMMENDED PROJECT STRUCTURE

Codex must follow this structure unless a documented technical reason requires a change.

```text
ai-mystery-room/
│
├── README.md
├── SPEC.md
├── package.json
├── .gitignore
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATA_MODELS.md
│   ├── AI_GENERATION.md
│   └── TESTING.md
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       │
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   ├── mystery/
│       │   ├── suspects/
│       │   ├── evidence/
│       │   └── investigation/
│       │
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── CreateMysteryPage.tsx
│       │   ├── InvestigationPage.tsx
│       │   ├── ResultsPage.tsx
│       │   └── NotFoundPage.tsx
│       │
│       ├── services/
│       │   ├── apiClient.ts
│       │   ├── mysteryService.ts
│       │   └── evidenceService.ts
│       │
│       ├── hooks/
│       ├── types/
│       ├── utils/
│       └── styles/
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   │
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       │
│       ├── config/
│       │   ├── database.ts
│       │   └── environment.ts
│       │
│       ├── routes/
│       │   ├── health.routes.ts
│       │   ├── mystery.routes.ts
│       │   ├── evidence.routes.ts
│       │   ├── accusation.routes.ts
│       │   └── notes.routes.ts
│       │
│       ├── controllers/
│       ├── services/
│       │   ├── mystery.service.ts
│       │   ├── evidence.service.ts
│       │   ├── accusation.service.ts
│       │   ├── consistency.service.ts
│       │   └── solution.service.ts
│       │
│       ├── ai/
│       │   ├── gemini.client.ts
│       │   ├── prompts/
│       │   ├── schemas/
│       │   └── generation.service.ts
│       │
│       ├── media/
│       │   ├── image.provider.ts
│       │   ├── video.provider.ts
│       │   └── media.service.ts
│       │
│       ├── models/
│       │   ├── Investigation.ts
│       │   ├── Suspect.ts
│       │   ├── Evidence.ts
│       │   ├── Note.ts
│       │   └── Accusation.ts
│       │
│       ├── middleware/
│       │   ├── errorHandler.ts
│       │   ├── validateRequest.ts
│       │   └── rateLimiter.ts
│       │
│       ├── validators/
│       ├── utils/
│       └── tests/
│
└── shared/
    └── types/
```

The root package may provide scripts to run both applications together.

Keep frontend and backend independently installable and executable.

Do not create empty folders or placeholder modules that serve no purpose.

---

# 9. DATABASE SPECIFICATION

## 9.1 Investigation Model

Collection: `investigations`

Suggested schema:

```typescript
interface Investigation {
  _id: string;

  title: string;
  originalScenario: string;

  genre: string;
  difficulty: "easy" | "medium" | "hard";

  status:
    | "queued"
    | "generating"
    | "validating"
    | "completed"
    | "failed";

  generationStage?: string;
  generationError?: string;

  incident: {
    type: string;
    description: string;
    location: string;
    occurredAt?: string;
  };

  suspectIds: string[];
  evidenceIds: string[];

  canonicalSolution: {
    culpritId: string;
    motive: string;
    method: string;
    timeline: Array<{
      time: string;
      event: string;
    }>;
    reasoning: string;
  };

  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
```

**Security requirement:** `canonicalSolution` is backend-only data until the reveal condition is satisfied.

Never return this complete database document directly from a public API.

Create explicit response DTOs that exclude confidential fields.

## 9.2 Suspect Model

Collection: `suspects`

```typescript
interface Suspect {
  _id: string;
  investigationId: string;

  name: string;
  age?: number;
  occupation: string;
  relationshipToIncident: string;

  background: string;
  possibleMotive: string;
  alibi: string;
  statement: string;

  portraitUrl?: string;

  isCulprit: boolean;

  createdAt: Date;
}
```

The `isCulprit` field must never be included in the normal suspect-list API response.

The backend must use the canonical solution as the authoritative answer.

The suspect model and canonical solution must remain synchronized.

## 9.3 Evidence Model

Collection: `evidence`

```typescript
interface Evidence {
  _id: string;
  investigationId: string;

  title: string;

  type:
    | "chat"
    | "image"
    | "cctv"
    | "document"
    | "witness_statement"
    | "physical";

  description: string;

  content: Record<string, unknown>;

  mediaUrl?: string;
  thumbnailUrl?: string;

  timestamp?: string;
  location?: string;

  relatedSuspectIds: string[];

  generationStatus:
    | "pending"
    | "generating"
    | "completed"
    | "failed";

  createdAt: Date;
}
```

The `content` field must be validated according to the evidence type.

Do not accept arbitrary, unvalidated objects from the frontend as trusted evidence.

## 9.4 Example Chat Evidence

```json
{
  "conversationId": "conversation_01",
  "participants": [
    {
      "suspectId": "suspect_01",
      "displayName": "Alex"
    },
    {
      "suspectId": "suspect_02",
      "displayName": "Jordan"
    }
  ],
  "messages": [
    {
      "id": "message_01",
      "senderId": "suspect_01",
      "text": "Did you leave the office already?",
      "timestamp": "2026-10-20T18:30:00Z"
    },
    {
      "id": "message_02",
      "senderId": "suspect_02",
      "text": "Not yet. I need to finish something.",
      "timestamp": "2026-10-20T18:32:00Z"
    }
  ]
}
```

All participants, messages, and timestamps must belong to the fictional case.

## 9.5 Note Model

Collection: `notes`

```typescript
interface Note {
  _id: string;
  investigationId: string;

  ownerId?: string;
  sessionId?: string;

  text: string;

  createdAt: Date;
  updatedAt: Date;
}
```

If the application initially supports anonymous users, notes must be associated with a securely managed session.

Do not treat a client-supplied `ownerId` as proof of ownership.

## 9.6 Accusation Model

Collection: `accusations`

```typescript
interface Accusation {
  _id: string;
  investigationId: string;

  ownerId?: string;
  sessionId?: string;

  selectedSuspectId: string;

  isCorrect: boolean;

  submittedAt: Date;
}
```

The result must be calculated on the backend.

Do not accept an `isCorrect` value supplied by the frontend.

For the initial release, enforce one finalized accusation per investigation session.

---

# 10. AI GENERATION PIPELINE

This section defines the most important backend workflow.

## 10.1 Generation Order

The generation process must follow this order:

**Stage 1: Interpret Scenario**

Read and normalize the user's story.

Extract:

- Main incident.
- Setting.
- Important characters.
- Desired mystery genre.
- Relevant constraints.

**Stage 2: Create the Canonical Case**

Generate the complete underlying solution before generating evidence.

Establish:

- The incident.
- The actual culprit.
- The culprit's motive.
- How the incident occurred.
- The sequence of events.
- The suspects.
- Each suspect's knowledge.
- Each suspect's alibi.
- The important facts of the investigation.

Save this canonical structure on the backend.

**Stage 3: Generate Suspect Profiles**

Generate the public profiles and statements for the established suspects.

Validate the suspect count and ensure that the culprit exists.

**Stage 4: Generate the Timeline**

Create a chronological account of relevant events.

Validate the timeline against the canonical solution and suspect alibis.

**Stage 5: Generate Evidence**

Generate a collection of evidence items based on the canonical case.

Recommended initial target: 6–10 evidence items per investigation.

A typical case could include:

- Two simulated chat conversations.
- Two images or image descriptions.
- One CCTV-style report.
- One witness statement.
- One physical evidence item.
- One relevant document.

These are defaults, not mandatory requirements for every mystery.

The exact evidence composition may vary by genre.

**Stage 6: Validate Evidence**

Check:

- All referenced suspects exist.
- All timestamps are valid.
- All references point to the current investigation.
- No evidence directly reveals the answer through accidental metadata.
- Evidence is compatible with the timeline.
- The solution can be reasonably inferred from the evidence.
- The evidence does not depend on facts that were never established.

**Stage 7: Generate Media**

Generate supported images or other media.

If media generation fails, preserve the textual evidence and mark the media as unavailable or failed.

The entire investigation should not fail merely because an optional image could not be generated.

**Stage 8: Save and Complete**

Persist the validated data.

Set the investigation status to `completed` only after all required core data is saved.

Optional media may have individual failure statuses without blocking completion.

## 10.2 Gemini Response Format

Require structured JSON output for all generation stages.

Use the supported structured-output functionality of the configured Gemini model where available.

Validate responses against application-owned schemas.

Do not rely on extracting JSON from arbitrary Markdown or assuming that every model response is valid JSON.

If a response is invalid:

1. Record the validation failure.
2. Attempt a bounded repair or regeneration.
3. Validate the repaired response.
4. Stop after the configured retry limit.
5. Mark the job as failed if required data cannot be generated.

Recommended maximum: two repair or regeneration attempts per failed generation stage, configurable by the backend.

## 10.3 Canonical Solution Protection

The canonical solution is the source of truth for the investigation.

The following values must remain stable after the case is established:

- Culprit ID.
- Incident identity.
- Essential timeline.
- Culprit's motive.
- Core explanation of the incident.

If a consistency check fails, regenerate the conflicting evidence rather than silently changing the canonical solution.

Any intentional regeneration of the entire case must create a new case version or investigation.

## 10.4 Hint Generation

Hints are an optional feature for a later iteration.

If implemented, hints must be grounded in existing evidence.

Suggested hint levels:

- Hint 1: General investigative direction.
- Hint 2: Relevant evidence category.
- Hint 3: A specific contradiction or clue.

Hints must not reveal the culprit immediately unless the user explicitly requests the solution.

## 10.5 Prompt Management

Store prompts in dedicated backend files.

Each prompt must define:

- Its purpose.
- Required inputs.
- Expected output schema.
- Consistency constraints.
- Fictional-content requirements.
- Failure conditions.

Do not embed all generation prompts in Express route handlers.

Version the prompts so changes can be tested and compared.

---

# 11. API SPECIFICATION

Base URL:

```text
/api/v1
```

All responses must use consistent JSON structures.

## 11.1 Health Check

### GET `/api/v1/health`

Purpose: Check backend availability.

Success response:

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

The health check should not expose API keys, database credentials, or internal configuration.

## 11.2 Create Mystery

### POST `/api/v1/mysteries`

Request:

```json
{
  "scenario": "A valuable painting disappears from a locked gallery during a private exhibition.",
  "genre": "theft",
  "difficulty": "medium",
  "suspectCount": 4
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "investigationId": "generated-investigation-id",
    "status": "queued"
  }
}
```

The backend may begin generation asynchronously.

The client must not assume that the investigation is ready immediately.

## 11.3 Check Generation Status

### GET `/api/v1/mysteries/:id/status`

Response:

```json
{
  "success": true,
  "data": {
    "investigationId": "generated-investigation-id",
    "status": "generating",
    "stage": "Generating evidence"
  }
}
```

The client should poll at a reasonable interval or use another documented progress mechanism.

If polling is used, avoid excessive request frequency.

## 11.4 Retrieve Investigation

### GET `/api/v1/mysteries/:id`

Returns the public investigation information.

Includes:

- Case metadata.
- Incident description.
- Suspect profiles.
- Evidence summary.
- Timeline information appropriate for the investigation stage.
- Current progress.

Must exclude:

- `canonicalSolution.culpritId`.
- `isCulprit`.
- Private solution reasoning.
- Any internal field that reveals the answer before submission.

## 11.5 List Evidence

### GET `/api/v1/mysteries/:id/evidence`

Returns evidence summaries for the specified investigation.

The server must verify access and exclude confidential solution fields.

## 11.6 Retrieve Evidence Details

### GET `/api/v1/mysteries/:id/evidence/:evidenceId`

Returns the detailed content of a single evidence item.

The evidence must belong to the specified investigation.

Return `404` when the requested resource does not exist or is not accessible.

## 11.7 Submit Accusation

### POST `/api/v1/mysteries/:id/accusation`

Request:

```json
{
  "selectedSuspectId": "suspect-id"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "isCorrect": false,
    "selectedSuspectId": "suspect-id",
    "solutionAvailable": true
  }
}
```

The initial response should not contain the complete hidden solution unless the accusation workflow explicitly finalizes the investigation and permits the reveal.

## 11.8 Reveal Solution

### GET `/api/v1/mysteries/:id/solution`

Returns the canonical solution after the reveal condition is satisfied.

The server must verify that the investigation has been finalized or abandoned according to the application's rules.

Response:

```json
{
  "success": true,
  "data": {
    "culpritId": "suspect-03",
    "motive": "The culprit wanted to conceal a financial discrepancy.",
    "method": "The culprit used a temporary access opportunity.",
    "timeline": [],
    "reasoning": "The decisive evidence contradicts the culprit's stated alibi.",
    "decisiveEvidenceIds": [
      "evidence-04",
      "evidence-07"
    ]
  }
}
```

The above response is an illustrative example, not a predetermined case.

## 11.9 Create Note

### POST `/api/v1/mysteries/:id/notes`

Request:

```json
{
  "text": "The witness statement conflicts with the CCTV timestamp."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "noteId": "note-id",
    "text": "The witness statement conflicts with the CCTV timestamp."
  }
}
```

## 11.10 Update Note

### PATCH `/api/v1/mysteries/:id/notes/:noteId`

Updates a note owned by the current user or session.

## 11.11 Delete Note

### DELETE `/api/v1/mysteries/:id/notes/:noteId`

Deletes an authorized note.

## 11.12 Standard Error Format

All API errors should follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please provide a valid mystery scenario."
  }
}
```

Use appropriate HTTP status codes.

Examples:

- `400`: Invalid request.
- `401`: Authentication required, if applicable.
- `403`: Authenticated or identified user lacks permission.
- `404`: Resource not found.
- `409`: Conflicting state or duplicate finalized accusation.
- `413`: Request body too large.
- `429`: Rate limit exceeded.
- `500`: Unexpected server error.
- `502` or `503`: Appropriate upstream AI-service failure response.

Do not expose stack traces or provider secrets in API responses.

---

# 12. FRONTEND PAGE SPECIFICATION

## 12.1 Landing Page

Route:

```text
/
```

Required components:

- Navigation bar.
- Logo and application name.
- Hero section.
- Main call-to-action.
- Brief feature overview.
- How-it-works section.
- Example mystery cards.
- Footer.

The design should communicate investigation, suspense, and discovery.

The page should not be cluttered with excessive animations.

## 12.2 Create Mystery Page

Route:

```text
/create
```

Required components:

- Scenario textarea.
- Genre selector.
- Difficulty selector.
- Suspect-count selector.
- Create button.
- Form validation.
- Loading state.
- Error state.

The interface should clearly communicate that the mystery and evidence are fictional.

## 12.3 Investigation Page

Route:

```text
/investigation/:id
```

Suggested layout:

```text
+----------------------------------------------------------+
| Case Title                         Investigation Status  |
+------------------+-----------------------+---------------+
|                  |                       |               |
| SUSPECTS         | CASE OVERVIEW         | CASE NOTES    |
|                  |                       |               |
| Suspect Cards    | Timeline              | Add Note      |
|                  |                       |               |
+------------------+-----------------------+---------------+
|                                                          |
|                   EVIDENCE COLLECTION                    |
|                                                          |
| Chats | Images | CCTV | Documents | Statements | Objects |
|                                                          |
+----------------------------------------------------------+
|                   SUBMIT ACCUSATION                      |
+----------------------------------------------------------+
```

This is a logical layout reference, not a requirement to reproduce the exact geometry.

The interface should adapt to smaller screens.

On mobile, use stacked sections, tabs, or drawers.

## 12.4 Evidence Viewer

The evidence viewer must select a component based on evidence type.

| Evidence type | Display component |
|---|---|
| Chat | Chat conversation viewer |
| Image | Image viewer with zoom |
| CCTV | Video player or surveillance-frame viewer |
| Document | Document reader |
| Witness statement | Statement card |
| Physical evidence | Evidence detail card |

The application must handle missing media and unavailable files gracefully.

## 12.5 Accusation Interface

Display all suspects with:

- Name.
- Portrait or avatar.
- Short profile.
- Selection control.

After selection, ask the user to confirm their accusation.

The user should not be able to accidentally submit multiple conflicting accusations.

## 12.6 Results Page

Route:

```text
/investigation/:id/results
```

Display:

- Success or failure indicator.
- Selected suspect.
- Actual culprit.
- Motive.
- Incident timeline.
- Decisive clues.
- Evidence-based explanation.
- Option to revisit evidence.
- Option to create another mystery.

The result must remain available after refreshing the page.

---

# 13. UI DESIGN SYSTEM

## 13.1 Visual Direction

The application should have a polished detective-investigation aesthetic.

Suggested style:

- Dark investigation-room interface.
- Charcoal or deep navy backgrounds.
- Muted neutral surfaces.
- Restrained amber or red accents.
- Clear typography.
- Evidence cards with distinct categories.
- Subtle borders and shadows.
- Carefully controlled transitions.

The application should look like a modern interactive detective platform, not a generic administration dashboard.

## 13.2 Design Principles

1. Prioritize readability over decoration.
2. Make the current case and investigation status easy to identify.
3. Clearly distinguish suspects, evidence, and conclusions.
4. Avoid revealing the culprit through visual styling.
5. Use consistent spacing and typography.
6. Provide hover, focus, selected, disabled, loading, and error states.
7. Avoid unnecessary animations that delay investigation.
8. Make all important actions accessible on mobile.

## 13.3 Reusable Components

Build reusable components such as:

- `AppLayout`
- `Navbar`
- `MysteryCard`
- `SuspectCard`
- `EvidenceCard`
- `EvidenceGrid`
- `ChatEvidenceViewer`
- `ImageEvidenceViewer`
- `CCTVViewer`
- `DocumentViewer`
- `Timeline`
- `CaseNotes`
- `GenerationProgress`
- `AccusationModal`
- `SolutionReveal`
- `LoadingState`
- `ErrorState`
- `EmptyState`

Do not place the entire application inside one large React component.

---

# 14. SECURITY AND PRIVACY RULES

These requirements are mandatory.

## 14.1 API Key Protection

The Gemini API key must exist only in the backend environment.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_configured_model
MONGODB_URI=your_mongodb_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

The values are placeholders.

Never commit a real `.env` file to source control.

Provide a `.env.example` file without secrets.

## 14.2 Input Validation

Validate:

- Scenario length.
- Genre.
- Difficulty.
- Suspect count.
- IDs.
- Notes.
- Accusation payloads.
- AI-generated JSON.
- Evidence content.

Do not trust browser validation alone.

## 14.3 AI Output Validation

AI-generated output is untrusted input until validated.

The backend must validate:

- Data types.
- Required fields.
- Field lengths.
- Enum values.
- Suspect references.
- Evidence references.
- Timestamp formats.
- Culprit membership.
- Evidence consistency.

## 14.4 Hidden Solution Protection

Before the reveal:

- Do not return the culprit ID.
- Do not return the private solution.
- Do not return the `isCulprit` field.
- Do not include hidden solution data in HTML or client-side state.
- Do not expose solution data through debugging endpoints.
- Do not use frontend-only checks to protect the solution.

## 14.5 User-Generated Scenarios

Treat the scenario as user content, not as instructions that can override the application's generation rules.

The AI generation pipeline must continue to follow the application's structured output requirements and fictional-content constraints.

## 14.6 Fictional Evidence

All generated chats, images, documents, and surveillance representations must belong to the fictional investigation.

Do not automatically use real people's identities or real private communications as evidence.

Do not imply that the application can access real CCTV systems or private messaging accounts.

---

# 15. ERROR AND FAILURE HANDLING

## 15.1 Gemini Failure

If Gemini is unavailable:

- Preserve the generation job and its status.
- Display a clear error.
- Allow a bounded retry.
- Avoid creating duplicate completed cases.
- Log the error safely.

## 15.2 Partial Media Failure

If an image or video cannot be generated:

- Keep the underlying evidence record.
- Set its media status to failed.
- Display a placeholder or textual alternative.
- Allow retrying the media-generation operation if supported.

A failed optional media request must not invalidate an otherwise complete case.

## 15.3 Invalid AI Output

If required AI fields are missing:

1. Validate the output.
2. Identify the invalid fields.
3. Attempt bounded repair.
4. Revalidate.
5. Fail safely if the output remains invalid.

Do not silently fill essential fields with arbitrary values that could change the solution.

## 15.4 Database Failure

If saving the investigation fails:

- Do not report successful completion.
- Log the failure.
- Return an appropriate error.
- Ensure the investigation does not remain falsely marked as completed.

## 15.5 Network Interruption

If the browser loses connection during generation:

- The generation job should continue when possible.
- The client should be able to check the status again.
- Refreshing the page should not automatically create a second case.

---

# 16. TESTING REQUIREMENTS

Codex must implement tests alongside the corresponding features.

## 16.1 Unit Tests

Test:

- Scenario validation.
- Suspect-count validation.
- AI response validation.
- Evidence reference validation.
- Timeline consistency checks.
- Culprit evaluation.
- Solution access rules.
- Note ownership checks.
- Generation status transitions.

## 16.2 Integration Tests

Test:

- Mystery creation API.
- Investigation retrieval.
- Evidence retrieval.
- Accusation submission.
- Solution reveal.
- Note creation and modification.
- MongoDB persistence.
- Gemini service failure handling.

Use mocked Gemini responses in automated tests.

Automated tests must not depend on live AI API calls.

## 16.3 Frontend Tests

Test:

- Mystery form validation.
- Generation loading states.
- Investigation rendering.
- Evidence viewer selection.
- Accusation submission.
- Solution reveal.
- API error messages.

## 16.4 End-to-End Tests

The main end-to-end test must verify this workflow:

1. Open the application.
2. Enter a mystery scenario.
3. Submit the scenario.
4. Wait for generation to complete.
5. Open the investigation.
6. Inspect suspects.
7. Open multiple evidence items.
8. Submit an accusation.
9. View the result.
10. Refresh the page.
11. Verify that the result remains available.

## 16.5 Critical Security Tests

The test suite must verify:

- The culprit is absent from public suspect responses.
- The canonical solution is not returned before reveal.
- A nonexistent suspect cannot be accused.
- A suspect from another investigation cannot be selected.
- An accusation cannot be submitted twice when the case is finalized.
- A user cannot modify another user's notes.
- Malformed AI responses are rejected.
- Client-supplied correctness values are ignored.

---

# 17. IMPLEMENTATION PHASES

Codex must implement the project incrementally.

Do not attempt to generate the entire application in one unverified step.

## Phase 1: Project Foundation

Implement:

- Root project setup.
- React + TypeScript + Vite frontend.
- Express + TypeScript backend.
- MongoDB connection.
- Environment configuration.
- Health endpoint.
- Error handling.
- Basic responsive layout.

**Completion condition:** Both applications start successfully, the backend connects to MongoDB, and the health endpoint works.

## Phase 2: Frontend Experience

Implement:

- Landing page.
- Mystery creation form.
- Investigation page layout.
- Suspect cards.
- Evidence cards.
- Results page layout.
- Loading and error states.

Use clearly identified sample data for initial UI development.

Do not present sample data as successfully generated live AI content.

**Completion condition:** The main pages work with sample data and are responsive.

## Phase 3: Gemini Integration

Implement:

- Gemini client.
- Scenario interpretation.
- Canonical case generation.
- Suspect generation.
- Timeline generation.
- Evidence generation.
- Structured output validation.
- Retry handling.

**Completion condition:** A user can submit a scenario and receive a validated investigation generated through the configured Gemini model.

## Phase 4: Evidence and Investigation

Implement:

- Evidence persistence.
- Evidence API.
- Chat viewer.
- Image viewer.
- CCTV-style viewer.
- Document viewer.
- Timeline.
- Case notes.

**Completion condition:** The user can inspect the generated investigation and its evidence.

## Phase 5: Accusation and Solution

Implement:

- Culprit selection.
- Server-side answer evaluation.
- Solution reveal.
- Evidence-based explanation.
- Result persistence.
- Duplicate-submission protection.

**Completion condition:** The user can complete an investigation and see the correct final result.

## Phase 6: Media Generation

Implement:

- Media provider interfaces.
- Image generation where supported.
- Media storage.
- Media status tracking.
- CCTV-style stills or supported video integration.
- Fallback behavior.

**Completion condition:** Supported media can be displayed, and unavailable media does not break the investigation.

## Phase 7: Quality Assurance

Implement:

- Automated tests.
- Security tests.
- End-to-end tests.
- Error-state verification.
- Responsive layout verification.
- README and setup instructions.
- Final acceptance checks.

**Completion condition:** All critical acceptance criteria pass, and the project can be started using documented commands.

---

# 18. ACCEPTANCE CRITERIA

The project is considered ready for its initial release only when all mandatory criteria below are satisfied.

| ID | Acceptance criterion | Priority |
|---|---|---|
| AC-01 | User can enter a scenario and create a mystery | Critical |
| AC-02 | Gemini generates a structured fictional investigation | Critical |
| AC-03 | Every investigation contains 3–6 suspects | Critical |
| AC-04 | A single canonical culprit is established | Critical |
| AC-05 | Evidence is linked to the correct investigation | Critical |
| AC-06 | Evidence does not contradict the canonical solution in critical facts | Critical |
| AC-07 | User can open and inspect multiple evidence types | Critical |
| AC-08 | User can select a suspect and submit an accusation | Critical |
| AC-09 | The backend evaluates the accusation correctly | Critical |
| AC-10 | The application reveals the solution after finalization | Critical |
| AC-11 | The solution explanation references existing evidence | Critical |
| AC-12 | Investigation data persists in MongoDB | Critical |
| AC-13 | The culprit is not exposed through public APIs before reveal | Critical |
| AC-14 | AI failures are handled without corrupting case data | Critical |
| AC-15 | The frontend is responsive | High |
| AC-16 | Case notes can be saved and edited | High |
| AC-17 | Generated images can be displayed when supported | High |
| AC-18 | CCTV-style evidence has a working initial representation | High |
| AC-19 | Automated tests cover the core workflow | Critical |
| AC-20 | Setup instructions allow a developer to run the project | Critical |

Actual AI-generated video is not a mandatory initial-release criterion.

The initial CCTV-style evidence viewer can use timestamped images and structured reports.

---

# 19. INITIAL RELEASE SCOPE

## Must Have

- Responsive landing page.
- Scenario submission.
- Genre and difficulty selection.
- Gemini-powered case generation.
- 3–6 suspects.
- Canonical culprit and solution.
- At least 6 validated evidence items per successfully generated standard investigation.
- Simulated WhatsApp conversations.
- Image evidence or clearly identified fallback.
- CCTV-style still images or reports.
- Evidence viewer.
- Timeline.
- Culprit selection.
- Deterministic answer evaluation.
- Solution reveal.
- MongoDB persistence.
- API validation.
- Error handling.
- README and environment setup instructions.
- Automated tests for critical behavior.

The evidence count should be enforced only when the required evidence items can be generated and validated. If the generation pipeline fails, the application must report the failure instead of claiming that a complete case was created.

## Should Have

- Case notes.
- Difficulty-aware evidence complexity.
- Generation progress.
- Evidence filtering.
- Saved investigation history.
- Image zoom.
- Better mobile experience.
- Optional hints.

## Could Have Later

- User accounts.
- Leaderboards.
- Multiplayer investigations.
- Timed challenges.
- Achievement system.
- Custom mystery templates.
- User-created mystery sharing.
- Actual generated video evidence.
- Voice recordings and voice-based interrogation.
- Multiple languages.
- Community-created cases.

## Out of Scope for the Initial Release

- Real police investigations.
- Access to real CCTV systems.
- Access to real WhatsApp accounts.
- Real criminal-record searches.
- Real-world culprit identification.
- Automatic publication of user-created cases.
- Multiplayer functionality unless separately specified.

---

# 20. CONFIGURATION AND ENVIRONMENT

Create `backend/.env.example`.

Example:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/ai-mystery-room

GEMINI_API_KEY=
GEMINI_MODEL=

FRONTEND_URL=http://localhost:5173

MAX_SCENARIO_LENGTH=2000
MIN_SUSPECTS=3
MAX_SUSPECTS=6
DEFAULT_SUSPECTS=4

MAX_GENERATION_RETRIES=2
```

The configured Gemini model must be selected based on current API availability and supported capabilities.

The application must validate required environment variables during startup.

If a required configuration is missing, the backend must provide a clear startup error without printing secrets.

Do not commit API keys, database credentials, or private configuration files.

---

# 21. DEFINITION OF DONE

A feature is complete only when:

1. Its requirements are understood.
2. Its API contract is defined, when applicable.
3. Its data model is defined, when applicable.
4. Its implementation follows the project architecture.
5. Input validation is implemented.
6. Error handling is implemented.
7. Tests are written and pass.
8. The frontend is connected to the correct backend endpoint.
9. The feature works with persisted data where required.
10. Security requirements are satisfied.
11. Documentation is updated when the architecture or behavior changes.

A page that looks correct but uses nonfunctional buttons, fake API responses, or unconnected sample data is not considered complete.

---

# 22. CODEX DEVELOPMENT RULES

These rules govern how Codex must work on the project.

## Rule 1: Treat SPEC.md as the Source of Truth

`SPEC.md` defines the expected behavior, features, architecture, and acceptance criteria.

Do not invent major features that are not required by this specification.

## Rule 2: Inspect Before Modifying

Before implementing a feature:

- Inspect the existing folder structure.
- Read the relevant source files.
- Check the existing package configuration.
- Identify implemented features.
- Identify missing requirements.
- Avoid overwriting working code unnecessarily.

## Rule 3: Follow Spec-Driven Development

For each feature:

1. Identify the relevant requirements in `SPEC.md`.
2. Define or confirm the expected behavior.
3. Define the data and API contracts.
4. Implement the feature.
5. Write or update tests.
6. Run the tests.
7. Fix failures.
8. Update the implementation status.

## Rule 4: Do Not Fake Functionality

Do not:

- Hardcode a successful Gemini response in production.
- Pretend a media file has been generated when it has not.
- Return fabricated database records from a real API endpoint.
- Mark failed generation jobs as completed.
- Claim tests passed without running them.
- Display a culprit-selection result without backend evaluation.

Sample data is allowed for UI development, but it must be clearly separated from production functionality.

## Rule 5: Preserve the Canonical Solution

Once an investigation's canonical solution is established, all subsequent stages must use it.

Never independently regenerate the culprit during evidence generation or solution explanation.

## Rule 6: Validate Every Boundary

Validate user input, API payloads, database references, and AI-generated output.

Do not trust data merely because it came from the backend's AI provider.

## Rule 7: Keep the Code Modular

Keep routes, controllers, services, models, AI prompts, and UI components separated.

Avoid unnecessarily large files.

## Rule 8: Do Not Expose Secrets

Keep all private credentials in backend environment variables.

Do not commit secrets or expose them to the browser.

## Rule 9: Avoid Unnecessary Dependencies

Before adding a package, determine whether an existing dependency already provides the required functionality.

Use supported, maintained libraries.

## Rule 10: Verify Changes

After every implementation phase:

- Run the relevant tests.
- Check TypeScript errors.
- Check frontend and backend builds.
- Verify the relevant user workflow.
- Fix regressions before proceeding.

## Rule 11: Document Deviations

If a requirement cannot be implemented as written, document:

- The original requirement.
- The technical limitation.
- The proposed alternative.
- The effect on other features.
- The tests required.

Do not silently change the specification.

## Rule 12: Keep Documentation Synchronized

When an approved implementation change modifies the requirements or architecture, update `SPEC.md` and any affected documentation.

The specification must describe the actual agreed behavior, not an outdated design.

---

# 23. REQUIRED PROJECT DOCUMENTATION

Codex must maintain the following files.

### `SPEC.md`

The authoritative requirements and behavior specification.

### `README.md`

Must include:

- Project description.
- Technology stack.
- Prerequisites.
- Installation instructions.
- Environment setup.
- How to start the frontend.
- How to start the backend.
- How to run tests.
- Troubleshooting.

### `docs/ARCHITECTURE.md`

Must describe:

- System architecture.
- Frontend/backend separation.
- AI integration.
- Database responsibilities.
- Media-generation integration.
- Security boundaries.

### `docs/API.md`

Must document:

- API endpoints.
- Request schemas.
- Response schemas.
- Error codes.
- Authorization requirements.
- Solution-reveal rules.

### `docs/DATA_MODELS.md`

Must document the database models and relationships.

### `docs/AI_GENERATION.md`

Must document:

- Generation stages.
- Prompt organization.
- Output validation.
- Retry policies.
- Consistency checks.
- Media-generation fallbacks.

### `docs/TESTING.md`

Must document:

- Test commands.
- Unit-test coverage.
- Integration tests.
- End-to-end tests.
- Known limitations.

---

# 24. FIRST IMPLEMENTATION TASK FOR CODEX

Codex must not immediately generate the entire project without verification.

Start with the following task.

## Task: Foundation and Architecture Setup

1. Inspect the current repository.
2. Determine whether the project is empty or already contains code.
3. Create the required folder structure.
4. Set up the React + TypeScript + Vite frontend.
5. Set up the Express + TypeScript backend.
6. Configure MongoDB connection handling.
7. Create the environment-variable example file.
8. Implement the health endpoint.
9. Implement shared error handling.
10. Add basic frontend routing.
11. Create the initial landing page.
12. Add the mystery creation page with frontend validation.
13. Write the README setup instructions.
14. Add initial tests.
15. Run the frontend and backend builds.
16. Verify the health endpoint and database connection.
17. Report completed work and any blockers.

Do not implement fake Gemini integration during this phase.

Do not claim that mystery generation works until the real backend integration is implemented and verified.

---

# 25. FINAL PROJECT PRINCIPLES

Every implementation decision must follow these principles:

**1. Coherent mysteries:** Every investigation must have a consistent underlying solution.

**2. Evidence-based reasoning:** The user must be able to reach a reasoned conclusion from the evidence provided.

**3. Hidden solution:** The culprit must remain confidential until the reveal condition is satisfied.

**4. Deterministic evaluation:** Correctness must be calculated by the backend, not guessed by AI.

**5. AI-assisted creativity:** Gemini generates the story and evidence, while application code enforces structure and critical rules.

**6. Reliable persistence:** Completed investigations and results must survive page refreshes.

**7. Honest media generation:** The application must distinguish generated media from placeholders and textual representations.

**8. Modular architecture:** Frontend, backend, database, AI, and media generation must have clear responsibilities.

**9. Testable implementation:** Critical functionality must have automated tests.

**10. Specification-driven development:** The implementation must remain aligned with this document.

---

# FINAL INSTRUCTION TO CODEX

Use this specification as the authoritative source for the AI Mystery Room project.

Build the application incrementally, beginning with the project foundation and proceeding through the implementation phases.

Before implementing any feature, identify its requirements and acceptance criteria. Define the necessary API and data contracts, implement the feature, test it, and update the documentation.

Do not skip backend validation, database persistence, solution protection, or error handling to make the interface appear complete.

Do not substitute hardcoded responses for required live functionality.

If a technical limitation or ambiguity prevents correct implementation, explain the issue and propose the smallest appropriate change rather than silently deviating from the specification.

**The final objective is a functional, maintainable, responsive AI Mystery Room web application in which users can submit a story, investigate a coherent fictional case, examine AI-generated evidence, identify the culprit, and receive a logically supported explanation of the solution.**