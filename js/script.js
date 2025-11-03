

$(function () {
  //header
  $(window).scroll(function () {
    let st = $(window).scrollTop();
    if (st > 1000) {
      $("header").css("opacity", "0");
    } else {
      $("header").css("opacity", "1");
    }
  })

  //해당 #으로 갈시 사이드메뉴 on
  $(document).ready(function () {
    const sections = $(".menu a").map(function () {
      return $($(this).attr("href"));
    });

    $(window).on("scroll", function () {
      let scrollPos = $(window).scrollTop() + $(window).height() / 2;

      sections.each(function (index, section) {
        let top = $(section).offset().top;
        let bottom = top + $(section).outerHeight();

        if (scrollPos >= top && scrollPos < bottom) {
          $(".menu .dia").removeClass("on");
          $(".menu a").eq(index).find(".dia").addClass("on");
          return false;
        }
      });
    });
  });

  //해당 #으로 갈시 사이드메뉴 on -모바일버전
  $(document).ready(function () {
    const sections = $(".menu-mobile li").map(function () {
      return $($(this).find('a').attr("href"));
    });

    $(window).on("scroll", function () {
      let scrollPos = $(window).scrollTop() + $(window).height() / 2;

      sections.each(function (index, section) {
        let top = $(section).offset().top;
        let bottom = top + $(section).outerHeight();

        if (scrollPos >= top && scrollPos < bottom) {
          $(".menu-mobile ul li").removeClass("on");
          $(".menu-mobile ul li").eq(index).addClass("on");
          return false;
        }
      });
    });
  });

  //저는 이런사람입니다 aboutme 해당 스크롤에 오면 .photo.rotate @profileRotate재생
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop(); //스크롤 세로top값 취득

    let wh = $(window).height(); //요소의 높이

    let tOffset = $("#profile").offset().top; //#profile의 top위치
    let tHeight = $("#profile").outerHeight(); //#profile의 border,margin을 포함한 높이

    if (scrollTop + wh > tOffset + 100 && scrollTop < tOffset + tHeight - 100) {
      //스크롤세로top값+요소의 높이 > #profile && 스크롤세로top값 < #profile + #profile 높이
      //화면에 아래쪽위치가 #profile보다 크다 && 화면의 위쪽위치가 #profile의 맨아래보다 위에 있다
      //화면(브라우저)이 #profile겹치는 구간이 있는 동안
      let $photo = $('.photo');

      if (!$photo.hasClass("rotate")) { // .photo에 rotate가 없으면 true
        $photo.addClass("rotate");

        $photo.on("animationend", function () { // css 애니메이션(.rotate)이 끝났을 때
          $photo.removeClass("rotate").addClass("infinite");
        });
      }
    } else {
      $('.photo').removeClass('rotate');
      $('.photo').removeClass('infinite');
    }
  })

  //저 이런것좀 합니다 skills
  $('#skills .skill-list .skill').click(function () {
    let index = $(this).index();

    $('#skills .skill-list .skill h1, #skills .skill-list .skill .skillpro').removeClass("on");
    $(this).children().addClass("on");

    $('#skills .view').removeClass("on");
    $('#skills .view').eq(index).addClass("on");

    $('#skills .view video').each(function () {
      this.pause();
      this.currentTime = 0;
    })

    $('#skills .view').eq(index).find('video')[0].play();
  })

  //skill 윈도우 사이즈가 768px가 될 시
  $(function () {
    function responsiveWidth() {
      const windowWidth = $(window).outerWidth();
      const $views = $('#skills .skills-wrap .view');
      const $skills = $('#skills .skill-list .skill');
      const $programImgs = $('.skillpro img');

      if (windowWidth < 768) {
        $views.each(function (i) {
          if (!$skills.eq(i).find('.view').length) {
            $($programImgs).hide();
            $(this).appendTo($skills.eq(i));
          }
        });

      } else {
        const $line = $('#skills .skills-wrap .line');
        $($programImgs).show();
        $views.appendTo($line.parent());
      }
    }

    responsiveWidth();

    // 창 크기 바뀔 때도 실행
    $(window).on('resize', function () {
      responsiveWidth();
    });
  });



  //swiper라이브러리 #works .web-project
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
    },
  });


  // //etc 슬라이드
  // const imgSlide = document.querySelector("#works .etc .etc-box-wrap");

  // const clone = imgSlide.cloneNode(true);
  // document.querySelector("#works .wrap").appendChild(clone);
  // document.querySelector("#works .etc .etc-box-wrap").offsetWidth + "px";

  // imgSlide.classList.add("origin");
  // clone.classList.add("clone");

  // $(function () {
  //   $("#works .wrap").on("mouseenter", function () {
  //     $("#works .etc .etc-box-wrap").css("animation-play-state", "paused");
  //   });

  //   $("#works .wrap").on("mouseleave", function () {
  //     $("#works .etc .etc-box-wrap").css("animation-play-state", "running");
  //   });
  // });

})

$(function () {
  lightbox.option({
    "resizeDuration": 200,
    "wrapAround": true,
    "alwaysShowNavOnTouchDevices": true,
    "fadeDuration": 300,
    "positionFromTop": 200,
    "fitImagesInViewport": true,
    "disableScrolling": true
  })
})

//팝업창
$(function () {
  $('.Multimedia .box .imgBox').click(function () {
    $('.popup').show();
    $('.multiImgUi').hide();

    const altSorse = $(this).children('img').attr('alt');
    $(`.multiImgUi.${altSorse}`).css('display', 'flex');

    $('.popup-close,.popup-bg').click(function () {
      $('.popup').hide();
      $('.multiImgUi').hide();
    })
  })
})

//작업물 멀티비디어 썸네일 이미지 랜덤으로 넣기
$(function () {
  $('.Multimedia .box .imgBox').each(function () {
    const altSorse = $(this).children('img').attr('alt');
    const $imgs = $(`.multiImgUi.${altSorse} .img-box img`);

    if ($imgs.length > 0) {
      const randomIndex = Math.floor(Math.random() * $imgs.length);
      const randomSrc = $imgs.eq(randomIndex).attr('src');

      $(this).find('img').attr('src', randomSrc);
    }
  })
})

//#works .etc 스와이퍼 설정
$(function () {
  var swiper = new Swiper(".mySwiper2", {
    // init: true,
    // initialSlide: 0,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
      1100: {
        slidesPerView: 4,
        spaceBetween: 30,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
      1400: {
        slidesPerView: 5,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
      },
    },
    // debugger: true,
    loop: true,
  })
});





// //#works .etc 스와이퍼 설정
// $(function () {
//   var swiper = new Swiper(".mySwiper2", {
//     // init: true,
//     // initialSlide: 0,
//     direction: 'horizontal',
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     slidesPerView: 'auto',
//     spaceBetween: 15,
//     loop: true,
//     speed: 0,
//     // freeMode: true,
//     autoplay: {
//       delay: 0,
//       disableOnInteraction: true,
//       // reverseDirection: true,
//     },
//     grabCursor: true,
//     breakpoints: {
//       0: {
//         autoplay: {
//           delay: 3000,
//         },
//         // freeMode: false,
//         speed: 300,
//       },
//       768: {
//         spaceBetween: 30,
//         speed: 3000,
//       },
//     },
//     // debugger: true,

//   })
// });
