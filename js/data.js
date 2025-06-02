// Summer schedule data
const summerStart = new Date(2025, 5, 2); // June 2, 2025
const summerEnd = new Date(2025, 7, 31); // August 31, 2025

// Task categories
const categories = {
    reading: "reading",
    math: "math",
    writing: "writing",
    creative: "creative"
};

// Weekly schedule - 8 weeks (2 months)
const weeklySchedule = {
    1: {
        Monday: [
            { type: categories.reading, task: "Read a short story (15 mins)", icon: "book-open" },
            { type: categories.writing, task: "Write about your weekend (20 mins)", icon: "pen-tool" },
            { type: categories.math, task: "Addition practice (1-50)", icon: "calculator" },
            { type: categories.creative, task: "Draw your favorite animal", icon: "palette" }
        ],
        Tuesday: [
            { type: categories.math, task: "Subtraction worksheets (20 mins)", icon: "calculator" },
            { type: categories.reading, task: "Read aloud to family (15 mins)", icon: "book-open" },
            { type: categories.writing, task: "Create a word list (new words)", icon: "pen-tool" },
            { type: categories.creative, task: "Paper plate craft", icon: "scissors" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Comic book reading (20 mins)", icon: "book-open" },
            { type: categories.math, task: "Shape identification & drawing", icon: "calculator" },
            { type: categories.writing, task: "Write a letter to grandparents", icon: "pen-tool" },
            { type: categories.creative, task: "Origami animals", icon: "palette" }
        ],
        Thursday: [
            { type: categories.math, task: "Counting games (1-100)", icon: "calculator" },
            { type: categories.reading, task: "Picture book exploration", icon: "book-open" },
            { type: categories.writing, task: "Create a shopping list", icon: "pen-tool" },
            { type: categories.creative, task: "Finger painting", icon: "palette" }
        ],
        Friday: [
            { type: categories.reading, task: "Read and retell a story", icon: "book-open" },
            { type: categories.writing, task: "Write about today's activities", icon: "pen-tool" },
            { type: categories.math, task: "Simple word problems", icon: "calculator" },
            { type: categories.creative, task: "Collage making", icon: "scissors" }
        ]
    },
    2: {
        Monday: [
            { type: categories.reading, task: "Read a simple book about computers", icon: "book-open" },
            { type: categories.writing, task: "Write what you know about robots", icon: "pen-tool" },
            { type: categories.math, task: "Skip counting by 2s, 5s, 10s", icon: "calculator" },
            { type: categories.creative, task: "Draw what a robot helper would look like", icon: "palette" }
        ],
        Tuesday: [
            { type: categories.math, task: "Measurement with rulers", icon: "calculator" },
            { type: categories.reading, task: "Poetry reading & recitation", icon: "book-open" },
            { type: categories.writing, task: "Write a thank you note", icon: "pen-tool" },
            { type: categories.creative, task: "Rock painting", icon: "palette" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Non-fiction book about computers or AI", icon: "book-open" },
            { type: categories.math, task: "Time telling practice", icon: "calculator" },
            { type: categories.writing, task: "Create a story about a smart computer friend", icon: "pen-tool" },
            { type: categories.creative, task: "Bookmark making", icon: "scissors" }
        ],
        Thursday: [
            { type: categories.math, task: "Pattern recognition games", icon: "calculator" },
            { type: categories.reading, task: "Read signs and labels around house", icon: "book-open" },
            { type: categories.writing, task: "Write about favorite food", icon: "pen-tool" },
            { type: categories.creative, task: "Tissue paper flowers", icon: "palette" }
        ],
        Friday: [
            { type: categories.reading, task: "Magazine article reading", icon: "book-open" },
            { type: categories.writing, task: "Create a comic strip", icon: "pen-tool" },
            { type: categories.math, task: "Money counting practice", icon: "calculator" },
            { type: categories.creative, task: "Nature art with leaves", icon: "palette" }
        ]
    },
    3: {
        Monday: [
            { type: categories.reading, task: "Read about different countries", icon: "book-open" },
            { type: categories.writing, task: "Write about your family", icon: "pen-tool" },
            { type: categories.math, task: "Double-digit addition", icon: "calculator" },
            { type: categories.creative, task: "Create a robot with paper chains", icon: "scissors" }
        ],
        Tuesday: [
            { type: categories.math, task: "Geometry shapes & properties", icon: "calculator" },
            { type: categories.reading, task: "Fairy tale reading", icon: "book-open" },
            { type: categories.writing, task: "Write instructions for a game", icon: "pen-tool" },
            { type: categories.creative, task: "Handprint art", icon: "palette" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Science book for kids", icon: "book-open" },
            { type: categories.math, task: "Graphing favorite colors/foods", icon: "calculator" },
            { type: categories.writing, task: "Write a weather report", icon: "pen-tool" },
            { type: categories.creative, task: "Egg carton crafts", icon: "scissors" }
        ],
        Thursday: [
            { type: categories.math, task: "Fractions with pizza/pies", icon: "calculator" },
            { type: categories.reading, task: "Read recipes together", icon: "book-open" },
            { type: categories.writing, task: "Create a robot character description", icon: "pen-tool" },
            { type: categories.creative, task: "Make patterns like computer code with string art", icon: "palette" }
        ],
        Friday: [
            { type: categories.reading, task: "Adventure story reading", icon: "book-open" },
            { type: categories.writing, task: "Write about summer fun", icon: "pen-tool" },
            { type: categories.math, task: "Estimation games", icon: "calculator" },
            { type: categories.creative, task: "Photo frame decorating", icon: "scissors" }
        ]
    },
    4: {
        Monday: [
            { type: categories.reading, task: "Biography of a computer inventor", icon: "book-open" },
            { type: categories.writing, task: "Write about an AI or tech hero", icon: "pen-tool" },
            { type: categories.math, task: "Multiplication tables (2,5,10)", icon: "calculator" },
            { type: categories.creative, task: "Make an AI assistant sock puppet", icon: "scissors" }
        ],
        Tuesday: [
            { type: categories.math, task: "Calendar math activities", icon: "calculator" },
            { type: categories.reading, task: "How-to books reading", icon: "book-open" },
            { type: categories.writing, task: "Write a book review", icon: "pen-tool" },
            { type: categories.creative, task: "Painted stone garden", icon: "palette" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Jokes and riddles book", icon: "book-open" },
            { type: categories.math, task: "Division intro with objects", icon: "calculator" },
            { type: categories.writing, task: "Create riddles for a computer to solve", icon: "pen-tool" },
            { type: categories.creative, task: "Create binary code art (0s and 1s patterns)", icon: "palette" }
        ],
        Thursday: [
            { type: categories.math, task: "Place value games", icon: "calculator" },
            { type: categories.reading, task: "History stories for kids", icon: "book-open" },
            { type: categories.writing, task: "Write about time travel", icon: "pen-tool" },
            { type: categories.creative, task: "Cardboard castle building", icon: "scissors" }
        ],
        Friday: [
            { type: categories.reading, task: "Mystery book for kids", icon: "book-open" },
            { type: categories.writing, task: "Create your own mystery", icon: "pen-tool" },
            { type: categories.math, task: "Problem solving challenges", icon: "calculator" },
            { type: categories.creative, task: "Friendship bracelets", icon: "palette" }
        ]
    },
    5: {
        Monday: [
            { type: categories.reading, task: "Books about AI and space exploration", icon: "book-open" },
            { type: categories.writing, task: "Write about robots helping on Mars", icon: "pen-tool" },
            { type: categories.math, task: "Mental math strategies", icon: "calculator" },
            { type: categories.creative, task: "Design a robot for space exploration", icon: "palette" }
        ],
        Tuesday: [
            { type: categories.math, task: "Measurement cooking project", icon: "calculator" },
            { type: categories.reading, task: "Read cooking instructions", icon: "book-open" },
            { type: categories.writing, task: "Write your own recipe", icon: "pen-tool" },
            { type: categories.creative, task: "Decorated recipe cards", icon: "scissors" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Ocean life books", icon: "book-open" },
            { type: categories.math, task: "Symmetry in nature", icon: "calculator" },
            { type: categories.writing, task: "Underwater adventure story", icon: "pen-tool" },
            { type: categories.creative, task: "Paper plate jellyfish", icon: "palette" }
        ],
        Thursday: [
            { type: categories.math, task: "Number line activities", icon: "calculator" },
            { type: categories.reading, task: "Read about AI and technology jobs", icon: "book-open" },
            { type: categories.writing, task: "Write about becoming an AI scientist", icon: "pen-tool" },
            { type: categories.creative, task: "Design a costume for an AI expert", icon: "scissors" }
        ],
        Friday: [
            { type: categories.reading, task: "Animal habitat books", icon: "book-open" },
            { type: categories.writing, task: "Create animal fact cards", icon: "pen-tool" },
            { type: categories.math, task: "Data collection & sorting", icon: "calculator" },
            { type: categories.creative, task: "Habitat diorama", icon: "palette" }
        ]
    },
    6: {
        Monday: [
            { type: categories.reading, task: "How AI helps different cultures", icon: "book-open" },
            { type: categories.writing, task: "Write how AI could help your family", icon: "pen-tool" },
            { type: categories.math, task: "Currency from different countries", icon: "calculator" },
            { type: categories.creative, task: "Design an AI that learns about world flags", icon: "palette" }
        ],
        Tuesday: [
            { type: categories.math, task: "Shopping math scenarios", icon: "calculator" },
            { type: categories.reading, task: "Read store advertisements", icon: "book-open" },
            { type: categories.writing, task: "Create a store catalog", icon: "pen-tool" },
            { type: categories.creative, task: "Play money design", icon: "scissors" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Weather and climate books", icon: "book-open" },
            { type: categories.math, task: "Temperature tracking graphs", icon: "calculator" },
            { type: categories.writing, task: "Write a weather diary", icon: "pen-tool" },
            { type: categories.creative, task: "Weather wheel craft", icon: "palette" }
        ],
        Thursday: [
            { type: categories.math, task: "Patterns AI might recognize (dice/coins)", icon: "calculator" },
            { type: categories.reading, task: "Read about how computers play games", icon: "book-open" },
            { type: categories.writing, task: "Create a game where AI is a character", icon: "pen-tool" },
            { type: categories.creative, task: "Design a board game about training a robot", icon: "scissors" }
        ],
        Friday: [
            { type: categories.reading, task: "Sports biographies for kids", icon: "book-open" },
            { type: categories.writing, task: "Write about your favorite sport", icon: "pen-tool" },
            { type: categories.math, task: "Sports statistics simple analysis", icon: "calculator" },
            { type: categories.creative, task: "Team pennant making", icon: "palette" }
        ]
    },
    7: {
        Monday: [
            { type: categories.reading, task: "AI invention and discovery books", icon: "book-open" },
            { type: categories.writing, task: "Write about your AI invention idea", icon: "pen-tool" },
            { type: categories.math, task: "Create patterns AI could recognize", icon: "calculator" },
            { type: categories.creative, task: "Build an AI assistant model with cardboard", icon: "scissors" }
        ],
        Tuesday: [
            { type: categories.math, task: "Measuring garden/outdoor spaces", icon: "calculator" },
            { type: categories.reading, task: "Gardening books for kids", icon: "book-open" },
            { type: categories.writing, task: "Plant growth journal", icon: "pen-tool" },
            { type: categories.creative, task: "Seed packet art", icon: "palette" }
        ],
        Wednesday: [
            { type: categories.reading, task: "How AI creates music and art", icon: "book-open" },
            { type: categories.math, task: "Patterns AI uses in music and art", icon: "calculator" },
            { type: categories.writing, task: "Write a poem about a helpful AI", icon: "pen-tool" },
            { type: categories.creative, task: "Design an instrument AI could play", icon: "palette" }
        ],
        Thursday: [
            { type: categories.math, task: "Architecture & building math", icon: "calculator" },
            { type: categories.reading, task: "Books about famous buildings", icon: "book-open" },
            { type: categories.writing, task: "Describe your dream house", icon: "pen-tool" },
            { type: categories.creative, task: "Miniature building with blocks", icon: "scissors" }
        ],
        Friday: [
            { type: categories.reading, task: "Self-driving cars and AI transportation", icon: "book-open" },
            { type: categories.writing, task: "Write about AI-powered vehicles", icon: "pen-tool" },
            { type: categories.math, task: "Distance and speed concepts for robots", icon: "calculator" },
            { type: categories.creative, task: "Design a self-driving vehicle", icon: "palette" }
        ]
    },
    8: {
        Monday: [
            { type: categories.reading, task: "How AI helps our community", icon: "book-open" },
            { type: categories.writing, task: "Write about how AI could help at school", icon: "pen-tool" },
            { type: categories.math, task: "Solve real problems with simple algorithms", icon: "calculator" },
            { type: categories.creative, task: "Create an AI helper for your home", icon: "scissors" }
        ],
        Tuesday: [
            { type: categories.math, task: "Review all math concepts", icon: "calculator" },
            { type: categories.reading, task: "Favorite book re-reading", icon: "book-open" },
            { type: categories.writing, task: "Summer memory book", icon: "pen-tool" },
            { type: categories.creative, task: "Memory collage", icon: "palette" }
        ],
        Wednesday: [
            { type: categories.reading, task: "Read a book about AI to family", icon: "book-open" },
            { type: categories.math, task: "Teach a simple algorithm to family", icon: "calculator" },
            { type: categories.writing, task: "Write what you learned about AI", icon: "pen-tool" },
            { type: categories.creative, task: "Design AI expert certificates", icon: "scissors" }
        ],
        Thursday: [
            { type: categories.math, task: "AI-style pattern recognition games", icon: "calculator" },
            { type: categories.reading, task: "Create an AI book reading list", icon: "book-open" },
            { type: categories.writing, task: "Plan future AI learning activities", icon: "pen-tool" },
            { type: categories.creative, task: "Create 'My AI Future' vision board", icon: "palette" }
        ],
        Friday: [
            { type: categories.reading, task: "AI Summer Learning Celebration", icon: "book-open" },
            { type: categories.writing, task: "Write about your AI summer journey", icon: "pen-tool" },
            { type: categories.math, task: "Calculate and graph your AI learning", icon: "calculator" },
            { type: categories.creative, task: "Create AI Expert medals and ceremony", icon: "star" }
        ]
    }
};

// Common tasks for both kids - these will serve as supplementary activities
const commonTasks = {
    reading: [
        {
            id: "reading-1",
            title: "Reading Adventure Time",
            description: "Read a story book for 30 minutes. Write down your favorite character and why you like them.",
            duration: "30 minutes",
            category: categories.reading,
            daysOfWeek: [1, 3, 5] // Monday, Wednesday, Friday
        },
        {
            id: "reading-2",
            title: "Vocabulary Builder",
            description: "Learn 5 new words from your reading. Write them down and practice using them in sentences.",
            duration: "20 minutes",
            category: categories.reading,
            daysOfWeek: [2, 4] // Tuesday, Thursday
        },
        {
            id: "reading-3",
            title: "Reading Comprehension",
            description: "Read a short story and answer questions about it. Try to remember details like character names, settings, and main events.",
            duration: "25 minutes",
            category: categories.reading,
            daysOfWeek: [6] // Saturday
        }
    ],
    math: [
        {
            id: "math-1",
            title: "Number Ninjas",
            description: "Practice addition and subtraction with numbers up to 100. Use objects around you to help count if needed.",
            duration: "25 minutes",
            category: categories.math,
            daysOfWeek: [1, 3, 5] // Monday, Wednesday, Friday
        },
        {
            id: "math-2",
            title: "Shape Explorer",
            description: "Identify different shapes around the house. Draw them and label their properties (sides, corners).",
            duration: "20 minutes",
            category: categories.math,
            daysOfWeek: [2, 4] // Tuesday, Thursday
        },
        {
            id: "math-3",
            title: "Math Games",
            description: "Play an educational math game or solve puzzles that involve counting, sorting, or basic operations.",
            duration: "30 minutes",
            category: categories.math,
            daysOfWeek: [6] // Saturday
        }
    ],
    writing: [
        {
            id: "writing-1",
            title: "Story Creation",
            description: "Write a short story about your favorite animal. Include a beginning, middle, and end to your story.",
            duration: "25 minutes",
            category: categories.writing,
            daysOfWeek: [1, 3, 5] // Monday, Wednesday, Friday
        },
        {
            id: "writing-2",
            title: "Journal Time",
            description: "Write in your journal about what you did yesterday or what you plan to do today.",
            duration: "15 minutes",
            category: categories.writing,
            daysOfWeek: [2, 4, 6] // Tuesday, Thursday, Saturday
        }
    ],
    creative: [
        {
            id: "creative-1",
            title: "Art Corner",
            description: "Create a drawing or painting of your favorite place. Use colors to show how that place makes you feel.",
            duration: "30 minutes",
            category: categories.creative,
            daysOfWeek: [1, 5] // Monday, Friday
        },
        {
            id: "creative-2",
            title: "Craft Time",
            description: "Make something using recycled materials from around the house. Be creative with your design!",
            duration: "40 minutes",
            category: categories.creative,
            daysOfWeek: [3] // Wednesday
        },
        {
            id: "creative-3",
            title: "Music & Movement",
            description: "Learn a new song or dance. Practice it and perform it for your family.",
            duration: "25 minutes",
            category: categories.creative,
            daysOfWeek: [2, 6] // Tuesday, Saturday
        },
        {
            id: "creative-4",
            title: "Building Challenge",
            description: "Using blocks, LEGO, or other building toys, create a structure based on today's theme (like castle, tower, bridge, etc.).",
            duration: "35 minutes",
            category: categories.creative,
            daysOfWeek: [4] // Thursday
        }
    ]
};

// Sanha-specific tasks (girl)
const sanhaSpecificTasks = {
    reading: [
        {
            id: "sanha-reading-1",
            title: "Fairy Tale Adventure",
            description: "Read a fairy tale and create an alternative ending to the story.",
            duration: "25 minutes",
            category: categories.reading,
            daysOfWeek: [0] // Sunday
        }
    ],
    writing: [
        {
            id: "sanha-writing-1",
            title: "Letter Writing",
            description: "Write a thank you note or letter to someone special in your life.",
            duration: "20 minutes",
            category: categories.writing,
            daysOfWeek: [0] // Sunday
        }
    ],
    creative: [
        {
            id: "sanha-creative-1",
            title: "Jewelry Making",
            description: "Create a bracelet or necklace using beads, string, or other materials.",
            duration: "30 minutes",
            category: categories.creative,
            daysOfWeek: [0] // Sunday
        }
    ]
};

// Sanav-specific tasks (boy)
const sanavSpecificTasks = {
    reading: [
        {
            id: "sanav-reading-1",
            title: "Adventure Stories",
            description: "Read an adventure story and create a map of where the story took place.",
            duration: "25 minutes",
            category: categories.reading,
            daysOfWeek: [0] // Sunday
        }
    ],
    writing: [
        {
            id: "sanav-writing-1",
            title: "Comic Creation",
            description: "Create a short comic strip with drawings and speech bubbles to tell a story.",
            duration: "25 minutes",
            category: categories.writing,
            daysOfWeek: [0] // Sunday
        }
    ],
    creative: [
        {
            id: "sanav-creative-1",
            title: "Model Building",
            description: "Build a model of something you're interested in (car, plane, robot) using available materials.",
            duration: "35 minutes",
            category: categories.creative,
            daysOfWeek: [0] // Sunday
        }
    ]
};

// Combine tasks for each child
const sanhaFullSchedule = {
    reading: [...commonTasks.reading, ...sanhaSpecificTasks.reading],
    math: [...commonTasks.math],
    writing: [...commonTasks.writing, ...sanhaSpecificTasks.writing],
    creative: [...commonTasks.creative, ...sanhaSpecificTasks.creative]
};

const sanavFullSchedule = {
    reading: [...commonTasks.reading, ...sanavSpecificTasks.reading],
    math: [...commonTasks.math],
    writing: [...commonTasks.writing, ...sanavSpecificTasks.writing],
    creative: [...commonTasks.creative, ...sanavSpecificTasks.creative]
};

// Store the completed tasks for each child
let completedTasks = {
    sanha: [],
    sanav: []
};

// Function to save completed tasks to localStorage
function saveCompletedTasks() {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to load completed tasks from localStorage
function loadCompletedTasks() {
    const saved = localStorage.getItem('completedTasks');
    if (saved) {
        completedTasks = JSON.parse(saved);
    }
}

// Load completed tasks when the page loads
loadCompletedTasks();
