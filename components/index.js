const foodContainer = document.getElementById("foodContainer");

async function loadFoods(){
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
    console.log(responses)
    responses.forEach((response) => {
      if (response && response.data && response.data.meals) {
        const meal = response.data.meals[0];

        const card = document.createElement("div");
        card.classList.add("food-card");
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="content">
            <h3>${meal.strMeal}</h3>
            <p>Delicious meal prepared with traditional flavors.</p>
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


const menuData = [
  {
    category:"Main Dishes",
    items:[
      {name:"Hilib Ari", desc:"Tender goat meat served with spiced rice", price:"$15.99"},
      {name:"Bariis iyo Hilib", desc:"Somali-style rice with braised beef", price:"$14.00"},
      {name:"Suqaar", desc:"Diced meat sautéed with vegetables", price:"$13.99"},
      {name:"Sabayad", desc:"Flatbread served with curry sauce", price:"$11.00"}
    ]
  },
  {
    category:"Appetizers",
    items:[
      {name:"Sambuusa", desc:"Crispy pastry filled with spiced meat", price:"$2.99"},
      {name:"Bajiye", desc:"Bean fritters with green chilies", price:"$4.00"},
      {name:"Malawah", desc:"Sweet pancake-like bread", price:"$3.99"}
    ]
  },
  {
    category:"Drinks",
    items:[
      {name:"Shaah", desc:"Somali spiced tea", price:"$2.99"},
      {name:"Qaxwo", desc:"Traditional Somali coffee", price:"$2.00"},
      {name:"Mango Juice", desc:"Fresh mango juice", price:"$3.99"}
    ]
  }
];

const menuContainer = document.getElementById("menuContainer");

menuData.forEach(category=>{
  const card = document.createElement("div");
  card.className="menu-card";

  let html = `<h3>${category.category}</h3>`;

  category.items.forEach(item=>{
    html += `
      <div class="menu-item">
        <div>
          <strong>${item.name}</strong>
          <p>${item.desc}</p>
        </div>
        <span>${item.price}</span>
      </div>
    `;
  });

  card.innerHTML = html;
  menuContainer.appendChild(card);
});

