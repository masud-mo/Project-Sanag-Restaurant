
const foodContainer = document.getElementById("foodContainer");

async function loadFoods(){
  if (!foodContainer) return;
  if (typeof axios === 'undefined') {
    console.error("Error: Axios is not loaded. Please include the Axios script in your HTML file.");
    return;
  }

  foodContainer.innerHTML = "";
  const promises = Array.from({ length: 6 }).map(() => 
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")

      .catch(() => null) 
  );

  try{
    const responses = await Promise.all(promises);
    responses.forEach((response) => {
      if (response && response.data && response.data.meals) {
        const meal = response.data.meals[0];

        const card = document.createElement("div");
        card.classList.add("food-card");
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="content">
            <h3>${meal.strMeal}</h3>
            <p>Category: ${meal.strCategory}</p>
          </div>
        `;
        foodContainer.appendChild(card);
      }
    });
  }catch(error){
    console.error("API Error:", error);
  }
}

loadFoods();


async function loadMenu() {
  const menuContainer = document.getElementById("menuContainer");
  if (!menuContainer) return;

  const categories = [
    { apiCat: 'Lamb', display: 'Main Dishes' },
    { apiCat: 'Starter', display: 'Appetizers' },
    { apiCat: 'Dessert', display: 'Desserts' }
  ];

  try {
    const promises = categories.map(cat => 
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.apiCat}`)
    );

    const responses = await Promise.all(promises);

    menuContainer.innerHTML = ""; 
    
    let customItems = [];
    try {
      customItems = JSON.parse(localStorage.getItem('sanagCustomMenu')) || [];
    } catch (error) {
      console.error("Error parsing custom menu data:", error);
      customItems = [];
    }

    if (customItems.length > 0) {
      const customCard = document.createElement("div");
      customCard.className = "menu-card";
      let customHtml = `<h3>Chef's Specials</h3>`;
      
      customItems.forEach(item => {
        customHtml += `
          <div class="menu-item" style="align-items: center;">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 15px;">` : ''}
            <div style="flex: 1;"><strong>${item.name}</strong><p>${item.desc}</p></div>
            <span style="color: #e67e22; font-weight: bold;">$${item.price}</span>
          </div>
        `;
      });
      customCard.innerHTML = customHtml;
      menuContainer.appendChild(customCard);
    }

    responses.forEach((response, index) => {
      const categoryConfig = categories[index];
      const meals = response.data.meals ? response.data.meals.slice(0, 4) : [];

      const card = document.createElement("div");
      card.className = "menu-card";

      let html = `<h3>${categoryConfig.display}</h3>`;

      meals.forEach(meal => {
        const price = (Math.random() * (25 - 5) + 5).toFixed(2);
        
        html += `
          <div class="menu-item">
            <div>
              <strong>${meal.strMeal}</strong>
              <p>Delicious authentic ${categoryConfig.display.toLowerCase().slice(0, -1)} option.</p>
            </div>
            <span>$${price}</span>
          </div>
        `;
      });

      card.innerHTML = html;
      menuContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading menu:", error);
    menuContainer.innerHTML = "<p>Unable to load menu items.</p>";
  }
}

loadMenu();

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
  });
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️'; 
  } else {
    themeToggle.textContent = '🌙';
  }
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = encodeURIComponent(`New Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    
    window.location.href = `mailto:info@sanaagrestaurant.com?subject=${subject}&body=${body}`;
  });
}
const adminLink = document.getElementById('adminLink');
if (adminLink) {
  if (sessionStorage.getItem('isLoggedIn') === 'true') {
    adminLink.textContent = 'Admin Dashboard';
    adminLink.href = 'admin.html';
  }
}
