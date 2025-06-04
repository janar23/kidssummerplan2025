// Preparation materials needed for each task
const taskPreparations = {
    reading: {
        "Read a short story (15 mins)": {
            materials: ["Children's storybook from library"],
            advice: "Visit the library a few days before to select age-appropriate short stories"
        },
        "Read aloud to family (15 mins)": {
            materials: ["Simple chapter book or picture book"],
            advice: "Choose a book with large text and pictures to make reading aloud easier"
        },
        "Comic book reading (20 mins)": {
            materials: ["Age-appropriate comic book from library"],
            advice: "Look for educational comics like Asterix, TinTin, or child-friendly superhero comics"
        },
        "Picture book exploration": {
            materials: ["Picture books with detailed illustrations"],
            advice: "Books with hidden objects or detailed scenes work best for this activity"
        },
        "Read and retell a story": {
            materials: ["Storybook", "Paper and pencil for child to draw the story (optional)"],
            advice: "Choose stories with clear beginning, middle, and end to help with retelling"
        },
        "Read a simple book about computers": {
            materials: ["Children's book about computers or technology"],
            advice: "Look for titles like 'Hello Ruby' or 'How Do Computers Work?'"
        },
        "Poetry reading & recitation": {
            materials: ["Children's poetry book", "Optional: video camera to record recitation"],
            advice: "Choose poems with rhythm and rhyme that are fun to say aloud"
        },
        "Non-fiction book about computers or AI": {
            materials: ["Age-appropriate non-fiction book about technology"],
            advice: "Look for books with lots of pictures and simple explanations"
        },
        "Read signs and labels around house": {
            materials: ["Notebook", "Pencil for writing down interesting words"],
            advice: "Make it a treasure hunt - see how many different types of text they can find"
        },
        "Magazine article reading": {
            materials: ["Children's magazine like National Geographic Kids"],
            advice: "Choose articles with topics that interest your child - animals, nature, science"
        }
    },
    math: {
        "Addition practice (1-50)": {
            materials: ["Pencil", "Eraser", "Optional: number chart or counters"],
            advice: "The online worksheet has everything needed, but physical counters can help visual learners"
        },
        "Subtraction worksheets (20 mins)": {
            materials: ["Pencil", "Eraser", "Optional: counters for visual aid"],
            advice: "The online worksheet is interactive, but physical manipulatives can help reinforce concepts"
        },
        "Shape identification & drawing": {
            materials: ["Paper", "Pencil", "Ruler", "Colored pencils"],
            advice: "Point out different shapes in your home environment before starting the activity"
        },
        "Counting games (1-100)": {
            materials: ["Number chart (optional)"],
            advice: "The online worksheet provides all necessary materials, but a physical 1-100 chart can be helpful"
        },
        "Simple word problems": {
            materials: ["Pencil", "Paper", "Small objects for counting (optional)"],
            advice: "Have small objects available to visualize the word problems if needed"
        },
        // Week 2 Math Tasks - Updated with worksheet information
        "Skip counting by 2s, 5s, 10s": {
            materials: ["Computer/tablet with internet connection", "Optional: physical number line"],
            advice: "The interactive worksheet provides all materials needed. Practice skip counting while walking up stairs or bouncing a ball to make it physical and fun"
        },
        "Measurement with rulers": {
            materials: ["Computer/tablet with internet connection", "Optional: real ruler", "Household objects to measure"],
            advice: "The worksheet has built-in digital rulers with accurate measurements. After completing online, try measuring real objects around the house with an actual ruler"
        },
        "Time telling practice": {
            materials: ["Computer/tablet with internet connection", "Optional: analog clock"],
            advice: "The worksheet features interactive HTML clocks that children can manipulate. Point out clocks around your home throughout the day to reinforce learning"
        },
        "Pattern recognition games": {
            materials: ["Computer/tablet with internet connection", "Optional: colored blocks or objects"],
            advice: "The interactive worksheet includes drag-and-drop pattern games. Create physical patterns with household objects to extend the learning"
        },
        "Money counting practice": {
            materials: ["Computer/tablet with internet connection", "Optional: real coins for hands-on practice"],
            advice: "The worksheet uses emoji coins for easy recognition. Have real coins available to let them handle and compare after completing the digital exercises"
        }
    },
    writing: {
        "Write about your weekend (20 mins)": {
            materials: ["Pencil", "Lined paper", "Eraser"],
            advice: "Discuss weekend activities together before writing to help generate ideas"
        },
        "Create a word list (new words)": {
            materials: ["Pencil", "Paper", "Children's dictionary (optional)"],
            advice: "Start collecting interesting words a few days in advance"
        },
        "Write a letter to grandparents": {
            materials: ["Stationery or paper", "Envelope", "Stamp", "Pencil", "Colored pencils for decoration"],
            advice: "Have the grandparents' address ready, and discuss letter formatting beforehand"
        },
        "Create a shopping list": {
            materials: ["Paper", "Pencil", "Magazines with food pictures (optional)"],
            advice: "Plan a real shopping trip to use the list they create"
        },
        "Write about today's activities": {
            materials: ["Notebook or journal", "Pencil", "Stickers (optional)"],
            advice: "Take photos of daily activities to help child remember what to write about"
        },
        "Write what you know about robots": {
            materials: ["Paper", "Pencil", "Pictures of robots (optional)"],
            advice: "Watch a short, age-appropriate video about robots a day before to inspire ideas"
        },
        "Write a thank you note": {
            materials: ["Nice paper or card", "Pencil", "Colored pencils", "Envelope (optional)"],
            advice: "Help them think of someone who has been kind to them recently - teacher, friend, family member"
        },
        "Create a story about a smart computer friend": {
            materials: ["Paper", "Pencil", "Colored pencils for illustrations"],
            advice: "Encourage creativity - the computer friend can have special powers or help solve problems"
        },
        "Write about favorite food": {
            materials: ["Paper", "Pencil", "Optional: magazines with food pictures"],
            advice: "Have them describe not just what it tastes like, but why it's special to them"
        },
        "Create a comic strip": {
            materials: ["Paper", "Pencil", "Colored pencils", "Ruler for panels"],
            advice: "Start with a simple 4-panel story. Help them plan the beginning, middle, and end before drawing"
        }
    },
    creative: {
        "Draw your favorite animal": {
            materials: ["Drawing paper", "Colored pencils/markers/crayons", "Eraser", "Reference pictures of animals"],
            advice: "Have reference pictures of their favorite animal ready for inspiration"
        },
        "Paper plate craft": {
            materials: ["Paper plates (at least 3)", "Safety scissors", "Glue", "Markers/paint", "Colored paper", "Pipe cleaners", "Googly eyes (optional)"],
            advice: "Have all materials laid out before starting to make the activity flow smoothly"
        },
        "Origami animals": {
            materials: ["Square origami paper (multiple colors)", "Safety scissors", "Markers for details"],
            advice: "Print out simple origami instructions beforehand - start with easy models like frogs or dogs"
        },
        "Finger painting": {
            materials: ["Washable finger paints", "Large paper", "Smock or old t-shirt", "Paper towels", "Wet wipes", "Drop cloth or newspaper to protect surfaces"],
            advice: "Set up in an area that's easy to clean - outdoors is ideal if weather permits"
        },
        "Collage making": {
            materials: ["Old magazines/newspapers", "Construction paper", "Safety scissors", "Glue stick", "Markers"],
            advice: "Collect interesting materials like fabric scraps, ribbon, dried leaves, etc. a few days in advance"
        },
        "Draw what a robot helper would look like": {
            materials: ["Drawing paper", "Colored pencils/markers", "Eraser"],
            advice: "Encourage them to think about what jobs the robot would do and how that affects its design"
        },
        "Rock painting": {
            materials: ["Smooth rocks (collect during nature walk)", "Acrylic paints", "Paint brushes", "Paper towels", "Water cup", "Newspaper for workspace"],
            advice: "Collect rocks a day before or make it part of an outdoor adventure. Wash and dry rocks thoroughly before painting"
        },
        "Bookmark making": {
            materials: ["Cardstock or heavy paper", "Markers/colored pencils", "Scissors", "Ruler", "Hole punch", "Ribbon or yarn"],
            advice: "Standard bookmark size is about 2 inches wide by 6 inches tall. Let them design bookmarks for different family members"
        },
        "Tissue paper flowers": {
            materials: ["Colored tissue paper", "Pipe cleaners", "Scissors"],
            advice: "Stack 4-6 sheets of tissue paper and cut into petal shapes. Twist pipe cleaner in the middle to create the flower"
        },
        "Nature art with leaves": {
            materials: ["Collected leaves (various shapes/sizes)", "Paper", "Glue", "Markers", "Optional: wax paper and iron for leaf pressing"],
            advice: "Collect leaves during a nature walk a day before. Press them in a book overnight to flatten them for easier use"
        }
    }
};
