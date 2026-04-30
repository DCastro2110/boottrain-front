# Home Page

## Technical Requirements

- Create a home page equal to the [Node ID: JflQA] using Pencil MCP
- You should make a request to the API to get the data for the home page, and use that data to populate the page, use the GetHomeInfo function created by orval.
- In the "Consistency" block de squares only can use three colors (blue (exercise completed), light blue (exercise started) and white (exercise not started)). Create a component to render the squares with the correct color based on the data received from the API.
- The "Consistency" block should show 7 days of the current week, starting from Sunday to Saturday. Each square should represent a day of the week and its color should indicate the user's exercise status for that day.
- In the "Treino de Hoje" block, display the card [Node ID: YNMOw] with name of the workouDay, the weekday name, estimatedDuration and number of exercises. If the day is rest day, show the card [Node ID: hOE4O]. Create a separated component to WorkoutDays and RestDay, they will be used in other pages.
- Create a navbar in bottom of the page with the icons and labels as shown in the design. The icons should be interactive and navigate to the corresponding pages when clicked. [Node ID: tXHdU]. Create a separated component for the Navbar, it will be used in other pages.
