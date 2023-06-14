// Halaman untuk penjualan
var currentPage = 1;
var cardsPerPage = 5;
var cards = document.querySelectorAll('.box-penjualan');
var totalCards = cards.length;
var totalPages = Math.ceil(totalCards / cardsPerPage);

function showPage(page) {
    var start = (page - 1) * cardsPerPage;
    var end = start + cardsPerPage;

    for (var i = 0; i < cards.length; i++) {
        if (i >= start && i < end) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

function updatePagination() {
    var prevLink = document.querySelector('.prev');
    var nextLink = document.querySelector('.next');
    var pages = document.querySelector('.pages');

    if (currentPage === 1) {
        prevLink.style.display = 'none';
    } else {
        prevLink.style.display = 'inline-block';
    }

    if (currentPage === totalPages) {
        nextLink.style.display = 'none';
    } else {
        nextLink.style.display = 'inline-block';
    }

    if (totalPages === 1) {
        pages.style.display = 'none';
    } else {
        pages.style.display = 'block';

        var startPage = 1;
        var endPage = totalPages;

        if (totalPages > 3) {
            if (currentPage <= 2) {
                endPage = 3;
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 2;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }

        var pageLinks = '';

        for (var i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                pageLinks += '<a class="active" disabled>' + i + '</a>';
            } else {
                pageLinks += '<a class="page-link" data-page="' + i + '">' + i + '</a>';
            }
        }

        pages.innerHTML = pageLinks;

        var pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var page = parseInt(this.dataset.page);
                if (!this.classList.contains('active')) {
                    navigateToPage(page);
                }
            });
        });
    }
}

function navigateToPage(page) {
    currentPage = page;
    showPage(currentPage);
    updatePagination();
}

function navigateToPrev() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePagination();
    }
}

function navigateToNext() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updatePagination();
    }
}
showPage(currentPage);
updatePagination();
var prevLink = document.querySelector('.prev');
var nextLink = document.querySelector('.next');
var pageLinks = document.querySelectorAll('.pages a');
prevLink.addEventListener('click', navigateToPrev);
nextLink.addEventListener('click', navigateToNext);
pageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        var page = parseInt(this.innerHTML);
        navigateToPage(page);
    });
});