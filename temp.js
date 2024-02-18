(async function () {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersData = await response.json();
  console.log(usersData);
  let mistakeCounter = 0;
  let isBlocked = false;
  $('.submitBtn').on('click', function () {
    if (isBlocked) {
      return  $('.errorAlert').text('You entered 3 wrong username/password, you have been blocked');
    }
    const usernameInput = $('.username').val();
    const passwordInput = $('.password').val();
    let user;
    let isUsername = false;
    let isPassword = false;

    usersData.forEach((element, index) => {

      if (isUsername && isPassword) return;
       else if (index === usersData.length - 1 && !isUsername && !isPassword) {
        mistakeCounter++;
        console.log(mistakeCounter);
      }
      if (mistakeCounter >= 3) {
        console.log('3 Errors!');
        $('.errorAlert').text('You entered 3 wrong username/password, you have been blocked');
        isBlocked = true;
        return
      }
      if (element.name.split(' ').pop().length < 2) {
        const lastName = element.name.split(' ')[element.name.split(' ').length - 2].toLowerCase();
        if (usernameInput.toLowerCase() === lastName && passwordInput === element.phone) {
          user = element;
          $('.errorAlert').text('');
          isUsername = true;
          isPassword = true;
          $('.username').val('');
          $('.password').val('');
          window.open('./userPage.html');
        } else {
          $('.username').val('');
          $('.password').val('');
          isUsername = false;
          isPassword = false;
          $('.errorAlert').text('wrong username and/or password');
        }
        if (isUsername && isPassword) return;
      } else {
        const lastName = element.name.split(' ').pop().toLowerCase();
        if (
          usernameInput.toLowerCase() === lastName &&
          passwordInput === element.phone
        ) {
          $('.errorAlert').text('');
          $('.username').val('');
          $('.password').val('');
          isUsername = true;
          isPassword = true;
          user = element;
          window.open('./userPage.html');
        } else {
          $('.username').val('');
          $('.password').val('');
          isUsername = false;
          isPassword = false;
          $('.errorAlert').text('wrong username and/or password');
        }
      }
    });
    localStorage.setItem('user', JSON.stringify(user));
  });
})();

