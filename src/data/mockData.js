
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
    'CST304': [
        { id: 'M1', name: 'Module 1', description: 'Graphics Basics: Raster/Random Scan systems, Line (DDA, Bresenham) & Circle drawing algorithms.' },
        { id: 'M2', name: 'Module 2', description: 'Filled Area Primitives & Transformations: Scan line, Boundary/Flood fill, 2D Transformations.' },
        { id: 'M3', name: 'Module 3', description: 'Clipping & Projections: Line/Polygon clipping, 3D Viewing pipeline, Parallel/Perspective projections.' },
        { id: 'M4', name: 'Module 4', description: 'Digital Image Processing: Image representation, Sampling, Quantization, Spatial domain convolution.' },
        { id: 'M5', name: 'Module 5', description: 'Image Enhancement & Segmentation: Histogram equalization, Smoothing/Sharpening filters, Edge detection.' },
    ],
    // ... (Keep other modules as is or expand if needed)
    'CST306': [
        { id: 'M1', name: 'Module 1', description: 'Foundations: Asymptotic notations, Recurrence equations, Master’s Theorem, Analysis of recursive algorithms.' },
        { id: 'M2', name: 'Module 2', description: 'Advanced Data Structures: AVL Trees, Disjoint Sets (Union-Find), Graph Traversals (DFS, BFS), SCC.' },
        { id: 'M3', name: 'Module 3', description: 'Divide and Conquer & Greedy: Merge Sort, Strassen’s Algo; Knapsack, Prim’s, Kruskal’s, Dijkstra’s Algos.' },
        { id: 'M4', name: 'Module 4', description: 'Dynamic Programming & Backtracking: Matrix Chain Mult, Floyd-Warshall; N-Queen’s, TSP (Branch & Bound).' },
        { id: 'M5', name: 'Module 5', description: 'Complexity Classes: P, NP, NP-Hard, NP-Complete; Approximation (Bin Packing) & Randomized Algos.' },
    ],
};

export const pyqs = [
    // --- MODULE 1 ---
    {
        id: 'CD_M1_1', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain the different phases of a compiler with a diagram. Illustrate with a source language statement: position := initial + rate * 60',
        marks: 10, year: 2022,
        repeated: true,
        answer: `The compilation process is a sequence of various phases, each taking source program in one representation and producing output in another representation.
    
1. **Lexical Analysis:** The first phase reads the source code and groups the stream of characters into meaningful sequences called "lexemes". For each lexeme, the analyzer produces a token of the form <token-name, attribute-value>.
   - Example: For "position := initial + rate * 60", it produces identifiers (id1, id2, id3) and operators/symbols.

2. **Syntax Analysis (Parsing):** This phase uses the tokens to create a tree-like intermediate representation that depicts the grammatical structure of the token stream. A common representation is a syntax tree.

3. **Semantic Analysis:** This phase checks for semantic consistency with the language definition. It gathers type information and saves it in either the syntax tree or the symbol table. It performs type checking.
   - Example: Adding an integer to a float might require type conversion.

4. **Intermediate Code Generation:** Creating an explicit low-level or machine-like intermediate representation, which should be easy to produce and easy to translate into the target machine.
   - Example (Three-Address Code):
     t1 = inttofloat(60)
     t2 = id3 * t1
     t3 = id2 + t2
     id1 = t3

5. **Code Optimization:** Tries to improve the intermediate code so that faster running machine code will result.
   - Example: "id1 = id2 + id3 * 60.0" (optimizing the inttofloat).

6. **Code Generation:** Maps the intermediate representation to the target language (e.g., assembly code). It involves register allocation and instruction selection.
   - Example:
     MOVF id3, R2
     MULF #60.0, R2
     MOVF id2, R1
     ADDF R2, R1
     MOVF R1, id1

*Symbol Table Management and Error Handling routines interact with all these phases.*`
    },
    {
        id: 'CD_M1_2', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain different compiler construction tools.',
        marks: 6, year: 2022,
        repeated: true,
        answer: `Compiler construction tools consist of specialized software designed to aid in the creation of compilers. Some common tools include:

1. **Parser Generators:** These produce syntax analyzers (parsers) from a grammatical description of a programming language.
   - Example: YACC (Yet Another Compiler-Compiler), Bison.

2. **Scanner Generators:** These produce lexical analyzers (scanners) from a regular expression description of the tokens of a language.
   - Example: Lex, Flex.

3. **Syntax-Directed Translation Engines:** These produce routines for walking a parse tree and generating intermediate code.

4. **Code-Generator Generators:** These produce a code generator from a collection of rules for translating each operation of the intermediate language into the machine language for a target machine.

5. **Data-Flow Analysis Engines:** These facilitate the gathering of information about how values are transmitted from one part of a program to another. Key for optimization.

6. **Compiler-Construction Toolkits:** Integrated sets of routines for constructing various phases of a compiler.`
    },
    {
        id: 'CD_M1_3', subjectId: 'CST302', moduleId: 'M1',
        question: 'Explain the role of transition diagrams in recognition of tokens.',
        marks: 7, year: 2022,
        repeated: false,
        answer: `Transition diagrams are a graphical representation used to visualize the recognition of tokens in Lexical Analysis. They depict the actions taken by the lexical analyzer as it scans the input.

- **States:** Represented by circles. They indicate a condition that could occur during the process of scanning the input.
- **Edges:** Directed lines connecting states. Each edge is labeled with a character or set of characters.
- **Start State:** The initial state where the process begins.
- **Accepting (Final) States:** Double circles. Reaching this state indicates a token has been successfully recognized.
- **Retract/Star (*):** Indicates that the character that brought us to the final state needs to be returned to the input buffer (e.g., when reading identifying a number, we read until a non-digit is found).

**Role:**
1. They serve as a blueprint for implementing the scanner code. Each state can be implemented as a case in a switch statement.
2. They help in systematically handling complex patterns like identifiers, keywords, numbers (integers, floats, exponentials), and operators.
3. They allow for the combination of multiple patterns into a single finite automaton.`
    },

    // --- MODULE 2 ---
    {
        id: 'CD_M2_1', subjectId: 'CST302', moduleId: 'M2',
        question: 'Explain the error recovery strategies in parsing.',
        marks: 8, year: 2023,
        repeated: false,
        answer: `A parser should be able to detect and report errors, and ideally recover from them to continue checking the rest of the input. Common strategies include:

1. **Panic-Mode Recovery:**
   - **Method:** On discovering an error, the parser discards input symbols one at a time until one of a designated set of identifying "synchronizing tokens" is found (e.g., semicolons, end, }).
   - **Pros:** Simple to implement, guarantees not to go into an infinite loop.
   - **Cons:** Often skips a considerable amount of input without checking it for additional errors.

2. **Phrase-Level Recovery:**
   - **Method:** On discovering an error, the parser performs a local correction on the remaining input; e.g., replacing a comma with a semicolon, deleting an extraneous semicolon, or inserting a missing semicolon.
   - **Pros:** Can correct strictly local errors.
   - **Cons:** Difficulty in coping with situations where the actual error occurred before the point of detection.

3. **Error Productions:**
   - **Method:** Augment the grammar with productions that generate erroneous constructs (common mistakes).
   - **Pros:** Can generate very specific, helpful error diagnostics.
   - **Cons:** Makes grammar larger and more complex.

4. **Global Correction:**
   - **Method:** Given an incorrect input string x, find a correct string y that creates x with the minimum number of changes (insertions, deletions, alterations).
   - **Pros:** Theoretically optimal.
   - **Cons:** Too costly to implement in terms of time and space for practical compilers.`
    },
    {
        id: 'CD_M2_2', subjectId: 'CST302', moduleId: 'M2',
        question: 'Show that the grammar S -> E+E | E-E | E*E | E/E | (E) | id is ambiguous. Eliminate ambiguity.',
        marks: 7, year: 2022,
        repeated: true,
        answer: `**Ambiguity:** A grammar is ambiguous if there is a string that has more than one leftmost derivation or more than one parse tree.
For the string "id + id * id":
Tree 1: (id + id) * id -> Implies addition first.
Tree 2: id + (id * id) -> Implies multiplication first (Correct precedence).
Since two trees exist, it is ambiguous.

**Eliminating Ambiguity:**
We enforce precedence ( * / > + - ) and associativity (usually left-to-right). We introduce new non-terminals (Terms and Factors).

**Revised Grammar:**
E -> E + T | E - T | T
T -> T * F | T / F | F
F -> ( E ) | id

- **E** generates expressions (lowest precedence + -).
- **T** generates terms (higher precedence * /).
- **F** generates factors (highest precedence, parentheses/identifiers).
This forces the parse tree to grow in a way that respects standard arithmetic precedence.`
    },

    // --- MODULE 3 ---
    {
        id: 'CD_M3_1', subjectId: 'CST302', moduleId: 'M3',
        question: 'Explain Shift-Reduce parsing and the conflicts that may occur.',
        marks: 8, year: 2023,
        repeated: false,
        answer: `**Shift-Reduce Parsing:** A form of bottom-up parsing where a stack holds grammar symbols and an input buffer holds the rest of the string.
- **Shift:** Move the next input symbol onto the top of the stack.
- **Reduce:** The parser knows the right end of the handle is at the top of the stack. It locates the left end of the handle within the stack and decides with what non-terminal to replace the handle.

**Conflicts:**
Sometimes the parser cannot decide whether to shift or to reduce (Shift/Reduce conflict), or which of several reductions to make (Reduce/Reduce conflict).

1. **Shift/Reduce Conflict:**
   - Occurs when the parser can correctly shift the next symbol, but the stack contents also form a valid handle for reduction.
   - Example: "if E then S else S". When "else" is seen, do we shift "else" (associating it with the inner "if") or reduce the "if E then S" (associating "else" with an outer "if")? (Dangling Else problem).

2. **Reduce/Reduce Conflict:**
   - Occurs when the contents of the stack form a handles for more than one production rule simultaneously.
   - Example: If grammar has A->a and B->a. If 'a' is on stack, parser doesn't know whether to reduce to A or B.`
    },
    {
        id: 'CD_M3_2', subjectId: 'CST302', moduleId: 'M3',
        question: 'Differentiate CLR and LALR parsers.',
        marks: 3, year: 2023,
        repeated: false,
        answer: `**CLR (Canonical LR):**
- Uses LR(1) items (includes lookahead).
- Most powerful LR parser.
- Generates a large number of states (often too many for practical use).
- Detects errors immediately.

**LALR (Look-Ahead LR):**
- Derived from CLR by merging states that have the same core item sets but different lookaheads.
- Has the same number of states as SLR (smaller table size).
- Slightly less powerful than CLR (might introduce Reduce/Reduce conflicts during merging, but never Shift/Reduce).
- Standard choice for parser generators like YACC.`
    },

    // --- MODULE 4 ---
    {
        id: 'CD_M4_1', subjectId: 'CST302', moduleId: 'M4',
        question: 'Explain Static allocation and Heap allocation strategies.',
        marks: 8, year: 2022,
        repeated: true,
        answer: `**Static Allocation:**
- Memory is allocated at compile-time.
- The size of the data structure must be known in advance.
- The bindings of names to storage locations do not change during execution.
- **Pros:** Fast execution (no runtime allocation overhead), simple.
- **Cons:** No recursion support (cannot create new local variables for each call), no dynamic data structures.
- **Used for:** Global variables, Fortran 77 variables.

**Heap Allocation:**
- Memory is allocated at runtime from a data area known as the "heap".
- Used for data structures that can grow/shrink dynamically (linked lists, trees) or when data needs to technically outlive the procedure that created it.
- **Pros:** Flexible, supports dynamic structures.
- **Cons:** Slower (allocation/deallocation takes time), risk of memory leaks and fragmentation, requires garbage collection or manual management.
- **Used for:** Objects in Java/C++, malloc in C.`
    },
    {
        id: 'CD_M4_2', subjectId: 'CST302', moduleId: 'M4',
        question: 'Compare Three-address code, Triples, and Quadruples with examples.',
        marks: 6, year: 2023,
        repeated: false,
        answer: `For the expression: **a = b * -c**

1. **Quadruples:**
   - A structure with 4 fields: param (operator), arg1, arg2, result.
   - Explicitly names the temporary variables.
   | Op | Arg1 | Arg2 | Result |
   |---|---|---|---|
   | uminus | c | - | t1 |
   | * | b | t1 | t2 |
   | = | t2 | - | a |

2. **Triples:**
   - A structure with 3 fields: op, arg1, arg2.
   - Does not use temporary variables; refers to the result of a previous operation by its position (index).
   | Index | Op | Arg1 | Arg2 |
   |---|---|---|---|
   | (0) | uminus | c | - |
   | (1) | * | b | (0) |
   | (2) | = | a | (1) |

3. **Indirect Triples:**
   - Uses a separate list of pointers to triples.
   - Allows reordering of instructions without changing the references in the triples list itself.`
    },

    // --- MODULE 5 ---
    {
        id: 'CD_M5_1', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain the design issues of a code generator.',
        marks: 7, year: 2022,
        repeated: true,
        answer: `The main issues in the design of a code generator include:

1. **Input to the Code Generator:** The input must be correct intermediate code (IR) and symbol table information. The choices of IR (Three-address, DAG, Postfix) affect the difficulty of generation.

2. **Target Program:** The output is usually absolute machine code, relocatable machine code, or assembly language. RISC vs CISC architecture decisions matter here.

3. **Memory Management:** Mapping names in the source program to addresses of data objects in run-time memory. The code generator needs to use symbol table information to perform this mapping.

4. **Instruction Selection:** Choosing the best machine instructions to implement the IR operations. A rich instruction set (like x86) offers many ways to do the same thing (e.g., INC A vs ADD A, #1).

5. **Register Allocation:** Registers are the fastest storage. Deciding which values to keep in registers (Allocation) and which specific register to use (Assignment) is critical for performance.

6. **Evaluation Order:** The order in which computations are performed can affect the efficiency of the target code. Some orders require fewer registers to hold intermediate results.`
    },
    {
        id: 'CD_M5_2', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain different code optimization techniques.',
        marks: 8, year: 2022,
        repeated: true,
        answer: `1. **Compile-Time Evaluation:**
   - Constant Folding: 'x = 2 + 3' becomes 'x = 5'.
   - Constant Propagation: Replacing a variable with a known constant value.

2. **Common Subexpression Elimination:** Identifying expressions that compute the same value (e.g., 'a = b + c' and later 'd = b + c') and computing them only once.

3. **Dead Code Elimination:** Removing code that can never be executed or whose result is never used.

4. **Code Motion (Loop-Invariant Code Motion):** Moving computations that yield the same result in every iteration of a loop to outside the loop.

5. **Induction Variable Elimination & Strength Reduction:** Replacing expensive operations (like multiplication) with cheaper ones (like addition) inside loops (e.g., 'i * 4' becomes 't = t + 4').

6. **Loop Unrolling:** Replacing a loop body with multiple copies of the body to decrease loop control overhead.`
    },
    {
        id: 'CD_M5_3', subjectId: 'CST302', moduleId: 'M5',
        question: 'Explain the code-improving transformations of a basic block (Optimization of basic blocks).',
        marks: 7, year: 2022,
        repeated: true,
        answer: `Basic blocks are sequences of instructions with one entry and one exit. Local optimizations can be applied within them:

1. **Structure-Preserving Transformations:**
   - **Common Subexpression Elimination:** If 'a = b + c' appears twice, use the result of the first one.
   - **Dead Code Elimination:** Remove 'x = y + z' if 'x' is not used subsequently.
   - **Renaming Temporary Variables:** Give distinct names to temporaries to avoid false dependencies.
   - **Interchange of Statements:** Swapping adjacent independent statements if it helps scheduling.

2. **Algebraic Transformations:**
   - Using algebraic properties to simplify expressions.
   - Example: 'x + 0' -> 'x', 'x * 1' -> 'x'.
   - Strength Reduction: 'x ^ 2' -> 'x * x'.`
    }
];
