# AI generation

Gemini is not connected in the foundation phase. The case form does not call an API; it displays a status message instead of pretending to generate or save a case.

Planned pipeline:

1. Validate and normalize the scenario and options on the server.
2. Generate and validate case metadata, suspects, and one canonical solution.
3. Generate evidence using that established solution as fixed context.
4. Validate suspect/evidence references, chronology, evidence count, and solution consistency.
5. Persist the completed investigation, or report a generation failure without marking it complete.

Retry limits, prompt templates, model selection, output schemas, and consistency checks must be specified when the Gemini integration is implemented. Image and CCTV representations must accurately identify generated media versus textual or placeholder evidence.
