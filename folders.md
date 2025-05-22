ultimate-resume-maker/
│
├── src/                           # Core logic for orchestration
│   ├── prompt-builder/            # Prompt generation
│   ├── inference/                 # Call LLM + clean response
│   ├── jd-nlp/                    # JD parsing + NLP
│   ├── file-handler/              # I/O (read JSON, save tex, copy LaTeX templates)
│   └── index.js                   # Main CLI runner
│
├── input/
│   ├── job-description.txt
│   ├── data/                      # All JSON inputs (resume data)
│   │   ├── basics.json
│   │   ├── skills.json
│   │   ├── education.json
│   │   ├── experience.json
│   │   ├── projects.json
│   │   └── certifications.json
│   └── template/                  # LaTeX template (dynamic .tex and class files)
│       ├── main.tex
│       └── sections/
│
├── output/
│   ├── resume.tex
│   └── resume.pdf
│
├── .env
├── README.md
├── package.json
└── utils/
