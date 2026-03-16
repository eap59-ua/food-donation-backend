---
trigger: always_on
---

## 0) Global DoD (applies to everything)

A work item is not "Done" unless all of these are true:

- **Conforms to workspace rules:** `.agent/rules/architecture.md`, `.agent/rules/OperationalPhilosophy.md` and `.agent/rules/techstack.md` are respected.
- **No broken build:** project starts, runs, and basic flows work locally.
- **No known errors:** no unhandled exceptions in backend logs; no runtime errors in browser console for the implemented flow.
- **Documentation is consistent:** relevant specs are updated (only with explicit developer authorization).
- **No pending critical feedback:** if a PR exists, critical review findings are addressed (or explicitly documented as accepted risk).

---

## 1) Ticket DoD

A **ticket** can be marked as Done when:

- **Scope implemented:** all ticket acceptance points are implemented (no partial delivery hidden as Done).
- **Code + tests produced:** code is implemented and meaningful automated tests exist for the ticket scope (unit/integration as appropriate).
- **Architecture boundaries respected:** no business logic in Presentation; no direct DB access from Presentation; dependencies follow the defined layers.
- **Data changes are safe:** if the ticket changes persistence, migrations (Alembic) are created/updated and can be applied cleanly.
- **Commit quality:** changes are committed with a clear message; commits are limited to the ticket scope.


---

## 2) User Story DoD

A **user story** can be marked as Done when:

- **All tickets completed:** every ticket linked to the story is Done (or explicitly descoped with rationale).
- **Acceptance criteria satisfied:** story-level acceptance criteria are met end-to-end.
- **End-to-end tests produced:** meaningful happy path automated E2E tests exist for the user story scope.
- **Regression check:** no regressions observed in related flows (at minimum: navigation + authentication + main happy path).
- **Docs updated (if needed):** story status/progress is reflected in the feature specs (only with explicit developer authorization).



---

## 3) Feature DoD

A **feature** can be marked as Done when:

- **Feature scope delivered:** all user stories for the feature are Done (or explicitly descoped with rationale).
- **Feature documentation is correct:** `feature-descr.md`, `user-stories.md`, `tickets.md` reflect the implemented reality.
- **Security posture preserved:** feature does not weaken auth/authorization rules; protected actions remain protected.
- **Quality gates pass:** tests run successfully; no critical lints/type checks failing (per techstack).
- **PR review completed:** PR is opened, CodeRabbit (or equivalent) feedback is addressed, and remaining issues are either fixed or documented.
- **Merge readiness:** feature branch is up to date with `main` and the merge does not introduce conflicts or broken behavior.




## 4) Quick checklists 

### Ticket Done checklist (short)
- [ ] Scope implemented
- [ ] Tests added/updated
- [ ] Layer boundaries respected
- [ ] Migrations updated (if needed)
- [ ] Commit created

### User Story Done checklist (short)
- [ ] All tickets done
- [ ] Acceptance criteria met
- [ ] End-to-end test happy path added/updated
- [ ] No regressions observed
- [ ] Specs updated (if authorized)

### Feature Done checklist (short)
- [ ] All stories done
- [ ] Feature docs match reality
- [ ] Security preserved
- [ ] Quality gates pass
- [ ] PR review feedback addressed
- [ ] Ready to merge