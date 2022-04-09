const modelItemsAmount = document.getElementsByClassName('home__item').length;
const maxAmountOfModelItems = 10;

if (modelItemsAmount <= maxAmountOfModelItems) {
    const deleteAllButton = document.getElementsByName('delete-all-button')[0];
    deleteAllButton.remove();
}