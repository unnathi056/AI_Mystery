# Data models

No application collections are created in the foundation phase. Mongoose is used only to connect and report connection health.

The planned investigation model must persist case metadata, generation status, suspects, evidence, timeline, canonical solution, progress, accusation, and reveal result. The canonical culprit and solution explanation must be excluded from all pre-reveal API projections. The model design should enforce unique suspect/evidence IDs and references and retain generation failure details without storing secrets.
