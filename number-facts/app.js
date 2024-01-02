let baseURL = "http://numbersapi.com";
let favoriteNum = 8;

async function fact_fav_num() {
  let data = await $.getJSON(`${baseURL}/${favoriteNum}?json`);
  console.log(data);
}
fact_fav_num();

const favoriteNums = [2, 12, 25];

async function multi_nums_facts() {
  console.log("here");
  let data = await $.getJSON(`${baseURL}/${favoriteNums}?json`);

  console.log(data[2]);

  $("#show-multi-facts").append(`<p>${data[2]}</p>`);
  $("#show-multi-facts").append(`<p>${data[12]}</p>`);
  $("#show-multi-facts").append(`<p>${data[25]}</p>`);
}

async function four_facts() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favoriteNum}?json`))
  );
  facts.forEach((data) => {
    $("#best-num-facts").append(`<p>${data.text}</p>`);
  });
}

$("#multi-numbers-btn").on("click", function () {
  multi_nums_facts();
});

$("#best-number-btn").on("click", function () {
  four_facts();
});
