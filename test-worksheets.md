## How to Test Your Summer Learning Worksheets

Follow these steps to see your new interactive worksheets integrated into the Summer Learning Adventure app:

1. Open your terminal and navigate to the project directory:
   ```
   cd /Users/jnarayanassamy/Janar/personel/kids/summerplan2025
   ```

2. Start a local web server to host the application:
   ```
   python3 -m http.server 8000
   ```
   Or if Python 3 is not available:
   ```
   python -m SimpleHTTPServer 8000
   ```

3. Open a browser and navigate to:
   ```
   http://localhost:8000
   ```

4. In the application:
   - You'll see "Open Worksheet" buttons on math and writing tasks for weeks 1-4
   - Click these buttons to open the interactive worksheets in a new window
   - You can complete the worksheets, save your progress, and return to the main application

5. To test a specific worksheet directly, navigate to:
   ```
   http://localhost:8000/worksheets/math-week1-addition.html
   http://localhost:8000/worksheets/math-week2-subtraction.html
   http://localhost:8000/worksheets/math-week3-double-digit-addition.html
   http://localhost:8000/worksheets/math-week4-multiplication.html
   http://localhost:8000/worksheets/writing-week1-weekend.html
   http://localhost:8000/worksheets/writing-week2-robots.html
   http://localhost:8000/worksheets/writing-week3-letter.html
   http://localhost:8000/worksheets/writing-week4-tech-hero.html
   ```

6. When you're done testing, press Ctrl+C in the terminal to stop the local server.
