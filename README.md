# 🌿 SproutNest — Your Online Plant Haven  

Welcome to **SproutNest**, a beautifully designed online plant store where nature meets convenience. At SproutNest, we aim to bring greenery into every home with a curated selection of indoor plants, succulents, gardening tools, and more!  

---

**🚀 Demo:** [https://sprout-nest-fe.vercel.app/](https://sprout-nest-fe.vercel.app/)

---

## 🎥 Project Walkthrough

▶️ [**Watch the walkthrough video on Google Drive**](https://drive.google.com/file/d/1d3KfkKwKP88ZIH7epvhw6vUwN2NOrtJT/view?usp=drive_link)

---

## 🚀 Features  

- 🪴 **Wide Collection of Plants** — Indoor, outdoor, succulents, air-purifying, and flowering plants.  
- 🌐 **User-Friendly Interface** — Smooth browsing and search experience.  
- 🌱 **Plant Care Guides** — Tips and tutorials to keep your plants thriving.  
- 🧺 **Wishlist & Cart** — Save your favorites and shop anytime.  

---

## 🛠️ Tech Stack  

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend)

---
## 🌿 API Reference – SproutNest

### User Routes

- `POST /v1/user` — Register a new user  
- `GET /user` — Fetch all users  
- `POST /user` — Add a new user (admin)  
- `POST /v1/:userId/address` — Add address for a user  
- `POST /v1/address/:addressId` — Update existing address  
- `DELETE /v1/:userId/:addressId` — Delete a specific address  

### Product Routes

- `GET /products` — Fetch all products  
- `GET /products?new=true` — Fetch newly added products  
- `GET /products/category/:categoryId` — Get products by category ID  
- `GET /products/:productId` — Get product by ID  

### Category Routes

- `GET /categories` — Get all product categories  
- `GET /categories/:categoryId` — Get single category by ID  

---

## 📦 Installation  

### 1. Clone the Repository  

```bash
git clone https://github.com/yourusername/sproutnest.git
cd sproutnest
```  

### 2. Install Dependencies  

```bash
npm install
# or
yarn install
```  

### 3. Set up Environment Variables  

Create a `.env` file in the root directory:  

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
```  

### 4. Run the Server  

```bash
npm run server
# or
yarn server
```  

### 5. Run the Frontend  

```bash
cd client
npm start
# or
yarn start
```  

## 📚 Plant Categories  

- Indoor Plants  
- outdoor Plants  
- Air Purifying Plants  
- Flowering Plants
- Pots and Planters
- Gardening Accessories  

---

## 🧑‍💻 Contributing  

We welcome contributions! Please follow these steps:  

1. Fork the project  
2. Create your feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add YourFeature'`)  
4. Push to the branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request  

---

> 🌱 **SproutNest** — Nurture your space, naturally.  

---
