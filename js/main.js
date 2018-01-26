//Append the new section for text input search
$(".page-header").append("<form id='search'><div class='student-search'><input placeholder='Search for students...'><button>Search</button></div></form>");


//Identify the elements for input
const form = document.getElementById('search');
const input = form.querySelector('input');

//Set the max number of students per page
const pageSize = 10;

//Divide and round to get the number of pages
function numberPages(identity) {
  let pages = Math.ceil($(identity).length/pageSize);
  return pages;
}

////Function to show the pages
function showPage(page, items) {
  $(items).hide();
  $(items).each(function(n) {
    if (n >= pageSize * (page - 1) && n < pageSize * page) {
      $(this).show();
    }
  });
}

//Start with showing page 1
showPage(1, ".student-item");

//Function to remvoe text elements
function removeTextElement(name) {
   $(name).contents().filter(function () {
     return this.nodeType === 3;
    }).remove();
}

removeTextElement(".page-header");

//Function to create page links at bottom of page
function appendPageLinks(category) {
  removeTextElement(".page");
  $(".student-list").after("<div class='pagination'></div>");
  for (i = 1; i < numberPages(category) + 1; i += 1) {
    $(".pagination").append("<li><a href='#'>" + i + "</a></li>");
  }
  $(".pagination li a").click(function() {
    $(".pagination li a").removeClass("active");
    showPage(parseInt($(this).text()),category );
    $(this).addClass("active");
  });
}

//Only append page links if the number is greater than 10 and get rid of the old section regardles
if ($(".student-item").length > pageSize) {
  appendPageLinks(".student-item");
  } else {
  removeTextElement(".page");
}

//button for searching. Search function will append links that work
form.addEventListener('submit', function searchList(e) {
  e.preventDefault();
  let studentName = input.value.toLowerCase();
  if (studentName  === "") {
    window.location.reload(true);
    }
  input.value = "";
  $(".student-item div h3").each(function() {
    var s = $(this).text().toLowerCase();
    if(s.indexOf(studentName)!=-1) {
      $(this).parent().parent().addClass("matched");
     } else {
      $(this).parent().parent().hide();
    }
  });
  if($(".matched").length > 0) {
      if($(".matched").length > pageSize) {
          $(".pagination").remove();
          appendPageLinks(".matched");
        } else {
        $(".pagination").remove();
        }
      } else {
        $(".page-header").append("<p>No student's found</p>");
        $(".pagination").remove();
      }
});
