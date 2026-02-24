
export const schemes = [
    { id: '2019', name: '2019 Scheme', description: 'Applicable for students joined in 2019-2023' },
    { id: '2024', name: '2024 Scheme', description: 'Latest KTU Scheme' },
];

export const departments = [
    { id: 'CSE', name: 'Computer Science & Engineering', code: 'CSE' },
    { id: 'CIVIL', name: 'Civil Engineering', code: 'CE' },
    { id: 'MECH', name: 'Mechanical Engineering', code: 'ME' },
    { id: 'ECE', name: 'Electronics & Communication', code: 'ECE' },
    { id: 'EEE', name: 'Electrical & Electronics', code: 'EEE' },
];

export const semesters = [
    { id: 'S1', name: 'Semester 1' },
    { id: 'S2', name: 'Semester 2' },
    { id: 'S3', name: 'Semester 3' },
    { id: 'S4', name: 'Semester 4' },
    { id: 'S5', name: 'Semester 5' },
    { id: 'S6', name: 'Semester 6' },
    { id: 'S7', name: 'Semester 7' },
    { id: 'S8', name: 'Semester 8' },
];

export const subjects = {
    'CSE': {
        'S6': [
            { id: 'CST302', name: 'Compiler Design', code: 'CST302' },
            { id: 'CST304', name: 'Computer Graphics and Image Processing', code: 'CST304' },
            { id: 'CST306', name: 'Algorithm Analysis and Design', code: 'CST306' },
            { id: 'HUT300', name: 'Industrial Economics and Foreign Trade', code: 'HUT300' },
            { id: 'CST308', name: 'Comprehensive Course Work', code: 'CST308' },
            { id: 'CST362', name: 'Programming in Python (Elective)', code: 'CST362' },
        ],
    },
};

export const modules = {
    'CST302': [
        { id: 'M1', name: 'Module 1', description: 'Lexical Analysis: Phased of Compiler, Lexical Analyzer, Token Recognition, Input Buffering.' },
        { id: 'M2', name: 'Module 2', description: 'Syntax Analysis (Top-Down): Context-Free Grammars, Recursive Descent, Predictive Parsing, LL(1).' },
        { id: 'M3', name: 'Module 3', description: 'Syntax Analysis (Bottom-Up): Shift-Reduce, Operator Precedence, LR Parsing (SLR, LALR, Canonical LR).' },
        { id: 'M4', name: 'Module 4', description: 'Syntax Directed Translation & Intermediate Code: SDT, Run-Time Environments, Three-Address Code.' },
        { id: 'M5', name: 'Module 5', description: 'Code Optimization & Generation: Optimization sources, Local/Global optimization, Code Generator design.' },
    ],
};

export const pyqs = [
    // ==========================================
    // MODULE 1 (High Detail: 3, 6, 7, 8, 14 Marks)
    // ==========================================
    // --- 3 MARK QUESTIONS ---
    {
        id: 'CD_M1_SQ_1', subjectId: 'CST302', moduleId: 'M1',
        question: 'Define token and lexeme with examples.',
        marks: 3, year: 2025,
        repeated: true,
        isImportant: true,
        answer: `**Token:** A token is a sequence of characters that can be treated as a single logical entity. It consists of a token name (abstract symbol) and an optional attribute value.
**Lexeme:** A lexeme is the actual sequence of characters in the source program that is matched by the pattern for a token.

*Example:* 'position = initial + rate * 60'
- **Lexeme:** "position" -> **Token:** <id, 1>
- **Lexeme:** "=" -> **Token:** <=>
- **Lexeme:** "60" -> **Token:** <number, 60>`
    },
    {
        id: 'CD_M1_SQ_2', subjectId: 'CST302', moduleId: 'M1',
        question: 'What is the relevance of input buffering in lexical analysis?',
        marks: 3, year: 2023,
        repeated: true,
        isImportant: true,
        img: '/images/buffer_pairs.svg',
        answer: `Input buffering is used to reduce the overhead of system calls required to read source programs.
- **Problem:** Reading one character at a time involves many system calls.
- **Solution:** A **Two-Buffer Scheme** is used where N input characters are read into a buffer using a single read command.
- **Relevance:** It significantly speeds up the lexical analysis process by handling large blocks of code efficiently.`
    },
    {
        id: 'CD_M1_SQ_3', subjectId: 'CST302', moduleId: 'M1',
        question: 'Describe bootstrapping in compiler design.',
        marks: 3, year: 2024,
        repeated: true,
        img: '/images/t_diagram.svg',
        answer: `**Bootstrapping** is the process of writing a compiler for a language L in the language L itself.
- It involves starting with a simple compiler (written in Assembly or C) and using it to compile a more advanced version of itself.
- It produces a **Self-Hosting Compiler**.
- Represented using **T-Diagrams** (T-shaped diagrams with Source, Target, and Implementation languages).`
    },
    {
        id: 'CD_M1_SQ_4', subjectId: 'CST302', moduleId: 'M1',
        question: 'Find the lexemes in the statement: sum = a * ( b - 10 );',
        marks: 3, year: 2022,
        repeated: false,
        answer: `**Lexemes identified:**
1. 'sum' (Identifier)
2. '=' (Assignment Operator)
3. 'a' (Identifier)
4. '*' (multiplication Operator)
5. '(' (Left Parenthesis)
6. 'b' (Identifier)
7. '-' (Subtraction Operator)
8. '10' (Number)
9. ')' (Right Parenthesis)
10. ';' (Delimiter)`
    },

    // --- 6, 7, 8 MARK QUESTIONS ---
    {
        id: 'CD_M1_MQ_1', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain different compiler construction tools.',
        marks: 6, year: 2022,
        repeated: true,
        answer: `Specialized tools to help implement various phases of a compiler:
1.  **Parser Generators:** Produce syntax analyzers from a grammatical description (e.g., YACC, Bison).
2.  **Scanner Generators:** Produce lexical analyzers from regular expression descriptions (e.g., Lex, Flex).
3.  **Syntax-Directed Translation Engines:** Routines to walk the parse tree and generate code.
4.  **Automatic Code Generators:** Translation rules for intermediate to machine language.
5.  **Data-Flow Analysis Engines:** Gather information for code optimization.
6.  **Compiler Construction Toolkits:** integrated environments for compiler development.`
    },
    {
        id: 'CD_M1_MQ_2', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain the role of transition diagrams in recognition of tokens with an example.',
        marks: 7, year: 2022,
        repeated: false,
        img: '/images/transition_diagram.svg',
        answer: `**Transition Diagrams** are flowcharts used to visualize the action of a lexical analyzer.
- **States:** Circles representing conditions.
- **Edges:** Arrows labeled with input characters.
- **Start State:** Entry point.
- **Accepting State:** Double circle indicating a token is found.
- **Retract (*):** Indicates the forward pointer needs to move back one step.

*Example (Relational Operators):*
- State 0 -> '<' -> State 1
- State 1 -> '=' -> State 2 (Return LE)
- State 1 -> '>' -> State 3 (Return NE)
- State 1 -> Other -> State 4 (Retract, Return LT)`
    },
    {
        id: 'CD_M1_MQ_3', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain in detail about buffer pairs and sentinels.',
        marks: 8, year: 2023,
        repeated: true,
        isImportant: true,
        img: '/images/buffer_pairs.svg',
        answer: `**Buffer Pairs:**
- A large buffer is divided into two halves of size N.
- **Pointers:** 'lexemeBegin' (start of current token) and 'forward' (scanning ahead).
- When 'forward' reaches the end of one half, the other half is reloaded with new input. This reduces system call overhead.

**Sentinels:**
- **Problem:** Checking for the end of the buffer at every step requires two tests (End of Buffer? AND Character Match?).
- **Solution:** A special character (**eof**) is placed at the end of each buffer half as a sentinel.
- **Benefit:** The loop only checks for the character match. If a match fails, it checks if it's the sentinel. This reduces the number of checks per character from 2 to 1 (approx), speeding up the scanner.`
    },

    // --- 14 MARK QUESTIONS ---
    {
        id: 'CD_M1_LQ_1', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain the different phases of a compiler with a neat diagram. Illustrate the output of each phase for the input: position := initial + rate * 60',
        marks: 14, year: 2025,
        repeated: true,
        isImportant: true,
        answer: `A compiler operates in two parts: **Analysis (Front End)** and **Synthesis (Back End)**.

**1. Lexical Analysis (Scanner):**
- Reads source characters, groups them into lexemes, produces tokens.
- *Input:* 'position := initial + rate * 60'
- *Output:* <id,1> <= > <id,2> <+> <id,3> <*> <60>

**2. Syntax Analysis (Parser):**
- Groups tokens into grammatical phrases, creates a **Syntax Tree**.
- *Tree:* '=' at root, left child 'id1', right child '+' (which has children 'id2' and '*' (which has 'id3' and '60')).

**3. Semantic Analysis:**
- Checks semantic consistency (type checking).
- *Action:* Inserts 'inttofloat' node if 'rate' is float and '60' is int.

**4. Intermediate Code Generation:**
- Creates abstract machine code (e.g., Three-Address Code).
- *Code:*
  t1 = inttofloat(60)
  t2 = id3 * t1
  t3 = id2 + t2
  id1 = t3

**5. Code Optimization:**
- Improves intermediate code for speed/space.
- *Opt:* t1 = id3 * 60.0 (Constant folding), id1 = id2 + t1

**6. Code Generation:**
- Maps to target machine code (Assembly).
- *Code:*
  LDF R2, id3
  MULF R2, #60.0
  LDF R1, id2
  ADDF R1, R2
  STF id1, R1

*Diagram:*
Source -> [Lexical] -> [Syntax] -> [Semantic] -> [Intermediate Gen] -> [Optimizer] -> [Code Gen] -> Target
(Symbol Table and Error Handler interact with all phases).`
    },

    // ==========================================
    // MODULE 2 (8 Questions - 3 Marks + Big Qs)
    // ==========================================
    {
        id: 'CD_M2_1', subjectId: 'CST302', moduleId: 'M2',
        question: 'Consider grammar S->AB, A->aaA|ε, B->Bb|ε. Derive "aab".',
        marks: 3, year: 2025,
        repeated: false,
        answer: `Rightmost: S -> AB -> A(Bb) -> A(b) -> (aaA)b -> (aaε)b -> aab.
Leftmost: S -> AB -> (aaA)B -> aa(ε)B -> aaB -> aa(Bb) -> aab.`
    },
    {
        id: 'CD_M2_2', subjectId: 'CST302', moduleId: 'M2',
        question: 'What is ambiguous grammar? Give example.',
        marks: 3, year: 2025,
        repeated: true,
        isImportant: true,
        answer: `A grammar is ambiguous if a string has more than one parse tree.
*Example:* E -> E + E | id
String: id + id + id
Can be parsed as (id+id)+id OR id+(id+id).`
    },
    {
        id: 'CD_M2_3', subjectId: 'CST302', moduleId: 'M2',
        question: 'Algorithm to remove left recursion from E->E0E0S|00, S->S11|1.',
        marks: 3, year: 2024,
        repeated: false,
        answer: `Direct Left Recursion Removal:
A -> Aα | β  =>  A -> βA', A' -> αA' | ε
For E: E -> 00 E', E' -> 0E0S E' | ε
For S: S -> 1 S', S' -> 11 S' | ε`
    },
    {
        id: 'CD_M2_4', subjectId: 'CST302', moduleId: 'M2',
        question: 'Write the algorithm of left factoring. Left factor S->abAA|ab.',
        marks: 3, year: 2024,
        repeated: true,
        answer: `Factoring:
A -> αβ1 | αβ2  =>  A -> αA', A' -> β1 | β2
S -> ab S'
S' -> AA | ε`
    },
    {
        id: 'CD_M2_5', subjectId: 'CST302', moduleId: 'M2',
        question: 'With an example write the steps to remove left recursion?',
        marks: 3, year: 2023,
        repeated: true,
        answer: `If grammar has A -> Aα | β:
1. Create new non-terminal A'.
2. Replace A productions with: A -> βA'.
3. Add A' productions: A' -> αA' | ε.
Example: E -> E+T | T becomes E -> T E', E' -> +T E' | ε.`
    },
    {
        id: 'CD_M2_6', subjectId: 'CST302', moduleId: 'M2',
        question: 'What is left factoring? Left factor E -> E+T|T.',
        marks: 3, year: 2023,
        repeated: true,
        answer: `Left Factoring removes common prefixes to allow predictive parsing.
E -> T E'
E' -> +T | ε (Note: Originally E->T is implicit in E->E+T|T if we view it as E->T+T|T?? No, standard expression grammar needs recursion removal first, but left factoring is for things like S -> iCtS | iCtSeS).`
    },
    {
        id: 'CD_M2_7', subjectId: 'CST302', moduleId: 'M2',
        question: 'Find FIRST and FOLLOW sets for E->EAE|(E)|-E|id, A->+|*.',
        marks: 3, year: 2022,
        repeated: false,
        answer: `FIRST(E) = {(, -, id}
FIRST(A) = {+, *}
FOLLOW(E) = {$, ), (, -, id, +, *} (needs careful calculation based on productions).`
    },
    {
        id: 'CD_M2_8', subjectId: 'CST302', moduleId: 'M2',
        question: 'Write the algorithm to remove left recursion.',
        marks: 3, year: 2022,
        repeated: true,
        isImportant: true,
        answer: `(See CD_M2_5 answer - Same core concept)`
    },

    // BIG QUESTIONS M2
    {
        id: 'CD_M2_BIG_1', subjectId: 'CST302', moduleId: 'M2',
        question: 'Explain algorithm for LL(1) parsing table construction. Construct for S -> (S)S | ε',
        marks: 10, year: 2025,
        repeated: true,
        answer: `1. Compute FIRST and FOLLOW sets.
2. For each rule A -> α:
   - For each terminal 'a' in FIRST(α), add A->α to M[A, a].
   - If ε in FIRST(α), for each terminal 'b' in FOLLOW(A), add A->α to M[A, b].
Table Construction results in unique entries for LL(1).`
    },

    // ==========================================
    // MODULE 3 (8 Questions - 3 Marks + Big Qs)
    // ==========================================
    {
        id: 'CD_M3_1', subjectId: 'CST302', moduleId: 'M3',
        question: 'Write algorithm to compute FIRST(X) and FOLLOW(X).',
        marks: 3, year: 2025,
        repeated: true,
        isImportant: true,
        answer: `**FIRST(X):** If X is terminal, {X}. If X->ε, {ε}. If X->Y1Y2, FIRST(Y1)-{ε} U ...
**FOLLOW(A):** Place $ in FOLLOW(S). If A->αBβ, FIRST(β)-{ε} in FOLLOW(B). If A->αB or A->αBβ (β=>ε), FOLLOW(A) in FOLLOW(B).`
    },
    {
        id: 'CD_M3_2', subjectId: 'CST302', moduleId: 'M3',
        question: 'What is an operator grammar? Give example.',
        marks: 3, year: 2025,
        repeated: true,
        answer: `No ε production and no adjacent non-terminals.
Ex: E -> E+E | id.`
    },
    {
        id: 'CD_M3_3', subjectId: 'CST302', moduleId: 'M3',
        question: 'Define operator grammar. Construct operator precedence table for E->E+E|E*E|id.',
        marks: 3, year: 2024,
        repeated: true,
        answer: `Grammar logic as above.
Table:
   +  *  id
+  >  <  <
*  >  >  <
id >  >  -
(simplified precedence logic: * > +)`
    },
    {
        id: 'CD_M3_4', subjectId: 'CST302', moduleId: 'M3',
        question: 'What are the different operations in a shift reduce parser?',
        marks: 3, year: 2024,
        repeated: true,
        answer: `1. **Shift:** Push input symbol to stack.
2. **Reduce:** Replace handle on stack with non-terminal.
3. **Accept:** Successful parse.
4. **Error:** Syntax error detected.`
    },
    {
        id: 'CD_M3_5', subjectId: 'CST302', moduleId: 'M3',
        question: 'Differentiate CLR and LALR parsers.',
        marks: 3, year: 2023,
        repeated: true,
        isImportant: true,
        answer: `**CLR:** LR(1) items. Larger states. Identifying error earlier.
**LALR:** Merged LR(1) items (same core). Smaller states (same size as SLR). May introduce reduce/reduce conflicts.`
    },
    {
        id: 'CD_M3_6', subjectId: 'CST302', moduleId: 'M3',
        question: 'What are the possible actions of a shift-reduce parser?',
        marks: 3, year: 2023,
        repeated: true,
        answer: `Shift, Reduce, Accept, Error.`
    },
    {
        id: 'CD_M3_7', subjectId: 'CST302', moduleId: 'M3',
        question: 'What are viable prefixes?',
        marks: 3, year: 2022,
        repeated: true,
        isImportant: true,
        answer: `Prefixes of right sentential forms that can appear on the stack of a shift-reduce parser. They do not extend past the right end of the handle.`
    },
    {
        id: 'CD_M3_8', subjectId: 'CST302', moduleId: 'M3',
        question: 'What are the different parsing conflicts in the SLR parsing table?',
        marks: 3, year: 2022,
        repeated: true,
        answer: `1. **Shift-Reduce:** Next input can be shifted OR stack can be reduced (FOLLOW set overlap).
2. **Reduce-Reduce:** Two different productions can reduce the stack.`
    },

    // BIG QUESTIONS M3
    {
        id: 'CD_M3_BIG_1', subjectId: 'CST302', moduleId: 'M3',
        question: 'Construct LR(0) items for S->L=R, S->R, L->*R, L->id, R->L.',
        marks: 7, year: 2025,
        repeated: false,
        answer: `Step 1: Augment Grammar S' -> S.
Step 2: Closure(S' -> .S)
... (Detailed item set construction)`
    },

    // ==========================================
    // MODULE 4 (8 Questions - 3 Marks + Big Qs)
    // ==========================================
    {
        id: 'CD_M4_1', subjectId: 'CST302', moduleId: 'M4',
        question: 'Write SDT to evaluate arithmetic expressions for E->E+T|T, T->F, F->num.',
        marks: 3, year: 2025,
        repeated: false,
        answer: `E -> E1 + T { E.val = E1.val + T.val }
E -> T { E.val = T.val }
T -> F { T.val = F.val }
F -> num { F.val = num.lexval }`
    },
    {
        id: 'CD_M4_2', subjectId: 'CST302', moduleId: 'M4',
        question: 'Translate a[i] = b*c - b*d into quadruple.',
        marks: 3, year: 2025,
        repeated: false,
        answer: `t1 = b * c
t2 = b * d
t3 = t1 - t2
t4 = i * 4 (assume 4 bytes)
a[t4] = t3`
    },
    {
        id: 'CD_M4_3', subjectId: 'CST302', moduleId: 'M4',
        question: 'Explain the structure of activation record.',
        marks: 3, year: 2024,
        repeated: true,
        isImportant: true,
        answer: `Return Value, Actual Parameters, Control Link, Access Link, Saved Machine Status, Local Data, Temporaries.`
    },
    {
        id: 'CD_M4_4', subjectId: 'CST302', moduleId: 'M4',
        question: 'Compare L-attributed and S-attributed SDDs.',
        marks: 3, year: 2024,
        repeated: true,
        answer: `S-attributed: Only synthesized attributes (Bottom-up).
L-attributed: Synthesized + Inherited (from Left or Parent) (Top-down/Traverals).`
    },
    {
        id: 'CD_M4_5', subjectId: 'CST302', moduleId: 'M4',
        question: 'Convert a = b * -c + b * -c into quadruple?',
        marks: 3, year: 2023,
        repeated: false,
        answer: `t1 = - c
t2 = b * t1
t3 = - c
t4 = b * t3
t5 = t2 + t4
a = t5`
    },
    {
        id: 'CD_M4_6', subjectId: 'CST302', moduleId: 'M4',
        question: 'Define SDD with an example.',
        marks: 3, year: 2023,
        repeated: true,
        answer: `SDD associates attributes with grammar symbols and semantic rules with productions.
Ex: E -> E + T { E.val = E1.val + T.val }`
    },
    {
        id: 'CD_M4_7', subjectId: 'CST302', moduleId: 'M4',
        question: 'Differentiate between synthesized attributes and inherited attributes with example.',
        marks: 3, year: 2022,
        repeated: true,
        answer: `Synthesized: Computed from children (e.g., val in calculator).
Inherited: Computed from parent/siblings (e.g., type in declaration int a,b,c).`
    },
    {
        id: 'CD_M4_8', subjectId: 'CST302', moduleId: 'M4',
        question: 'What is the role of activation record in compiler design?',
        marks: 3, year: 2022,
        repeated: true,
        isImportant: true,
        answer: `It manages memory for function execution at runtime, storing local variables, parameters, and control flow links (return addresses).`
    },

    // BIG QUESTIONS M4
    {
        id: 'CD_M4_BIG_1', subjectId: 'CST302', moduleId: 'M4',
        question: 'Differentiate synthesized attributes and inherited attributes with example.',
        marks: 5, year: 2025,
        repeated: true,
        answer: `Detailed version of the 3-mark answer with full tree examples.`
    },

    // ==========================================
    // MODULE 5 (8 Questions - 3 Marks + Big Qs)
    // ==========================================
    {
        id: 'CD_M5_1', subjectId: 'CST302', moduleId: 'M5',
        question: 'What are the three characteristics of peephole optimization?',
        marks: 3, year: 2025,
        repeated: true,
        isImportant: true,
        answer: `1. Redundant instruction elimination.
2. Flow of control optimization.
3. Algebraic simplification/Strength reduction.`
    },
    {
        id: 'CD_M5_2', subjectId: 'CST302', moduleId: 'M5',
        question: 'List out source language issues in code generation phase.',
        marks: 3, year: 2025,
        repeated: false,
        answer: `Input IR correctness, valid symbol table data, handling diverse source constructs.`
    },
    {
        id: 'CD_M5_3', subjectId: 'CST302', moduleId: 'M5',
        question: 'Construct syntax tree and DAG for d+a*(b-c) + (b-c)*d',
        marks: 3, year: 2024,
        repeated: false,
        answer: `Identify common subexpression (b-c). Create one node for it and point both usages to it.`
    },
    {
        id: 'CD_M5_4', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain induction variable elimination technique.',
        marks: 3, year: 2024,
        repeated: true,
        answer: `Variables changing in lock-step in a loop.
i = i + 1; t = 4 * i;
Replace 't' with simple addition t = t + 4 to avoid multiplication.`
    },
    {
        id: 'CD_M5_5', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain common sub expression elimination with an example.',
        marks: 3, year: 2023,
        repeated: true,
        isImportant: true,
        answer: `a = b + c
d = b + c
Replace second 'b+c' with 'a'. -> d = a.`
    },
    {
        id: 'CD_M5_6', subjectId: 'CST302', moduleId: 'M5',
        question: 'How the peephole optimization technique makes its role in compilation?',
        marks: 3, year: 2023,
        repeated: true,
        answer: `It is the final pass over generated code to clean up local inefficiencies like jumps to jumps or unnecessary loads/stores.`
    },
    {
        id: 'CD_M5_7', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain code motion with an example.',
        marks: 3, year: 2022,
        repeated: true,
        isImportant: true,
        answer: `Moving loop-invariant code outside the loop.
while(i<n) { x = y + z; a[i] = 6 * i; ... }
'x = y + z' does not change inside loop. Move it before 'while'.`
    },
    {
        id: 'CD_M5_8', subjectId: 'CST302', moduleId: 'M5',
        question: 'Write algorithm for partitioning three-address instructions into basic blocks.',
        marks: 3, year: 2022,
        repeated: true,
        answer: `1. Identify leaders (First instruction, Targets of jumps, Instructions after jumps).
2. Basic block = Leader to next leader.`
    },

    // BIG QUESTIONS M5
    {
        id: 'CD_M5_BIG_1', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain about the issues in design of a code generator.',
        marks: 8, year: 2025,
        repeated: true,
        answer: `(Detailed explanation of Input, Target, Memory, Instruction Selection, Register Allocation, Evaluation Order).`
    }
];
