document.addEventListener("DOMContentLoaded", function () {
    const codeBackground = document.getElementById('code-background');

    const lines = [
        'std::string name = "Arpan Gupta";',
        'std::string greet() { return "Hello, welcome to my portfolio!"; }',
        'std::vector<std::string> skills = {"C", "C++", "Python", "Web Development", "Java"};',
        'if (std::count(skills.begin(), skills.end(), "Web Development")) std::cout << "I love coding!";',
        'std::vector<std::string> projects = {"Sign Language Recognition", "Portfolio Page"};',
        'void contactMe() { std::cout << "Feel free to reach out!"; }'
    ];

    let currentLine = 0;

    function typeLine() {
        const codeLine = document.createElement('div');
        codeLine.classList.add('code-line');
        const textElement = document.createElement('span');
        textElement.classList.add('text');
        const cursorElement = document.createElement('span');
        cursorElement.classList.add('cursor');
        codeLine.appendChild(textElement);
        codeLine.appendChild(cursorElement);
        codeBackground.appendChild(codeLine);

        let index = 0;
        const typingSpeed = 100; // Speed of typing each character

        // Typing each character one by one
        function typeCharacter() {
            if (index < lines[currentLine].length) {
                textElement.textContent += lines[currentLine].charAt(index);
                index++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Pause after typing, then delete the line
                setTimeout(() => deleteLine(codeLine), 2000); // Pause for 2 seconds
            }
        }

        // Deleting the typed line
        function deleteLine(lineElement) {
            let length = textElement.textContent.length;
            const deletingSpeed = 50; // Speed of deleting each character

            function deleteCharacter() {
                if (length > 0) {
                    textElement.textContent = textElement.textContent.slice(0, -1);
                    length--;
                    setTimeout(deleteCharacter, deletingSpeed);
                } else {
                    // Remove the line completely and proceed to the next
                    lineElement.remove();
                    currentLine = (currentLine + 1) % lines.length;
                    typeLine(); // Type the next line
                }
            }

            deleteCharacter();
        }

        typeCharacter(); // Start typing the current line

        // Update cursor position when the line wraps
        function updateCursorPosition() {
            const lineWidth = codeLine.offsetWidth;
            const textWidth = textElement.offsetWidth;
            
            // If text width exceeds the line width, move the cursor to the next line
            if (textWidth > lineWidth) {
                cursorElement.style.marginLeft = `${textWidth - lineWidth}px`; // Adjust cursor for wrapped text
            } else {
                cursorElement.style.marginLeft = `${textWidth}px`; // Keep cursor at the end of the current text
            }
        }

        // Continuously check and adjust cursor position while typing
        setInterval(updateCursorPosition, 100); // Update every 100ms (or adjust as needed)
    }

    typeLine(); // Begin typing the first line
});

// Function to determine the greeting based on local time
function getGreeting() {
    const hours = new Date().getHours();
    let greeting = "Hello!"; // Default greeting for night time

    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 18) {
        greeting = "Good Afternoon!";
    } else if (hours >= 18 && hours < 22) {
        greeting = "Good Evening!";
    }

    return greeting;
}

document.addEventListener("DOMContentLoaded", function() {
    const greetingElement = document.getElementById('greeting');
    const greetingMessage = getGreeting();

    // Display the greeting message along with "Get in Touch"
    greetingElement.textContent = greetingMessage + " Get in Touch";

    // Ensure the "Get in Touch" message is visible even during the night
    document.querySelector('p').style.display = 'block'; // Ensure "Get in Touch" is shown during night too
});
