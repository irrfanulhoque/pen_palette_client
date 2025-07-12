PenPalette - Blog Platform
Welcome to PenPalette, a place to explore, create, and share your amazing blog posts! Whether you're an aspiring writer or an avid reader, this platform provides a smooth and intuitive user experience. Below are the deployment guidelines, project requirements, and instructions for setting up and using PenPalette.

🚀 Deployment Guideline
To ensure the smooth deployment and avoid any issues, please follow these guidelines carefully:

Production Setup: Ensure your server is working perfectly on production and not throwing any errors like CORS, 404, or 504. Double-check the functionality of your Live Link.
No Errors on Reload: Ensure that no errors occur when the page is reloaded from any route.
Domain for Firebase: If you deploy using platforms like Netlify or Surge, ensure that your domain is added to Firebase authorization.
Private Route Protection: Ensure logged-in users are not redirected to the Login page when they reload a private route.
Error Handling: Handle authentication errors properly (e.g., email/password failures) and provide clear messages to users.
🌍 Layout & Page Structure
Navbar
The navigation bar includes the following links:

Home

Add Blog (Private)

All Blogs

Featured Blogs

Wishlist (Private)

If the user is not logged in, show Login and Register buttons.

If the user is logged in, display the profile picture and a Logout button.

🔑 Authentication System
Email/Password Authentication: Implement user registration and login using email/password.

Extra Authentication Method: Integrate at least one additional login method (e.g., Google, Facebook, GitHub).

Error Handling: Display error messages when email/password authentication fails and validate password criteria:

At least 6 characters.
Includes uppercase letter, special character, and numeric character.
404 Page: Include a 404 (Not Found) page for invalid routes.

🏠 Home Page
The Home Page features:

Header: A simple navbar with links to different pages.
Banner: A hero section showcasing your blog's vibe.
Recent Blogs: Display six recent blog posts with the following features:
Blog Title
Blog Image
Short Description
Details and Wishlist buttons.
Clicking Wishlist adds the blog to the logged-in user's wishlist.
Newsletter Section: A section where users can subscribe by entering their email. Upon submission, show a toast message thanking them for subscribing (without sending actual emails).
Extra Sections
Tips Section: Add unique and creative ideas that make your platform stand out.
📚 All Blogs Page
Display all blogs from any user.
Search & Filter: Implement search functionality for blog titles and filter by category.
Wishlist: Each blog has a Wishlist button that allows the logged-in user to save blogs to their wishlist.
MongoDB Search: Use MongoDB’s text search for efficient searching.
📖 Blog Details Page
Display detailed information about each blog.
Comment Section: Allow users to comment, showing their name and profile picture.
No comments from blog owners: Users cannot comment on their own blogs.
Conditional Update Button: Blog owners can update their blogs via a dynamic route.
Comment Data: Store comments in a separate collection and associate comments with blog IDs.
📝 Add Blog Page
Allow users to add a new blog.
Form Fields:
Title
Image URL
Category (dropdown)
Short and Long Description
Ensure proper validation and handling for blog submissions.
✏️ Update Blog Page
Logged-in users can edit/update blogs they’ve created.
Auto-fill existing blog data in the form for easy updating.
⭐ Featured Blogs Page
Top 10 Blogs: Display the top 10 blogs based on the word count of their long description.
Table Layout: Implement a sortable table to display featured blogs.
📋 Wishlist Page
Show all blogs that a user has wishlisted.
Remove from Wishlist: Include a button to remove blogs from the wishlist.
🏆 Challenge Requirements
Server-Side Filters: Implement server-side queries to filter the wishlist based on the logged-in user.
Sortable Table: Implement a sortable table for featured blogs using one of the following libraries:
Ka-table
Tanstack-Table (recommended)
React-data-table
Mui-datatables
React-table-library
Framer Motion: Use Framer Motion for smooth animations on the home page.
JWT Authentication: Ensure that all private routes are protected using JWT Authentication.
🛠 Setup Instructions
Clone the repository:


git clone https://github.com/your-username/penpalette.git
cd penpalette
Install dependencies:


npm install
Run the app locally:


npm start
Deploy to your preferred hosting platform (Vercel, Netlify, etc.).

💡 Contributors
Aminul Islam  - Creator and Developer
Feel free to fork, clone, and contribute to the project!

📢 License
This project is licensed under the MIT License - see the LICENSE file for details.

Thank you for choosing PenPalette! Enjoy writing and sharing your creative ideas with the world. Happy blogging! 🚀📚