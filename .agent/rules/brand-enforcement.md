---
trigger: always_on
---

# Brand Enforcement — Cross-layer (Mandatory)

## Scope
This rule applies to ALL tickets and fixes (DB, BE, FE, OTH) that:
- define user-visible states, messages, labels, or flows
- expose enums or statuses consumed by the UI
- modify UI components or layout
- fix UI-related bugs (even minor ones)

## Mandatory Requirements
The agent MUST:
1. Load `@/.agent/rules/brand-guidelines.md`
2. Activate the `brand-identity` skill
3. Treat brand as a cross-layer invariant 

## Blocking Rule
If brand alignment cannot be verified, the task MUST STOP
and ask the user how to proceed.
