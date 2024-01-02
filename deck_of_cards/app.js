$(function () {
  let baseURL = "https://deckofcardsapi.com/api/deck";

  async function get_card() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  async function get_two_cards() {
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCardData.deck_id;
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCardData, secondCardData].forEach((card) => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  async function draw_cards() {
    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
    $("button")
      .show()
      .on("click", async function () {
        let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
        console.log(cardData);
        let cardSrc = cardData.cards[0].image;

        $("#show-cards").append(
          $("<img>", {
            src: cardSrc,
            class: "card",
          })
        );
        if (cardData.remaining === 0) $("button").remove();
      });
  }
  draw_cards();
});
