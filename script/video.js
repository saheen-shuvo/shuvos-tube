// Fetch, Load and Show Categories on html

// A function that convert seconds to hrs, min
function getTimeString(time) {
  const hours = parseInt(time / 3600);
  let seconds = time % 3600;
  const minutes = parseInt(seconds / 60);
  return `${hours} hrs ${minutes} mins ago`;
}

// 1. Create LoadCategories
function LoadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error));
}

// 2. Create LoadVideos
const LoadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// A function to enable active button
const removeActiveClass = () => {
  const button = document.getElementsByClassName("button-category");
  console.log(button);
  for (let btn of button) {
    btn.classList.remove("active");
  }
};

//3. Button onclick category loader
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove every active class
      removeActiveClass();
      //active id er class
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// Load Details video
const loadDetails = async (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayVideoDetails(data.video);
};

// A function to display video Details
const displayVideoDetails = (video) => {
  console.log(video);
  const videoDetailsContainer = document.getElementById("modal-content");
  videoDetailsContainer.innerHTML = `
<img src=${video.thumbnail} />
<p class="pt-2 font-semibold text-sm">${video.description}</p>
`;

  document.getElementById("customModal").showModal();
};

// 2. Create DisplayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videoContainer.innerHTML = " ";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center">
     <img src="./assests/Icon.png" />
     <h2 class= "text-2xl font-bold poppins-font text-center">Oops!! Sorry, <br>There is no content here!</h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[187px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute bg-[#2f2f2f99] text-[#ffffffae] rounded p-1 right-1 bottom-1 text-xs">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
     <img class="w-8 h-8 rounded-full object-cover" src=${
       video.authors[0].profile_picture
     }/>
    </div>
    <div>
     <h2 class="font-semibold">${video.title}</h2>
     <div class="flex">
           <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
           ${
             video.authors[0].verified === true
               ? '<img class="w-[17px] h-[17px] mt-[3px] ml-1" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" />'
               : ""
           }
     </div>
     <p><button onclick="loadDetails('${
       video.video_id
     }')" class="btn btn-sm btn-error">Details</button></p>
    </div>
  </div>
        `;
    videoContainer.append(card);
  });
};

// 1. Create DisplayCategories
const DisplayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((item) => {
    console.log(item);
    // creating a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})"  class="btn button-category" >${item.category}</button>
    `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

LoadCategories();
LoadVideos();
