// ---------------------------------variables-----------------------------------

// -- login page variables --
const userLoginPage = document.querySelector('.userLoginPage');
const loginUsernameInput = document.querySelector('#loginUsernameInput');
const loginBtn = document.querySelector('#loginBtn');
const loginErrorMessage = document.querySelector('#loginErrorMessage');

// -- nav --
const navUserInfo_div = document.querySelectorAll('.navUserInfo');
const backToMainPageBtn = document.querySelectorAll('.backToMainPageBtn');

// -- main page variables --
const mainPage = document.querySelector('.mainPage');
const goToProfilePage = document.querySelector('#goToProfilePage');
const goToMoviePage = document.querySelector('#goToMoviePage');

// -- profile page variables --
const profilePage = document.querySelector('.profilePage');
const changeUsernameInput = document.querySelector('#changeUsernameInput');
const updateProfilePhotoInput = document.querySelector('#updateProfilePhotoInput');
const selectGenderInput = document.querySelector('#selectGenderInput');
const updateProfileBtn = document.querySelector('#updateProfileBtn');
const usernameUpdateErrorMessage = document.querySelector('#usernameUpdateErrorMessage');


// -- choose movie page variables --
const chooseMoviePage = document.querySelector('.moviesPage');
const moviesOptionsCont = document.querySelector('#moviesOptionsCont');

// -- chosen movies variables --
const moviePage = document.querySelector('.moviePage');
const chosenMoviePage = document.querySelector('.chosenMoviePage');

// -- general variables --

let existingUsersArray = [];
let loggedInUserName = null;
let loggedInUser = null;

let screens = [
    {
        rows: 5,
        columns: 6
    },
    {
        rows: 4,
        columns: 5
    },
    {
        rows: 2,
        columns: 4
    }
]

const movies = [
    {
        screenIndex: 0,
        id : 'lotr1',
        title: 'The Lord of the Rings: The fellowship of the Ring',
        genre: ['adventure', 'action', 'drama'],
        director: 'Peter Jackson',
        year: 2001,
        duration: '2h 58min',
        cover: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings%2C_TFOTR_%282001%29.jpg'
    },
    {
        screenIndex: 1,
        id : 'lotr2',
        title: 'The Lord of the Rings: The Two Towers',
        genre: ['adventure', 'action', 'drama'],
        director: 'Peter Jackson',
        year: 2002,
        duration: '2h 59min',
        cover: 'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'
    },
    {
        screenIndex: 2,
        id : 'lotr3',
        title: 'Lord of the Rings: The Return of the King',
        genre: ['adventure', 'action', 'drama'],
        director: 'Peter Jackson',
        year: 2003,
        duration: '3h 21min',
        cover: 'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
    }
]

// -- generate each movie selection box --

movies.forEach(movie => {
    const movieOptionCont = document.createElement('div');
    movieOptionCont.className = 'text-center movieCont';
    const moviePhotoBox = document.createElement('div');
    moviePhotoBox.className = 'box bgImage';
    moviePhotoBox.style.backgroundImage = `url(${movie.cover})`;
    const movieSeatAvailabilityText = document.createElement('h4');
    movieSeatAvailabilityText.className = 'seatsAvailable_text';
    movieOptionCont.append(moviePhotoBox, movieSeatAvailabilityText);
    moviesOptionsCont.append(movieOptionCont);
})
// -- variables for each movie selection --

const chooseMovie = document.querySelectorAll('.moviesPage .box');
const seatsAvailable_texts = document.querySelectorAll('.seatsAvailable_text');

//------------------------------events------------------------------------------------


// -- events in login page --
loginBtn.onclick = () => {
    if (loginUsernameInput.value) {
        loggedInUserName = loginUsernameInput.value;
        userLoginPage.style.display = 'none';
        mainPage.style.display = 'block';
        logUserFunction();
        displayUserInfoInNav();
    } else {
        loginErrorMessage.style.display = 'block';
    }
}
// -- events for nav --
navUserInfo_div.forEach(navDiv => {
    navDiv.onclick = () => {
        profilePage.style.display = 'block';
        mainPage.style.display = 'none';
        chooseMoviePage.style.display = 'none';
        moviePage.style.display = 'none';
    }
})
backToMainPageBtn.forEach((backBtn, backBtnIndex) => {
    if (backBtnIndex === 0) {
        backBtn.onclick = () => {
            userLoginPage.style.display = 'flex';
            mainPage.style.display = 'none';
            loginUsernameInput.value='';
        }
    } else {
        backBtn.onclick = () => {
            profilePage.style.display = 'none';
            mainPage.style.display = 'block';
            chooseMoviePage.style.display = 'none';
            moviePage.style.display = 'none';
        }
    }
})

// -- events in main page --
goToProfilePage.onclick = () => {
    mainPage.style.display = 'none';
    profilePage.style.display = 'block';
}
goToMoviePage.onclick = () => {
    mainPage.style.display = 'none';
    chooseMoviePage.style.display = 'block';
    movies.forEach((movie,movieIndex) => {
        availableSeatCount(movieIndex);
    })
}

// -- events in profile page --
updateProfileBtn.onclick = () => {
    updateUserInfoFunction();
}

// -- events in movie page --
chooseMovie.forEach((chosenMovie, chosenMovieIndex) => {
    chosenMovie.onclick = () => { // generate movie page
        chooseMoviePage.style.display = 'none';
        moviePage.style.display = 'block';
        chosenMoviePage.textContent = '';
        const movieInfoCont = document.createElement('div');
        movieInfoCont.className = 'f1 text-center movieInfoCont';
        const movieScreenCont = document.createElement('div');
        movieScreenCont.className = 'f3 text-center';
        const h3 = document.createElement('h3');
        h3.textContent = 'SELECT YOUR SEATS';
        const movieSeatCont = document.createElement('div');
        movieSeatCont.className = 'box d-flex flex-column justify-content-around align-content-center';
        const screenImg = document.createElement('div');
        screenImg.className = 'screen';
        screenImg.textContent = 'SCREEN';
        const screenSeats = document.createElement('div');
        screenSeats.className = 'movieSelectSeats d-grid';
        screenSeats.style.gridTemplateRows = `repeat(${screens[chosenMovieIndex].rows}, 1fr)`;
        screenSeats.style.gridTemplateColumns = `repeat(${screens[chosenMovieIndex].columns}, 1fr)`;
        movieSeatCont.append(screenImg, screenSeats);
        const reserveSeatsBtn = document.createElement('button');
        reserveSeatsBtn.className = 'reserveSeatsBtn reserveBtn';
        reserveSeatsBtn.textContent = 'RESERVE SEATS';
        movieScreenCont.append(h3,movieSeatCont, reserveSeatsBtn);
        chosenMoviePage.append(movieInfoCont,movieScreenCont);

        generateMovieInfo(chosenMovieIndex);
        generateMovieSeats(chosenMovieIndex);
    }
})

//---------------------------------functions-----------------------------------------


// -- login page creating user to local storage if new --
function logUserFunction() {
    let duplicate = false;
    let user = {
        username: loginUsernameInput.value,
        profileImg: 'https://powerusers.microsoft.com/t5/image/serverpage/image-id/98171iCC9A58CAF1C9B5B9/image-size/large/is-moderation-mode/true?v=v2&px=999',
        gender: 'notSelected'
    }
    if (localStorage.getItem('usersList')) {
        existingUsersArray = JSON.parse(localStorage.getItem('usersList'));
    }
    existingUsersArray.forEach(existingUser => {
        if (existingUser.username === loginUsernameInput.value) {
            duplicate = true;
        }
    })
    if (!duplicate) {
        existingUsersArray.push(user);
    }
    localStorage.setItem('usersList', JSON.stringify(existingUsersArray));
}

// -- show user info in nav --
function displayUserInfoInNav() {
    navUserInfo_div.forEach(navDiv => {
        navDiv.textContent = '';
    })
    existingUsersArray = JSON.parse(localStorage.getItem('usersList'));
    navUserInfo_div.forEach(nav => {
        loggedInUser = existingUsersArray.find(existingUser => existingUser.username === loggedInUserName)
        const navLoggedInUserPhoto = document.createElement('img');
        navLoggedInUserPhoto.src = loggedInUser.profileImg;
        const navLoggedInUserName = document.createElement('b');
        navLoggedInUserName.textContent = loggedInUser.username;
        nav.append(navLoggedInUserPhoto, navLoggedInUserName)
    })
}

// -- profile page update user info function--
function updateUserInfoFunction() {
    usernameUpdateErrorMessage.style.display = 'none';
    changeUsernameInput.style.border = 'none';
    let newUserName = changeUsernameInput.value;
    let profilePhotoUrl = updateProfilePhotoInput.value;
    let userIndex = existingUsersArray.findIndex(existingUser => existingUser.username === loggedInUserName);
    if (newUserName) {
        let userNameExist = existingUsersArray.find(existingUser => existingUser.username === newUserName);
        if (!userNameExist) {
            existingUsersArray[userIndex].username = newUserName;
            loggedInUserName = newUserName;
        } else {
            changeUsernameInput.style.border = '3px solid red';
            changeUsernameInput.value = '';
            usernameUpdateErrorMessage.style.display = 'block';
            profilePage.style.display = 'block';
            mainPage.style.display = 'none';
            return;
        }
    }
    if (profilePhotoUrl) {
        existingUsersArray[userIndex].profileImg = profilePhotoUrl;
        updateProfilePhotoInput.value = '';

    }
    existingUsersArray[userIndex].gender = selectGenderInput.value;
    profilePage.style.display = 'none';
    mainPage.style.display = 'block';
    localStorage.setItem('usersList', JSON.stringify(existingUsersArray));
    changeUsernameInput.value = '';
    displayUserInfoInNav();
}

// -- on movie page count available seats in each movie screen
function availableSeatCount(movieIndex) {
    if (localStorage.getItem(movies[movieIndex].id)) {
        let screen_existingSeatsArrangement = JSON.parse(localStorage.getItem(movies[movieIndex].id));
        let availableSeatCount = 0;
        screen_existingSeatsArrangement.forEach(movieSeat => {
            if (movieSeat === '') {
                availableSeatCount++;
            }
        })
        if (availableSeatCount === 0) {
            seatsAvailable_texts[movieIndex].textContent = 'Sold Out!';
            seatsAvailable_texts[movieIndex].style.color = 'red';
            seatsAvailable_texts[movieIndex].style.fontStyle = 'italic';
        } else {
            seatsAvailable_texts[movieIndex].textContent = 'Seats available: ' + availableSeatCount;
        }
    } else {
        seatsAvailable_texts[movieIndex].textContent = 'Seats available: ' + (screens[movies[movieIndex].screenIndex].rows*screens[movies[movieIndex].screenIndex].columns);
    }
}


// -- generate each movie info --
function generateMovieInfo(movieIndex) {
    const movieInfoCover = document.createElement('div');
    const movieInfoCont = document.querySelector('.movieInfoCont');
    movieInfoCover.className = 'box bgImage movie';
    movieInfoCover.style.backgroundImage = `url(${movies[movieIndex].cover})`;
    const movieInfo = document.createElement('div');
    movieInfo.className = 'movieInfo mx-3';
    const movieGenreDiv = document.createElement('div');
    movies[movieIndex].genre.forEach(genre => {
        const genreSpan = document.createElement('span');
        genreSpan.textContent = genre;
        movieGenreDiv.append(genreSpan);
    })
    const movieTitle = document.createElement('h4');
    movieTitle.textContent = movies[movieIndex].title;
    const movieDirector = document.createElement('b');
    movieDirector.textContent = 'Director: ' + movies[movieIndex].director;
    const movieDuration = document.createElement('p');
    movieDuration.textContent = 'Duration: ' + movies[movieIndex].duration;
    const movieReleaseYear = document.createElement('p');
    movieReleaseYear.textContent = movies[movieIndex].year;
    movieInfo.append(movieGenreDiv, movieTitle, movieDirector, movieDuration,movieReleaseYear);
    movieInfoCont.append(movieInfoCover,movieInfo);
}
// -- creating movie screen seats in html --
function generateMovieSeats(selectedMovieIndex) {
    const movieSeatsCont = document.querySelector('.movieSelectSeats');
    movieSeatsCont.textContent = '';
    let screen_existingSeatsArrangement = [];
    if (localStorage.getItem(movies[selectedMovieIndex].id)) {
        screen_existingSeatsArrangement = JSON.parse(localStorage.getItem(movies[selectedMovieIndex].id));
    }
    let reservedForUser = null;
    let totalSeats = screens[movies[selectedMovieIndex].screenIndex].rows*screens[movies[selectedMovieIndex].screenIndex].columns;
    for (let i = 0; i < totalSeats; i++) {
        const seat = document.createElement('div');
        seat.className = 'd-flex flex-column overflow-hidden';
        seat.id = i;
        if (screen_existingSeatsArrangement.length !== totalSeats) {
            screen_existingSeatsArrangement.push('');
        }
        if (localStorage.getItem('usersList')) {
            existingUsersArray = JSON.parse(localStorage.getItem('usersList'));
            if (screen_existingSeatsArrangement.length > 0 && screen_existingSeatsArrangement[i] !== '') {
                reservedForUser = existingUsersArray.find((existingUser, index) => index === screen_existingSeatsArrangement[i]);
                seat.innerHTML = `
                    <img src="${reservedForUser.profileImg}">
                    <b>${reservedForUser.username}</b>
                `
                seat.style.pointerEvents = 'none';
            }
        }

        movieSeatsCont.append(seat);
    }
    localStorage.setItem(movies[selectedMovieIndex].id, JSON.stringify(screen_existingSeatsArrangement));
    movie_reserveSeats(selectedMovieIndex);
}

// -- universal function for reserving seats
function movie_reserveSeats(selectedMovieIndex) {
    let selectedSeats = [];
    const movieSeatsCont_divs = document.querySelectorAll('.movieSelectSeats div')
    movieSeatsCont_divs.forEach((movieSeat, seatIndex) => {
        let selected = false;
        movieSeat.onclick = () => {
            selected = !selected;
            if (selected) {
                const reserveSeatImage = document.createElement('img');
                const reserveSeatUser = document.createElement('b');
                reserveSeatUser.textContent = loggedInUser.username;
                reserveSeatImage.src = loggedInUser.profileImg;
                movieSeat.append(reserveSeatImage, reserveSeatUser);
                selectedSeats.push(seatIndex);
            } else {
                movieSeat.textContent = '';
                selectedSeats = selectedSeats.filter(seat => seat !== seatIndex);
            }
        }
    })
    const reserveSeatsBtns = document.querySelector('.reserveSeatsBtn');
    reserveSeatsBtns.onclick = () => {
        let userIndex = null;
        let screen_existingSeatsArrangement = [];
        if (localStorage.getItem(movies[selectedMovieIndex].id)) {
            screen_existingSeatsArrangement = JSON.parse(localStorage.getItem(movies[selectedMovieIndex].id));
            userIndex = existingUsersArray.findIndex(existingUser => existingUser.username === loggedInUserName);
        }
        selectedSeats.forEach(selectedSeat => {
            screen_existingSeatsArrangement[selectedSeat] = userIndex;
        })
        localStorage.setItem(movies[selectedMovieIndex].id, JSON.stringify(screen_existingSeatsArrangement));
        moviePage.style.display = 'none';
        chooseMoviePage.style.display = 'block';
        availableSeatCount(selectedMovieIndex);
    }
}
