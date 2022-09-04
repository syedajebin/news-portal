
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
        <a href="#" class=" nav-link  mx-3  p-1" onclick="selectedCategories(${item.category_id})">${item.category_name}</a>
        `

        ul.appendChild(list);




    })

}


const Spiner = (Loading) => {
    const loadSpiner = document.getElementById('loader');
    if (Loading) {
        loadSpiner.classList.remove('d-none');

    }

    else {
        loadSpiner.classList.add('d-none');

    }

}


const selectedCategories = (categories_id) => {

    Spiner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/0${categories_id}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => showCategoryByID(data))
        .catch((error) => {
            console.log('Error :', error);
        })



}






const showCategoryByID = (data) => {

    const cardFoundNumber = document.getElementById("card");
    const length = data.data.length
    if (length > 0) {
        cardFoundNumber.innerText = `${length} items found `;
    }
    else if (length === 0) {
        cardFoundNumber.innerText = "Sorry!! No Items Found!!!";
        Spiner(false);
    }



    const parentRows = document.getElementById("parent-row");

    parentRows.innerText = '';


    const sortedData = data.data.sort((x, y) => {
        return x.total_view - y.total_view;
    });
    const reverseSortData = sortedData.reverse();


    reverseSortData.forEach((item) => {
        const date = item.author.published_date;


        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
        <div class="row gx-0 shadow" id="added-card-row" >
        <div class="col-lg-4 col-md-4 col-sm-12 dynamic-card-img">
            <img src="${item.thumbnail_url
            }" class="img-fluid p-3 d-block" class="card-images ">
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12">
            <div class="p-3">
                <h3 class="card-titless">${item.title
            }</h3>
                <p>${item.details.slice(0, 500)}....</p>
            </div>
            <div class="row gx-0 my-3" id="card-footer-row ">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="d-flex align-items-center h-100 justify-content-evenly">
                    <div class="d-flex">
                    <div class="author-image">
                    <img src="${item.author.img}" id="author-images" class="d-block  rounded-circle">
                    </div>
                    <div class="author-writter-date ps-3">                
                     <p class="mb-0">${item.author.name ? item.author.name : "N/A"}</p>
                     <p>${date ? date.slice(0, 10) : "n/a"}</p>
                     </div>
                    </div>
                     <div class=" d-flex h-50 justify-content-center align-items-center" id="view-icon">
                    <p class="me-1"><i class="fa-regular fa-eye"></i></p>
                    <p class="ms-1 fw-bold">${item.total_view ? item.total_view : "No User View"
            }</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
            <div class="star-icon d-flex justify-content-evenly h-100 align-items-center">
            <div class="rating-center">
                <span class="d-inline-block">
                    <i class="fa-solid fa-star-half-stroke"></i>
                </span>
                <span class="d-inline-block">
                    <i class="fa-solid fa-star"></i>
                </span>
                <span class="d-inline-block">
                    <i class="fa-solid fa-star"></i>
                </span>
                <span class="d-inline-block">
                    <i class="fa-solid fa-star"></i>
                </span>
                <span class="d-inline-block">
                    <i class="fa-solid fa-star"></i>
                </span>
            </div>
            <div class="arrow-icon-center"  onclick="GeneratingModal('${item._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <span class="d-inline-block">
                    <i class="fa-solid fa-arrow-right text-danger fw-bold" style="cursor: pointer;"></i>
                </span>
            </div>
           </div>
             </div>
                    
                

                </div>
                
            </div>
        </div>
    </div>
        
        `





        parentRows.appendChild(div);
        Spiner(false);




    })

}

const generatingModalCardByid = async (category_id) => {

    const url = ` https://openapi.programming-hero.com/api/news/${category_id}`;




    fetch(url)
        .then((response) => response.json())
        .then((data) => showingModalCard(data))
        .catch((error) => {
            console.log('Error Meassage:', error);
        })
}

const showingModalCard = (data) => {


    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add(".card");

    div.innerHTML = `
    <h3 class="mb-2">${data.data[0].title}</h3>
    <img src="${data.data[0].image_url}" class="img-fluid">
    <p>${data.data[0].details ? data.data[0].details.slice(0, 400) : ''}</p>

    <div class="author d-flex align-items-center">
    <div class="author-image">
        <img src="${data.data[0].author.img}" id="author-images" class="d-block  rounded-circle">
    </div>
   <div class="author-writter-date ps-3">
    <p class="mb-0 fw-bold">${data.data[0].author.name ? data.data[0].author.name : "N/A"}</p>
    <small>${data.data[0].author.published_date ? data.data[0].author.published_date : "not found"}</small>
   </div>
   </div>

    <div class="d-flex justify-content-between mt-2">
    
    <div class="view  d-flex align-items-center h-100">
    <div class=" d-flex h-50 justify-content-center align-items-center" id="view-icon">
    <p class="me-1"><i class="fa-regular fa-eye"></i></p>
    <p class="ms-1 fw-bold">${data.data[0].total_view ? data.data[0].total_view : "No View"
        }</p>
    </div>
    </div>
    
    <div class="rating d-flex align-items-center h-100 ">
                   <div class="rating-center">
                    <span class="d-inline-block">
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </span>
                    <span class="d-inline-block">
                        <i class="fa-solid fa-star"></i>
                    </span>
                    <span class="d-inline-block">
                        <i class="fa-solid fa-star"></i>
                    </span>
                    <span class="d-inline-block">
                        <i class="fa-solid fa-star"></i>
                    </span>
                    <span class="d-inline-block">
                        <i class="fa-solid fa-star"></i>
                    </span>
                   </div>
                </div>
    
    </div>

    `
    modalBody.appendChild(div);
}



const GeneratingModal = (id) => {


    generatingModalCardByid(id);




}




selectedCategories(08)
loadCategoryItem()