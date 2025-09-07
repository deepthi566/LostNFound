# **Lost & Found Web Application**

# **Overview**

The Lost & Found web application is designed to help people quickly reconnect with their lost belongings or report items they have found. Users can register, log in, create listings for lost or found items, browse existing items, and contact the owners. The platform focuses on user-friendliness, fast access, and secure management of items, leveraging the MERN stack (MongoDB, Express, React, Node.js).

# **Technologies Used**

**Frontend**: React, Tailwind CSS, React Router, Swiper.js (image carousel), react-hot-toast (notifications)

**Backend**: Node.js, Express.js

**Database**: MongoDB, Mongoose (ODM)

**Authentication & Security**: JWT (JSON Web Tokens), bcrypt (password hashing)

**File Uploads**: Multer

**Environment Management**: dotenv

# **Problem Identified**

Losing personal items is a common problem, and there’s often no simple platform to quickly report lost/found items.

Existing solutions are either too generalized (like social media) or fragmented (physical notice boards, community forums).

Users needed a centralized, digital platform to track, post, and search for lost or found items efficiently.

# **Approach & Key Features**

The app takes a user-centered approach to create a full-stack solution:

## **User Registration & Authentication**

- Secure signup/login using JWT
- Passwords hashed using bcrypt
- Only authenticated users can create, update, or delete their items

## **Item Management**

- Create lost or found item listings with images
- Update or delete items by the user who posted them
- Browse all items or filter by status (Lost/Found)

## **UI & UX**

- Responsive design using Tailwind CSS
- Mobile-friendly navigation with a hamburger menu
- Image carousel for item photos (Swiper.js)
- Real-time feedback using notifications (react-hot-toast)

# **Impact**

- Provides a centralized platform for reconnecting lost items with their owners
- Reduces the time and effort required to report or search for items
- Encourages community engagement in helping return lost belongings
- Enhances accessibility by being fully responsive on mobile devices

# **Contributions**

- Designed and implemented the frontend using React and Tailwind CSS
- Developed the backend API using Node.js, Express, and MongoDB
- Integrated secure authentication and authorization with JWT
- Implemented image uploads for item listings
- Developed filtering and listing functionality for lost/found items
