## 🎵 Lyrics-Finder - Song Lyrics Search API

### 📖 Project Context

**Lyrics-Finder** is a REST API application that allows users to **search for and discover song lyrics** easily. In addition to providing lyrics, the application offers **extra features** to enhance the user experience, such as artist information.

### 🚀 Application Objectives

1. **Lyrics Search**: Allow users to quickly find lyrics for any song.
2. **Additional Information**: Provide details about artists.

### 📌 User Stories

- As a user, I can create an account using my email and a secure password.
- As a user, I can log in to my existing account using my email and password.
- As a user, I can reset my password.
- As a user, I can view the lyrics of a song.
- As a user, I can browse the list of artists and their songs.
- As a user, I want to receive email updates about new releases.
- As a user, I want to unsubscribe from the newsletter.
- As an admin, I can add song lyrics and artist details.
- As an admin, I can update song lyrics and artist information.
- As an admin, I can delete existing song lyrics.
- As an admin, I can modify user roles.

### 📊 Database Schemas

- **Artist**: `id, firstname, lastname, picture_url, genre, born_date, birth_city, died_date`
- **Song**: `id, genre, title, recorded_date, lyrics`
- **User**: `id, firstname, lastname, email, password, isAdmin`

### 🛠️ Technologies and Platforms

- **Backend**: Node.js, Express, TypeScript, Mongoose
- **Database**: MongoDB
- **Data Validation**: express-validator
- **Authentication**: JWT
- **Image Uploads**: Cloudinary or Amazon S3
- **Error Handling**: Custom error management
- **Unit Testing**: Jest & Supertest
- **Email Service**: Nodemailer (SMTP)
- **Cron Jobs**: Automated newsletter delivery

---

## 🎉 Contribution

Contributions are welcome!

- Fork the repo
- Create a branch (`feature/improvement`)
- Submit a PR

---

## 📄 License

This project is licensed under the MIT License. See the **LICENSE** file for details.

---

## 📬 Contact

For any questions, feel free to contact me:

- **Email**: [aboulouafareda@gmail.com]
- **LinkedIn**: [Reda Aboulouafa](www.linkedin.com/in/reda-aboulouafa-993a11220)

