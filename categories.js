const loadCategoryItem = async () => {
    const url = ' https://openapi.programming-hero.com/api/news/categories'

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayCategoriesItem(data);
    }

    catch (error) {
        console.log("ERROR MESAGE  : " + error);

    }
}

const displayCategoriesItem = (item) => {

    const itemArray = item.data.news_category
    const ul = document.getElementById("categories-ul");



    itemArray.map((item) => {


        const list = document.createElement("li");
        list.classList.add("nav-item");

        list.innerHTML = `
        <a href="#" class="category-itemss nav-link  mx-3  p-1" onclick="selectedCategories(${item.category_id})">${item.category_name}</a>
        `

        ul.appendChild(list);




    })

}