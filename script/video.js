// Fetch, Load and Show Categories on html

// A function that convert seconds to hrs, min
function getTimeString(time){
  const hours = parseInt(time / 3600);
  let seconds = time % 3600;
  const minutes = parseInt(seconds / 60);
  return `${hours} hrs ${minutes} mins ago`
}

// 1. Create LoadCategories
const LoadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories))
    .catch((error) => console.log(error));
};
// 2. Create LoadVideos
const LoadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaaa",
//   thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//   title: "Shape of You",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//       profile_name: "Olivia Mitchell",
//       verified: "",
//     },
//   ],
//   others: {
//     views: "100K",
//     posted_date: "16278",
//   },
//   description:
//     "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
// };

// 2. Create DisplayVideos
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos-container");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class="h-[187px] relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute bg-[#2f2f2f99] text-[#ffffffae] rounded p-1 right-1 bottom-1 text-xs">${getTimeString(video.others.posted_date)}</span>`}
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
     <p></p>
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
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    // add button to category container
    categoryContainer.append(button);
  });
};

LoadCategories();
LoadVideos();
