# Jobility: Unlocking Opportunities for Inclusivity and Employment

## Description

"Jobility" is a groundbreaking job portal application designed to address the employment gap for individuals with disabilities in Indonesia. With the tagline "Unlocking Opportunities for Inclusivity and Employment," this platform aims to empower people with disabilities to embark on meaningful career journeys by providing them with tailored resources and opportunities.

## Features

1. **Job Search:** A robust platform enabling users to search for job opportunities based on preferences, skills, and location. Additionally, a dedicated section allows inclusive hiring companies to post jobs and connect with diverse talent.

2. **Disability-friendly Accessibility Feature:** A cornerstone feature ensuring the inclusivity of the job portal. It includes:

   - Screen Reader Compatibility
   - High-contrast mode
   - Keyboard Navigation
   - Alternate Text
   - Resizable Text and Fonts
   - Text-to-speech
   - Closed Captions
   - Customizable Themes

3. **User Profile:** Users can create detailed profiles, providing information about their disabilities, accommodation needs, and specific skills.

4. **Login and Register:** Secure user authentication with a robust login and registration system.

## Tech Stack

- **Database:** MySQL - An open-source relational database management system (RDBMS).
- **Backend:** Express.js - A fast and minimalist web application framework for Node.js.
- **Frontend:** React.js - A powerful JavaScript library for building dynamic user interfaces.
- **Runtime Environment:** Node.js - A runtime environment for executing JavaScript code on the server side.

## How to Run

1. Copy `.env.example` to `.env.development` and `.env.production`.
2. Configure the `.env.development` and `.env.production` files.
3. Run `npm install`.
4. Run `npx prisma generate`.
5. Run `npm run dev`.

## How to Run in a Container

- To run the application in a container, use your preferred containerization tool (Docker, Podman, etc.) and follow their respective instructions for containerizing a Node.js application.

## Postman API Documentation

- Explore the [Jobility API](https://www.postman.com/art-war-160510/workspace/jobility-api/overview) using Postman.

## Tables:

### Users

- id: Int (Primary Key, Auto-increment)
- email: String (Unique)
- password: String
- fullname: String
- profilePicture: String (Nullable)
- gender: Enum (Gender: Male/Female, Nullable)
- disabilityId: Int (Nullable, Foreign Key referencing disability.id)
- skills: String
- education: String
- experience: String
- certification: String
- preferredJob: String
- linkedAccounts: String
- contact: String
- cv: String
- createdAt: DateTime (Default: Current DateTime)
- updatedAt: DateTime (Auto-updated)
- deletedAt: DateTime (Nullable)
- Application: One-to-Many relationship with applications

### Applications

- id: Int (Primary Key, Auto-increment)
- userId: Int (Foreign Key referencing users.id)
- jobId: Int (Foreign Key referencing jobs.id)
- status: Enum (Status: Pending/OnReview/Accepted/Rejected/Withdrawn/Hired/Expired)
- coverLetter: String
- dateApplied: DateTime

### Jobs

- id: Int (Primary Key, Auto-increment)
- title: String
- description: String
- type: Enum (JobType: Fulltime/Contract/Internship/Parttime/Temporary/FreshGraduate/Subcontract)
- system: Enum (JobSystem: Onsite/Remote/Hybrid)
- location: String
- salary: Int
- requirement: String (Nullable)
- datePosted: DateTime
- dateClosed: DateTime (Nullable)
- jobcategoryId: Int (Foreign Key referencing job_categories.id)
- companyId: Int (Foreign Key referencing companies.id)
- disabilityId: Int (Nullable, Foreign Key referencing disability.id)
- Application: One-to-Many relationship with applications

### Job Categories

- id: Int (Primary Key, Auto-increment)
- name: String
- jobs: One-to-Many relationship with jobs

### Companies

- id: Int (Primary Key, Auto-increment)
- name: String
- logo: String (Nullable)
- description: String (Nullable)
- location: String (Nullable)
- industry: String (Nullable)
- links: String (Nullable)
- contact: String (Nullable)
- jobs: One-to-Many relationship with jobs

### Disability

- id: Int (Primary Key, Auto-increment)
- name: String
- User: One-to-Many relationship with users
- Job: One-to-Many relationship with jobs

## License

This project is licensed under the [MIT License](LICENSE).

---
