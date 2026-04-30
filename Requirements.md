 [**Requirement Explanation Video 📹**](https://drive.google.com/file/d/1_ykL5s9mFTakh1ABPRuLiYrMOuy5D9z-/view?usp=sharing)

**Assignment Category : category-A8-Jackfruit**

## **SunCart – Summer Essentials Store**

##### **Project Theme**

A modern summer eCommerce platform where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more. Users can browse products, view details, and place orders after authentication.

---

##### **Key Things you have must to do**

* **GitHub Commits:** Include at least 10 meaningful commits with descriptive messages.

* **Readme.md:** Include a README file with the project name, purpose, live URL, key features, and any npm packages you have used.

* **Responsiveness:** Ensure the website is fully responsive on mobile, tablet, and desktop.

* **Environment Variables:** Secure configuration keys using environment variables.

* **Unique Design:**  Create a unique design that goes with the given Concept. You can use this [blog](https://medium.com/design-bootcamp/free-images-and-resources-collection-for-website-c77f2fc46ce5) for these kinds of resources 

* **Host your Application:**  You can choose deployment systems  like vercel, render for hosting . As you are developing a single page application   
  * ensure that  page doesn't throw any error on reloading from any routes.  

---

## **Main Requirements**

## **1\. Layout Structure**

### **🔝 Navbar**

* Logo  
* Links: **Home, Products, My Profile**  
* If logged in:  
  * Show user avatar  
  * Logout button  
* If logged out:  
  * Login / Register buttons

### **🔻 Footer**

* Contact info  
* Social links  
* Privacy policy

### **📦 Main Layout**

* Persistent Navbar & Footer  
* Route-based rendering (Next.js App Router)

## **2\. Product Data (JSON / Static)**

Create a JSON file with **at least 6 summer products**

### **Example:**

* \[  
*   {  
*     "id": 1,  
*     "name": "UV Protection Sunglasses",  
*     "brand": "SunShade",  
*     "price": 15,  
*     "rating": 4.7,  
*     "stock": 10,  
*     "description": "Stylish UV protection sunglasses perfect for summer outings.",  
*     "image": "https://i.postimg.cc/example1.png",  
*     "category": "Accessories"  
*   }  
* \]

## **3\. Home Page**

### **🌅 Hero Section**

* Summer sale banner / slider  
* Highlight offers like:  
  * “Summer Sale 50% OFF”  
  * “Hot Deals 🔥”

### **🔥 Popular Products**

In this section show any 3 products from the json data you have created in step 2\.

Each card must show:

* Image  
* Product Name  
* Rating  
* Price  
* **View Details button**

### **➕ Extra Sections**

* **“Summer Care Tips”** (e.g., skincare, hydration tips)  
* **“Top Brands”** (3–4 static brand cards)

## **4\. Product Details Page 🔒 (Protected Route)**

* Only accessible if logged in  
* If not logged in → redirect to login  
* After login → redirect back

### **Show:**

* Full product details in this page nicely

## **5\. Authentication (BetterAuth)**

### **🔐 Login Page**

The user will  show  a Login page with a form , so that the user can Log in this application. 

- Show a Title for Login.  & Form with following fields   
  ( Email , Password , Login button ) 

If the user Login successfully then 

- navigate him to his Home page.  
- If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- Show the user a Link for Register  so that he can go to the register page.   
- Show users a Social Login Button ( Google only ) . on Clicking it   
  - user authenticate with Google  
  -  Navigate him to  his Home page.

---

### **📝 Register Page**

Create a register page with a form , so that the user can register himself in this application. 

- Show a Title for registration and a Form with following fields

( Name , Email, Photo-url(link), Password & Register Button ) 

If the user Register successfully then 

- navigate him to his login page.  
- If not, show him an error with toast / error message anywhere in the form.

There will be some other options like 

- Show the user a Link for Login so that he can go to the Login page.   
- Show users a Social Login Button ( Google only ) . on Clicking it   
  - user authenticate with Google  
  - Navigate the user to the Home page.

 💡Don’t implement email verification or forget password method as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result.

## **🧩 Challenges (Bonus Marks)**

##### **1\. My Profile** 

My profile page shows logged-in profile data name, photo, email

**2\.** **Update Information Feature**

- In my-profile route there will be an update button on Clicking it.  Take user to another route   
  - Show user a form with 2 input field ( image and Name )   
  - An Update Information button.

Follow this documentation: [**https://better-auth.com/docs/concepts/users-accounts\#update-user**](https://better-auth.com/docs/concepts/users-accounts#update-user) 

 

##### **3\.** Implement any one npm package from the following in your project

- [Animate.css](https://animate.style/),   
- [React-Spring](https://www.react-spring.dev/docs/components/parallax)  
- [Lottie](https://www.npmjs.com/package/@lottiefiles/dotlottie-web?activeTab=readme)

##### 

**Tech Stack:** 

* **Next JS**  
* **Tailwind CSS**  
* **DaisyUI/HeroUI**  
* **BetterAuth**

### **What to Submit** 

Your Github Repo Link :   
Your Live Link : 

