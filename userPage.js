const user = JSON.parse(localStorage.getItem('user')) || [];
console.log(user);
mytest(user);

function mytest(user) {
  if (localStorage['user']) {
    const myobj = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      username: user.username,
      city: user.address.city,
      company: user.company.name,
      email: user.email
    }
    for (const key in myobj) { $('.userProfile').append(`<li class="list-group-item bg-secondary">${key}: ${myobj[key]}</li>`) }
    localStorage.clear();
  }
}
