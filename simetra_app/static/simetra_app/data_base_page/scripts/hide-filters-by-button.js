function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function isAdaptive() {
    const border = 1080;
    return getWidth() <= border;
}

function showOrHideFilterByButton() {
    const filter = document.getElementsByName('filters')[0];
    let isFilterHidden = filter.classList.contains('_hide-element');

    if (isFilterHidden) {
        filter.classList.remove('_hide-element');
    } else {
        filter.classList.add('_hide-element');
    }
}

function showOrHideFilterByApative() {
    const filter = document.getElementsByName('filters')[0];
    const isFilterHidden = filter.classList.contains('_hide-element');

    if (isAdaptive() && !isFilterHidden) {
        filter.classList.add('_hide-element');
    }

    if (!isAdaptive() && isFilterHidden) {
        filter.classList.remove('_hide-element');
    }
}

function showOrHideFilterButtonByAdaptive() {
    const button = document.getElementsByName('filter-button')[0];
    const isButtonHidden = button.classList.contains('_hide-element');

    if (isAdaptive() && isButtonHidden) {
        button.classList.remove('_hide-element');
    }

    if (!isAdaptive() && !isButtonHidden) {
        button.classList.add('_hide-element');
    }
}

if (window.attachEvent) {
    window.attachEvent('onresize', () => {
        showOrHideFilterButtonByAdaptive();
        showOrHideFilterByApative();
    });
}
else if (window.addEventListener) {
    window.addEventListener('resize', () => {
        showOrHideFilterButtonByAdaptive();
        showOrHideFilterByApative();
    }, true);
}

const filterButton = document.getElementsByName("filter-button")[0];

filterButton.addEventListener('click', () => {
    showOrHideFilterByButton(filterButton);
}, false);

showOrHideFilterButtonByAdaptive();
showOrHideFilterByApative();
