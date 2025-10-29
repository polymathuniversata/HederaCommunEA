# Research Templates

This file contains templates and checklists for the research phase of the Hedera Africa Hackathon.

## Repository Research Template

### Repo Analysis Template

**Repository:** [GitHub URL]  
**Purpose:** [Brief description]  

**Key Files to Examine:**
- README.md: Overview and setup
- package.json: Dependencies and scripts
- src/: Main code structure
- examples/: Usage examples
- docs/: Documentation

**Relevant Code Snippets:**
- [Copy/paste key functions or classes]
- [Notes on how they work]

**Integration Ideas:**
- How to use in our project
- Required dependencies
- Configuration needed

**Questions for AI:**
- "Explain how [function] works"
- "How to integrate [repo] with Hedera SDK"

## Hedera Service Research Checklist

### HTS (Token Service) Research
- [ ] Read official documentation
- [ ] Clone SDK examples
- [ ] Test basic token creation locally
- [ ] Understand fees and limits
- [ ] Note differences from Ethereum tokens

### Consensus Service Research
- [ ] Understand consensus vs traditional messaging
- [ ] Test topic creation and submission
- [ ] Learn about consensus timestamps
- [ ] Research use cases for supply chain

### Smart Contracts Research
- [ ] When to use vs HTS
- [ ] Solidity basics for Hedera
- [ ] Deployment process
- [ ] Gas costs and optimization

### AI Agent Kit Research
- [ ] Available operations
- [ ] Natural language commands
- [ ] Integration with MCP servers
- [ ] Examples for each track

## Resource Organization Template

### Research Notes Structure

```
research/
├── notes.md (General findings)
├── hedera-services/
│   ├── hts-notes.md
│   ├── consensus-notes.md
│   └── smart-contracts-notes.md
├── tools/
│   ├── ai-tools.md
│   ├── cli-tools.md
│   └── development-tools.md
└── examples/
    ├── cloned-repos/
    └── code-snippets/
```

## AI Research Assistant Prompts

### Documentation Summary
"Summarize the Hedera [service] documentation, focusing on [specific aspect] for a beginner."

### Code Explanation
"Explain this code snippet from the Hedera SDK: [paste code]. How would I modify it for [use case]?"

### Feasibility Assessment
"Based on Hedera docs, is [idea] technically feasible? What services and steps are required?"

### Learning Path
"Create a learning path for understanding Hedera development, starting from zero coding experience."